import GameSettings from './GameSettings';

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
import * as gameUtil from '../../utilities/game-utility'
import { errorState, setErrorSeverity, showSnackbar, hideErrorMessage } from '../../state-slices/error/errorSlice';
import Players from './Players';
import { guestState, setGuest } from '../../state-slices/multiplayer/guest-slice';
import { fontFamily } from '@mui/system';


Amplify.configure(config);

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle, John Callahan
 **/

function GameLounge() {

    const [nickName, setNickName] = useState("");
    
    const game = useSelector(gameState);
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    const error = useSelector(errorState);
    const dispatch = useDispatch();
    let id = useRef('');
    let firstRender = useRef(true);
    let history = useHistory();

    useEffect(() => {
        async function fetchGame() {
            console.log('Id.current',id.current);
            console.log('nickName:', nickName)
            
            let game: Game;
            try {
                let resp = await (API.graphql(graphqlOperation(getGame, {id: id.current})) as Promise<GraphQLResult>);
                console.log('resp:', resp)
                //@ts-ignore
                game = {...resp.data.getGame};
            } catch {
                // Game already exists
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("Game ID does not exist!"));
                return;
            }
            
            //game already exists
            
            if(game.id !== undefined){
                if(game.matchState === 0){
                    //check to see if game capacity is full
                    if(game.players.length >= game.capacity){
                        dispatch(setErrorSeverity("error"));
                        dispatch(showSnackbar("Game Full"));
                        return;  
                    } 
                } else {
                    dispatch(setErrorSeverity("error"));
                    dispatch(showSnackbar("Game started already"));
                    return;   
                }     
            } else {
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("Game ID does not exist"));
                return;
            }
            // Set the user into the list of players
            let baseUser: any;
            // User is logged in
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
            // User is not logged in, but has set a nickname
            } else if (guestUser.id) {
                baseUser = {
                    id: Math.random().toString(36).substr(2, 5),
                    //@ts-ignore
                    username: guestUser.nickname,
                    answered: false,
                    answeredAt: new Date().toISOString(),
                    answeredCorrectly: false,
                    placing: -1,
                    streak: 0,
                    points: 0
                }
            // User is not logged in, and has not set a nickname
            } else {
                console.log('guest: ', guestUser)
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("Please set a nickname."));
                return;
            }
            console.log('Base User: ', baseUser);
    
            game.players.push(baseUser);
            let updateresp = await (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: game.players}})));
    
            console.log("Successfully updated GraphQL!", updateresp);
    
            dispatch(setGame(game));
    
            
        }
        firstRender.current ? firstRender.current = false : fetchGame();
    }, [guestUser])
    

    function joinGame() {
        // Handle setting guest slice in Redux when nickname is set
        dispatch(setGuest({nickname: nickName}))
    }
    
    function handleUpdate(e: any) {
        id.current = e.target.value;
        console.log('Id.current:',id.current);
    }

    function changeNickName(e: any) {
        setNickName(e.target.value);
    }

    return (
        <>
        { (!game.host)
        ?
        <>
        <div className="App" >
            <header >
            <h1 ><b> <span className="logo-Grand-Qwuizzard" style={{color: '#4E3E61 ' , fontFamily:"retro-gamer" }}>Q W I Z Z A R D</span>
            <br/> 
            <span style={{color: '#EF8D22'}}>Online</span><span style={{color: '#75BC3E'}}>.</span> </b> </h1>
                
                <br></br>
                <br></br>
                <br></br>
            </header>    

        </div>
        
        {/*Create Game contains create game button*/}
        <GameSettings />
        <br></br>
        {/* Input field for the join game ID */}
        <Input onKeyUp={handleUpdate} 
               placeholder = 'Game ID'/> {       }
        
        <Input onKeyUp={changeNickName}
               placeholder = 'Nickname' /> 


        {/* Button which joins existing game according to input id */}
        <Button onClick={joinGame}>Join Game</Button>
        <Link to="/multiplayer">Go Back To Multiplayer</Link> 
        </>
        : <Redirect to="/multiplayer" /> }
        </>
    )
}

export default GameLounge
