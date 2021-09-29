import { useState, useEffect, useRef } from 'react';

import Amplify, { API, graphqlOperation } from 'aws-amplify';
import config from '../../aws-exports';
import { createGame, deleteGame, updateGame } from '../../graphql/mutations';
import { onCreateGame, onDeleteGame, onUpdateGame } from '../../graphql/subscriptions';
import { getGame, listGames } from '../../graphql/queries';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { Observable } from 'redux';
import { GraphQLTime } from 'graphql-iso-date';
import Questions from './Questions';
import Leaderboard from './Leaderboard';

Amplify.configure(config);

/**
 *  This React component is a splash screen/container for the multiplayer quiz game.
 *  Different components will be rendered within this container based on user input.
 *  This is a MONSTROSITY!!!
 * 
 *  Conditional Rendering:
 *      + Does game exist?
 *      + What state is game in? (0 = waiting, 1 = question...)
 *      + Is user host?
 *      + Is user logged in?
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
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


// This function abstracts away some logic from the main return method and allows us to use
// a switch statement in our conditional rendering.
function render() {
    let match_state = 0;
    switch(match_state) {
        case 0:
            return (
                <>
                    {/* <Players />
                    <Button >Host Start Game Button</Button> */}
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
                    {/* <Leaderboard /> */}
                </>
            )
    }
}

function Game() {

    return (
        <>
        {
            (true) // If game is defined (Using redux slice)
            ?
            <>
                { render() }
            </>
            
            :

            <>
            {/* // Game Settings Modal
            // <GameSettings />

            // // Button which loads game based on settings set in modal
            // <Button >Create Game</Button>

            // // Input for Game ID for existing game
            // <InputGroup />

            // // Button which joins existing game according to input id
            // <Button >Join Game</Button> */}
            </>
        }

        <div className="App">
        <header className="App-header">
            Hello React!
            <br></br>
            <br></br>
            <br></br>
        </header>
        
        </div>
        </>
  );
}

export default Game;