import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { gameState, setGame } from '../../state-slices/multiplayer/game-slice';
import { Button, Input } from '@material-ui/core';
import { Link, Redirect } from 'react-router-dom';
import { gameByName, getGame } from '../../graphql/queries';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import config from '../../aws-exports';

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
    const dispatch = useDispatch();
    let id = useRef('');
    
    async function fetchGame() {
        console.log(id.current);
        let resp = await (API.graphql(graphqlOperation(getGame, {id: id.current})) as Promise<GraphQLResult>)
        dispatch(setGame(resp.data));
    }
    
    function handleUpdate(e: any) {
        id.current = e.target.value;
        console.log(id);
    }

    return (
        <>
        { (game.id)
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
        {/* <Button >Create Game</Button> */}

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
