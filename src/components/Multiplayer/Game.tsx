import { useState, useEffect, useRef} from 'react';
import { useHistory } from 'react-router';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { createGame, deleteGame, updateGame } from '../../graphql/mutations';
import { onCreateGame, onDeleteGame, onUpdateGame, onUpdateGameById, onDeleteGameById } from '../../graphql/subscriptions';
import { getGame, listGames } from '../../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'redux';
import Questions from './Questions';
import Leaderboard from './Leaderboard';
import { Redirect } from 'react-router';
import { Button, makeStyles } from '@material-ui/core';
import Answers from './Answers';
import Timer from './Timer';
import { useDispatch, useSelector } from 'react-redux';
import Players from './Players';
import { authState, logoutUserReducer } from '../../state-slices/auth/auth-slice';
import { gameState, Player, resetGame, setGame } from '../../state-slices/multiplayer/game-slice';
import { guestState } from '../../state-slices/multiplayer/guest-slice';
import { profileState, setProfile } from '../../state-slices/user-profile/profile-slice';
import { quizzardApiClientTokenAuthorized } from '../../remote/api-client';


const useStyles = makeStyles({
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '2rem'
    },

    playerContainer: {
        marginRight: '1rem'
    },

    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    gameId: {
        alignSelf: 'center',
        paddingLeft: '2rem'
    },

    bottomRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
    },

    qaContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: '35rem'
    },

    timerContainer: {
        alignSelf: 'flex-start',
        justifyContent: 'right',
        marginBottom: '1rem'
    },

    hideMe: {
        visibility: 'hidden'
    },

    leaderContainer: {
        justifyContent: "center",

    }

});


Amplify.configure(config);


/**
 *  This React component is a container for the multiplayer quiz game.
 *  Different components will be rendered within this container based on user input.
 *  This is a MONSTROSITY!!!
 * 
 *  Conditional Rendering:
 *      + Does game exist?
 *      + What state is game in? (0 = waiting, 1 = question...)
 *      + Is user host?
 *      + Is user logged in?
 * 
 *  If no game is currently defined, the user will be re routed to the Game Lounge.
 *  If a game is defined, with match state 0, a room will be rendered, in an idle state,
 *      waiting for the host of the game to start. Users will see a player list.
 *  If a game is defined, with match state 1, the room will be rendered with a question displayed
 *      in the top half of the screen, with multiple choice answers being displayed on the 
 *      bottom half.
 *  If a game is defined, with match state 2, the room will be rendered with a question displayed
 *      in the top half of the screen, with multiple choice answers being displayed on the 
 *      bottom half. In this state, answers will be color coordinated (green=correct, red=incorrect).
 *  If a game is defined, with match state 3, the room will be rendered with a leaderboard
 *      displaying players and their scores.
 * 
 *  @author Sean Dunn, Heather Guilfoyle, Colby Wall, Robert Ni
 */


/**  
 *  Start Game sends an update to DynamoDB, which triggers our subscription in useEffect.
 *  Inside of the subscription, we set our game state to 2, and update our render accordingly.
 */
async function startGame(game: any) {
    if (game.matchState === 0) {
        await API.graphql(graphqlOperation(
            updateGame, {input: {id: game.id, matchState: 1}}
        ));
    }
}

/**
 *  This function is used by the host to manually close the game. All players currently
 *  in lobby will be redirected. If the game is not closed through this manner, it will be
 *  automatically closed when the last player leaves the lobby.
 */
async function closeGame(game: any) {
    if (game.matchState === 3) {
        await API.graphql(graphqlOperation(
            deleteGame, {input: {id: game.id}}
        ));
    }
}

/**
 *  The host of a game will invoke this function at the end of the game (match_state = 3)
 * 
 *  This function will trigger our AWS Lambda, which will post game records to DynamoDB, and pull info
 *  into player data. 
 */
function postGameRecords() {

}


function Game() {
    const userProfile = useSelector(profileState);
    const user = useSelector(authState);
    //@ts-ignore
    const guestUser = useSelector(guestState);
    const game = useSelector(gameState);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        // If game does not exist, reroute to /lounge
        if (!game.id) history.push('/lounge');

        // Get initial game state
        (API.graphql(graphqlOperation(getGame, {id: game.id})) as Promise<GraphQLResult>).then(resp => {
            console.log('Initial state', resp);
            //@ts-ignore
            dispatch(setGame({...resp.data.getGame}))
        });

        // Subscribe to changes in current game in DynamoDB
        const updateSubscription = (API.graphql(
            graphqlOperation(onUpdateGameById, {id: game.id})
        ) as unknown as Observable<any>).subscribe({
            next: ({ provider, value }) => {
                let ingame = value.data.onUpdateGameById.players.some((player: any) => player.id == user.authUser?.id);
                console.log('onUpdate:', { provider, value });
                ingame? dispatch(setGame({...value.data.onUpdateGameById})) : dispatch(resetGame());
            },
            //@ts-ignore
            error: error => console.warn(error)
        })

        // Handle when game is deleted from DynamoDB
        const deleteSubscription = (API.graphql(
            graphqlOperation(onDeleteGameById, {id: game.id})
        ) as unknown as Observable<any>).subscribe({
            next: ({ provider, value }) => {
                console.log('onDelete:', { provider, value });
                history.push('/lounge');
            }
        })

        return () => {
            // Unsubscribe from subscriptions when component unmounts, to avoid memory leaks
            let currentUser = user.authUser ? user.authUser.username : guestUser ? guestUser.nickname : undefined;
            let copylist: Player[] = [].concat(game.players);
            let index = copylist.findIndex((player) => player.id === currentUser);
            copylist.splice(index, 1);
            (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: copylist}})));
            updateSubscription.unsubscribe();
            deleteSubscription.unsubscribe();
        }
    }, [])

    const classes = useStyles();

    // This function abstracts away some logic from the main return method and allows us to use
    // a switch statement in our conditional rendering.
    function render() {
        console.log('game in render: ', game)
        let currentUser = user.authUser ? user.authUser.username : guestUser ? guestUser.nickname : undefined;
        if (!currentUser) history.push('/lounge')
        
        switch(game.matchState) {
            case 0:
                return (
                    <>  
                        <h1 className={classes.gameId}>{game.id}</h1> 
                        <div className= {classes.playerContainer}>
                        <Players />
                        </div>
                        {/* This needs to be the username of the player who made the game! */}
                        {/* TODO: Change to check redux state, bit weird rn as guests don't use state */}
                        { (currentUser == game.host) 
                        ?
                        <Button onClick={startGame}> Start Game </Button>
                        :
                        <></> }
                    </>
                )
            case 1:
                return (
                    <>
                    <div className = {classes.gameContainer}>
                        <div className={classes.topRow}>
                            <h1 className={classes.gameId}>{game.id}</h1>
                            <div className= {classes.timerContainer}>
                                <Timer start={game.questionTimer} onTimeout={onTimeout}/>
                            </div>
                        </div>
                        <div className={classes.bottomRow}>
                            <div className= {classes.playerContainer}>
                                <Players />
                            </div>
                            <div className= {classes.qaContainer}>
                                <Questions />
                                <Answers />
                            </div>
                        </div>  
                    </div>
                    </>
                )
            case 2:
                return (
                    <>
                    <div className = {classes.gameContainer}>
                        <div className={classes.topRow}>
                            <h1 className={classes.gameId}>{game.id}</h1>  
                            <div className={classes.hideMe}>                        
                                 <div className= {classes.timerContainer}>
                                    <Timer start={game.questionTimer} onTimeout={onTimeout}/>
                                 </div>
                            </div>  
                        </div>
                        <div className={classes.bottomRow}>
                            <div className= {classes.playerContainer}>
                                <Players />
                            </div>
                            <div className= {classes.qaContainer}>
                                <Questions />
                                <Answers />
                            </div>
                        </div>  
                    </div>
                        {/* This needs to be the username of the player who made the game! */}
                        {/* TODO: Change to check redux state, bit weird rn as guests don't use state */}

                        { (currentUser == game.host) 
                        ?
                        <Button onClick={nextCard}>Next Card </Button>
                        :
                        <></> }
                    </>
                )
            case 3: 
                return (
                    <>
                    <div className = {classes.leaderContainer}>
                        {persistUserData}
                        <Leaderboard />
                    </div>
                        {/* This needs to be the username of the player who made the game! */}
                        {/* TODO: Change to check redux state, bit weird rn as guests don't use state */}
                        { (currentUser == game.host) 
                        ?
                        <Button onClick={() => {closeGame(game)}}> Close Game </Button>
                        :
                        <></> }
                    </>
                )
        }
        
    }

    /**
     *  Every time the timer runs out of time (question ends), the client will invoke this callback function.
     *  If the invoking user is the host of the game:
     *      + Calculate points based on timing, streak, etc
     *          - Currently get 1000 points - 100 for every lower place
     *              + ie 1st: 1000, 2nd: 900, etc
     *          - Which is multiplied by .1 * the current streak
     *              + ie 1000 * 1.1 for streak of 1, 1000 * 1.2 for streak of 2
     *      + Send updated player info and matchState change to Dynamo.
     */
    async function onTimeout() {
        console.log('onTimeout called');
        let currentUser = user.authUser ? user.authUser.username : guestUser ? guestUser.nickname : undefined;
        if (!currentUser) history.push('/lounge')
        
        if (currentUser == game.host) {
            console.log('Host is in onTimeout');
            // TODO: Utilize placing and streak fields for scoring
            
            
            console.log('players before sort: ', game.players);
            // Need to clone players array in order to mutate fields
            // Sort temp player list by time answered
            let players = [].concat(game.players.map(player => ({...player})))
                            .sort((a: any, b: any) => a.answeredAt < b.answeredAt ? 1 : -1);
            console.log('players after sort: ', players);

            // Calculate points
            let count = 0;
            let points = 0;
            players.forEach(player => {
                points = 0;
                if (player.answered == true && player.answeredCorrectly == true) {
                    count++;
                    // Points from placing
                    player.placing = count;
                    points = 1000 - ((count - 1) * 100);

                    // Points from streak
                    player.streak++;
                    points *= 1 + (.1 * player.streak);

                    // Update points
                    player.points += Math.floor(points);
                } else if(player.answered == true && player.answeredCorrectly == false){
                    // Reset streak if answered incorrectly
                    player.streak = 0;
                }
            });
            // Give bonus points if only one player answered correctly
            if (count == 1) {
                players.forEach(player => {
                    if (player.answered == true && player.answeredCorrectly == true) player.points += 200;
                })
            }
            // Update matchState
            let matchState = 2;
            
            // Push update to DynamoDB
            await API.graphql(graphqlOperation(updateGame, {input: {
                id: game.id,
                matchState: matchState,
                players: players
            }}))
        }
    }

    /**
     *  This method is invoked by the host at the end of each round to progress to the next card.
     *  The logic:
     *      + Reset player.answered and player.answeredCorrectly
     *      + Increment questionIndex
     *      + Change matchState either to 1 or 3
     *          - If the game is already on the last card, progress to matchState 3.     * 
     */
    async function nextCard() {
        // Need to clone players array in order to mutate fields
        let players = game.players.map(player => ({...player}))
        let matchState;
        let questionIndex;

        // Reset fields
        players.forEach(player => {
            player.answered = false;
            player.answeredCorrectly = false;
        });

        // Check if game is on last card and update matchState
        (game.questionIndex == game.set.cardList.length - 1) ? matchState = 3 : matchState = 1
        
        // Increment questionIndex
        questionIndex = game.questionIndex + 1;

        // Push update to DynamoDB
        await API.graphql(graphqlOperation(updateGame, {input: {
            id: game.id,
            matchState: matchState,
            questionIndex: questionIndex,
            players: players
        }}))
    }

    /**
     *  This method is invoked at the end of a game to persist the users data (points, win, or loss)
     *  The logic:
     *      id: string;
            username: string;
            favoriteSets: Array<SetDocument>;
            createdSets: Array<SetDocument>;
            profilePicture: string;
            points: number;
            wins: number;
            losses: number;
            registrationDate: string;
            gameRecords: Array<string>;
     */
    async function persistUserData(){

        // find the current user if not guest

        let currentUser = user.authUser.username;
        let players = game.players.map(player => ({...player}));


        if(currentUser === game.host){
            let newPlayers;
            let winner;

            players.forEach(player => {
                if(player.placing === 1) winner = player.username;
                newPlayers.push({
                    id: player.id,
                    placing: player.placing,
                    points: player.points
                })
            });

            console.log("newPlayers: ", newPlayers);
    
            let gameRecord = {
                playerList: newPlayers,
                cardList: game.set,
                winner,
                datePlayed: new Date().toISOString
            }
            console.log("gameRecord: ", gameRecord);
            try{
                let resp = await quizzardApiClientTokenAuthorized.post('/records', gameRecord);
                console.log('persist user data response: ', resp);
            }catch(e: any){
                console.log('persist user data error: ', e);
            }

        }


        //Update user state
        // if(user?.isAuthenticated){
        //     let persistPlayer;
        //     let currentPlayer = game.players.find(player => player.id === user?.authUser.id);
        //     if(currentPlayer.placing === 1){
        //         persistPlayer = { wins: userProfile.userProfile.losses++,
        //             points: userProfile.userProfile.points + currentPlayer.points,          // Update the Gamerecords as well
        //              ...userProfile.userProfile}

        //     } else {
        //         persistPlayer = { wins: userProfile.userProfile.losses++,
        //             points: userProfile.userProfile.points + currentPlayer.points,          // Update the Gamerecords as well
        //              ...userProfile.userProfile}

        //     }
        //     dispatch(setProfile(persistPlayer));  //Update state
        //     // try{
        //     //     let resp = await quizzardApiClientTokenAuthorized.put('/users', gameRecord);       //NO PUT USERS ENDPOINT D:<
        //     //     console.log('persist user data response: ', resp);
        //     // }catch(e: any){
        //     //     console.log('persist user data error: ', e);
        //     // }
        // }
    }

    /**
     *  Utility function to aid in testing.
     *  Simply progresses game to next state, looping back to 0 from 3.
     */
    async function incrementState() {
        let temp = game.matchState;
        if (temp == 3) temp = 0; 
        else temp += 1;
        console.log('Inside incrementState, temp:', temp)
        await (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, matchState: temp}})));
    }
    
    // The return renders components based on match state if game exists in redux,
    // otherwise, redirect user to game lounge
    return (
        // buttons for test (remove this after testing)
        <>
        {
            (game.id) // If game is defined (Using redux slice)
            ?
            <>
                { render() }
                <Button onClick={() => incrementState()} >Increment State</Button>
            </>            
            : <Redirect to="lounge" />
        }
        </>
  );
}

export default Game;