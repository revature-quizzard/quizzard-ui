import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { gameState, setGame } from '../../state-slices/multiplayer/game-slice';
import { Button, Input } from '@material-ui/core';
import { Link, Redirect, useHistory } from 'react-router-dom';
import { gameByName, getGame } from '../../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import config from '../../aws-exports';
import { createGame, updateGame } from '../../graphql/mutations';
import { Game } from '../../models/game';
import { authState, loginUserReducer } from '../../state-slices/auth/auth-slice';

Amplify.configure(config);

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle, John Callahan
 **/

function GameLounge() {

    const game = useSelector(gameState);
    const user = useSelector(authState);
    const dispatch = useDispatch();
    let id = useRef('');
    let history = useHistory();

    // Creates a game using dummy data for now, pushes it to DynamoDB, and
    // reroutes user to /multiplayer
    async function makeGame() {
        let testGame = {
            id: Math.random().toString(36).substr(2, 5),
            name: 'Test Game',
            matchState: 0,
            questionIndex: 0,
            capacity: 5,
            host: 'nobody',
            questionTimer: 10,
            set: {
                id: '10',
                name: 'Test Set',
                creator: 'nobody',
                cardList: [{
                    id: '10',
                    question: 'What is the answer to this question?',
                    correctAnswer: "There isn't one",
                    multiAnswers: ['wrong', 'correct', 'idk']
                }]
            },
            players: [{
                id: '10',
                username: 'nobody',
                points: 0,
                answered: false,
                answeredAt: new Date().toISOString(),
                placing: -1,
                streak: 0,
                answeredCorrectly: false
            }]
        }
        console.log(testGame)
        let resp = await (API.graphql(graphqlOperation(createGame, {input: testGame})) as Promise<GraphQLResult>);
        dispatch(setGame(testGame));
        history.push('/multiplayer');
    }
    
    async function fetchGame() {
        console.log(id.current);
        let resp = await (API.graphql(graphqlOperation(getGame, {id: id.current})) as Promise<GraphQLResult>);
        // @ts-ignore
        let game: Game = {...resp.data.getGame};

        // Set the user into the list of players
        let baseUser: any;
        if (user.authUser) {
            baseUser = {
                id: user.authUser.id,
                username: user.authUser.username,
                answered: false,
                answeredAt: new Date().toISOString(),
                answeredCorrectly: false,
                placing: -1,
                streak: 0,
                points: 0
            };
        } else {
            baseUser = {
                id: Math.random().toString(36).substr(2, 5),
                username: 'Guest',
                answered: false,
                answeredAt: new Date().toISOString(),
                answeredCorrectly: false,
                placing: -1,
                streak: 0,
                points: 0
            }
        }
        console.log('Base User: ', baseUser);

        game.players.push(baseUser);
        await (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: game.players}})));

        console.log("Successfully updated GraphQL!");
        
        dispatch(setGame(game));
    }
    
    function handleUpdate(e: any) {
        id.current = e.target.value;
        console.log(id.current);
    }

    return (
        <>
        { (!game.host)
        ?
        <>
        <div className="App">
            <header className="App-header">
                Welcome to the looounnnge...
                <br></br>
                <br></br>
                <br></br>
            </header>    
        </div>
        {/* Game Settings Modal */}
        {/* <GameSettings /> */}

        {/* Button which loads game based on settings set in modal */}
        <Button onClick={() => makeGame()}>Create Game</Button>

        {/* Input field for the join game ID */}
        <Input onKeyUp={handleUpdate} />

        {/* Button which joins existing game according to input id */}
        <Button onClick={fetchGame}>Join Game</Button>
        <Link to="/multiplayer">Go Back To Multiplayer</Link> 
        </>
        : <Redirect to="/multiplayer" /> }
        </>
    )
}

export default GameLounge
