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
import { maxHeight } from '@mui/system';


const useStyles = makeStyles({
    gameContainer: {
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        marginTop: '2rem'
    },

    playerContainer: {
        display: 'block',
        marginRight: '1rem',
    },

    topRow: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },

    gameId: {
        alignSelf: 'center',
        paddingLeft: '2rem',
        borderBottomStyle: 'solid',
        borderColor: 'orange'
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
    },

    buttons: {
        backgroundColor: 'rgb(245,245,245)',
        width: '21rem',
        margin: '1rem',
        marginLeft: '0rem'
    },


});



Amplify.configure(config);

// Prevents duplicate calls to persist data
let numCalls = 0;

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

function Game() {
    const userProfile = useSelector(profileState);
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    const game = useSelector(gameState);
    const dispatch = useDispatch();
    const history = useHistory();

    const classes = useStyles();

    

    useEffect(() => {
        // If game does not exist, reroute to /lounge
        if (!game.id) history.push('/lounge');

        // Get initial game state
        (API.graphql(graphqlOperation(getGame, {id: game.id})) as Promise<GraphQLResult>).then(resp => {
            //@ts-ignore
            dispatch(setGame({...resp.data.getGame}))
        });

        // Subscribe to changes in current game in DynamoDB
        const updateSubscription = (API.graphql(
            graphqlOperation(onUpdateGameById, {id: game.id})
        ) as unknown as Observable<any>).subscribe({
            next: ({ provider, value }) => {
                let currentUser = user.authUser ? user.authUser.id : guestUser ? guestUser.id : undefined;
                let ingame = value.data.onUpdateGameById.players.some((player: any) => player.id == currentUser);
                value.data.onUpdateGameById.players.sort((a: any, b: any) => a.points < b.points ? 1 : -1);
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
                history.push('/lounge');
            }
        })

        return () => {
            // Unsubscribe from subscriptions when component unmounts, to avoid memory leaks
            updateSubscription.unsubscribe();
            deleteSubscription.unsubscribe();
        }
    }, [])



    // This function abstracts away some logic from the main return method and allows us to use
    // a switch statement in our conditional rendering.
    function render() {
        let currentUser = user.authUser ? user.authUser.id : guestUser ? guestUser.id : undefined;
        if (!currentUser) history.push('/lounge')
        
        switch(game.matchState) {
            case 0:
                return (
                    <>  
                    <div className={classes.topRow}>
                        <h1 className={classes.gameId}>Code&nbsp;&nbsp;{game.id}</h1> 
                        </div>
                        <div className= {classes.playerContainer}>
                        <Players />
                        </div>
                        {/* This needs to be the username of the player who made the game! */}
                        {/* TODO: Change to check redux state, bit weird rn as guests don't use state */}
                        { (currentUser == game.host) 
                        ?
                        <Button className={classes.buttons} onClick={() => {startGame(game)}}> Start Game </Button>
                        :
                        <></> }
                    </>
                )
            case 1:
                return (
                    <>
                    <div className = {classes.gameContainer}>
                        <div className={classes.topRow}>
                            <h1 className={classes.gameId}>Code&nbsp;&nbsp;{game.id}</h1>
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
                            <h1 className={classes.gameId}>Code&nbsp;&nbsp;{game.id}</h1>  
                            <div className={classes.hideMe}>                        
                                 <div className= {classes.timerContainer}>
                                    <Timer start={game.questionTimer} onTimeout={onTimeout}/>
                                 </div>
                            </div>  
                        </div>
                        <div className={classes.bottomRow}>
                            <div className= {classes.playerContainer}>
                                <Players />
                                { (currentUser == game.host) 
                                ?
                                <>
                                { (game.questionIndex< game.set.cardList.length-1)
                                ? 
                                <Button className={classes.buttons} onClick={nextCard}>Next Card</Button>
                                :
                                <Button className={classes.buttons} onClick={nextCard}>See Leaderboard</Button>
                                } 
                                </>
                                :
                                <></> }
                            </div>
                            <div className= {classes.qaContainer}>
                                <Questions />
                                <Answers />
                            </div>
                        </div>  
                    </div>
                        
                    </>
                )
            case 3: 
                return (
                    <>
                    <div className = {classes.leaderContainer}>
                        { callPersistData() }
                        <Leaderboard />
                    </div>
                        {/* This needs to be the username of the player who made the game! */}
                        {/* TODO: Change to check redux state, bit weird rn as guests don't use state */}
                        { (currentUser == game.host) 
                        ?
                        <Button className={classes.buttons} onClick={() => {closeGame(game)}}> Close Game </Button>
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
        if (game.matchState != 1) return;
        let currentUser = user.authUser ? user.authUser.id : guestUser ? guestUser.id : undefined;
        if (!currentUser) history.push('/lounge')
        
        if (currentUser == game.host) {
            // Need to clone players array in order to mutate fields
            // Sort temp player list by time answered
            let players = [].concat(game.players.map(player => ({...player})))
                            .sort((a: any, b: any) => a.answeredAt > b.answeredAt ? 1 : -1);

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
                    player.pointsEarned = Math.floor(points)
                    player.points += player.pointsEarned;
                    
                } else if(player.answered == true && player.answeredCorrectly == false){
                    
                    player.pointsEarned = 0;
                    // Reset streak if answered incorrectly
                    player.streak = 0;
                    
                }
            });

            // Give bonus points if only one player answered correctly
            if (count == 1) {
                players.forEach(player => {
                    if (player.answered == true && player.answeredCorrectly == true) {
                        player.pointsEarned += 200;
                        player.points += 200;
                    }
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
     * Helper function to be called from React fragment
    */
    const callPersistData = () => {
        if(numCalls<1)
            persistUserData();
        numCalls++;
    }

    /**
     *  This method is invoked at the end of a game to persist the users data (points, win, or loss)
     *  The host of a game will invoke this function at the end of the game (match_state = 3)
     *  The logic:
     *      + Called by helper method callPersistData to allow async method call from React fragment
     *      + make sure the one persisting user data is the host
     *      + rewrite player data to discard unwanted data
     *      + create record object and attempt to persist to lambda function postRecords
     */
    async function persistUserData(){
        // Prevent duplicate calls
        numCalls++;
        // find the current user if not guest
        let currentUser = user.authUser?.id;
        let players = game.players.map(player => ({...player}));

        if(currentUser === game.host){
            let newPlayers: any[]=[];
            let winner;

            players.forEach((player, i) => {
                player.placing = i + 1;
                if(player.placing === 1) winner = player.username;
                newPlayers.push({
                    id: player.id,
                    name: player.username,
                    placing: player.placing,
                    points: player.points
                })
            });
    
            let gameRecord = {
                playerList: newPlayers,
                cardList: game.set.cardList.map(card => ({id: card.id, question: card.question, correctAnswer: card.correctAnswer})),
                winner,
                datePlayed: new Date().toISOString()
            }
            try{
                let resp = await quizzardApiClientTokenAuthorized.post('/records', gameRecord);
            }catch(e: any){
            }

        }
    }

    /**
     *  Utility function to aid in testing.
     *  Simply progresses game to next state, looping back to 0 from 3.
     */
    async function incrementState() {
        let temp = game.matchState;
        if (temp == 3) temp = 0; 
        else temp += 1;
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
            </>            
            : <Redirect to="lounge" />
        }
        </>
  );
}

export default Game;