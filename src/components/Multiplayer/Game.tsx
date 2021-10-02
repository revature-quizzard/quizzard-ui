import { useState, useEffect, useRef } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { createGame, deleteGame, updateGame } from '../../graphql/mutations';
import { onCreateGame, onDeleteGame, onUpdateGame, onUpdateGameById } from '../../graphql/subscriptions';
import { getGame, listGames } from '../../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'redux';
import { GraphQLTime } from 'graphql-iso-date';
import Questions from './Questions';
import Leaderboard from './Leaderboard';
import { Redirect } from 'react-router';
import { Button } from '@material-ui/core';
import Players from './Players';
import { useSelector } from 'react-redux';
import { authState } from '../../state-slices/auth/auth-slice';
import { gameState } from '../../state-slices/multiplayer/game-slice';

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
 *  @author Sean Dunn, Heather Guilfoyle, Colby Wall
 */


/**  
 *  Start Game sends an update to DynamoDB, which triggers our subscription in useEffect.
 *  Inside of the subscription, we set our game state to 2, and update our render accordingly.
 */
async function startGame() {

}

/**
 *  This function is used by the host to manually close the game. All players currently
 *  in lobby will be redirected. If the game is not closed through this manner, it will be
 *  automatically closed when the last player leaves the lobby.
 */
function closeGame() {

}

/**
 *  The host of a game can remove players from the game.
 * 
 *  This logic is run when the 'Kick Player' button is clicked next
 *  to a player's name. The given id will be removed from the game data and 
 *  the player list will be updated accordingly.
 * 
 * @param playerID - ID of player to be kicked from game
 */
async function kickPlayer(playerID: string) {

}

/**
 *  The host of a game will invoke this function at the end of the game (match_state = 3)
 * 
 *  This function will trigger our AWS Lambda, which will post game records to DynamoDB, and pull info
 *  into player data. 
 */
function postGameRecords() {

}

// This function abstracts away some logic from the main return method and allows us to use
// a switch statement in our conditional rendering.
function render(auth: any, game: any) {
    let match_state = 0;
    switch(match_state) {
        case 0:
            return (
                <>
                    <Players />
                    {/* This needs to be the username of the player who made the game! */}
                    { (auth?.username == game.name) 
                    ?
                    <Button> Host Start Game Button </Button>
                    :
                    <></> }
                </>
            )
        case 1:
            return (
                <>
                    {/* <Players />
                    <Timer />
                    <Questions />
                    <Answers /> */}
                </>
            )
        case 2:
            return (
                <>
                    {/* <Players />
                    <Questions />
                    <Answers /> */}
                </>
            )
        case 3: 
            return (
                <>
                    <Leaderboard />
                    {/* <Button> Host Close Game Button </Button>
                    Host Trigger Lambda for posting game record*/}
                </>
            )
    }
}

function Game() {

    // TODO: Change to be actual values
    let dummyGameId = 1;
    let dummyGame = undefined;
    const auth = useSelector(authState);
    const game = useSelector(gameState);

    useEffect(() => {
        // Subscribe to changes in current game in DynamoDB
        const updateSubscription = (API.graphql(
            graphqlOperation(onUpdateGameById, {id: dummyGameId})
        ) as unknown as Observable<any>).subscribe({
            next: ({ provider, value }) => {
                console.log({ provider, value });
            },
            //@ts-ignore
            error: error => console.warn(error)
        })

        return () => {
            // Unsubscribe from subscription when component unmounts, to avoid memory leaks
            updateSubscription.unsubscribe();
        }
    }, [])

    // The return renders components based on match state if game exists in redux,
    // otherwise, redirect user to game lounge
    return (
        <>
        {
            // (dummyGame) // If game is defined (Using redux slice)
            // ?
            <>
                { render(auth, game) }
            </>            
            // : <Redirect to="lounge" />
        }
        </>
  );
}

export default Game;