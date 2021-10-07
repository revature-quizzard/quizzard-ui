import GameSettings from './GameSettings';

import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { gameState, setGame } from '../../state-slices/multiplayer/game-slice';
import { Button, Input, makeStyles } from '@material-ui/core';
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

const useStyles = makeStyles({
    buttons: {
        backgroundColor: 'rgb(245,245,245)',
        margin: '1rem'
    }
})

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle, John Callahan
 **/

function GameLounge() {

    const [nickName, setNickName] = useState("");

    const classes = useStyles();
    
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
            let game: Game;
            try {
                let resp = await (API.graphql(graphqlOperation(getGame, {id: id.current})) as Promise<GraphQLResult>);
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
                    points: 0,
                    pointsEarned: 0,
                    afk: false
                };
            // User is not logged in, but has set a nickname
            } else if (guestUser.id) {
                baseUser = {
                    id: guestUser.id,
                    //@ts-ignore
                    username: guestUser.nickname,
                    answered: false,
                    answeredAt: new Date().toISOString(),
                    answeredCorrectly: false,
                    placing: -1,
                    streak: 0,
                    points: 0,
                    pointsEarned: 0,
                    afk: false
                }
            // User is not logged in, and has not set a nickname
            } else {
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("Please set a nickname."));
                return;
            }
    
            game.players.push(baseUser);
            let updateresp = await (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: game.players}})));
    
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
    }

    function changeNickName(e: any) {
        setNickName(e.target.value);
    }

    return (
        <>
        { (!game.host)
        ?
        <>
        <div >
            <header >
            <h1 className='logo-Grand-Qwuizzard'><b><span  style={{color: '#4E3E61 ' , fontFamily:"Press Start 2P" }}>Q W I Z Z A R D</span></b>
            <br/> 
          
            <span  style={{color: '#EF8D22' , marginLeft: '10%' }}>Online</span><span  style={{color: '#75BC3E'}}>.</span>  </h1>
                <hr/>
                <br></br>
                <br></br>
                <br></br>
            </header>    

        </div>
        
        {user.authUser
        ?
        <>
        {/*Create Game contains create game button*/}
        <GameSettings />
        <br></br>
        
        {/* Input field for the join game ID */}
        <Input onKeyUp={handleUpdate} 
               placeholder = 'Game ID'/> {       }
        </>
        :
        <>
        <Input onKeyUp={handleUpdate} 
               placeholder = 'Game ID'/> {       }
    
        <Input onKeyUp={changeNickName}
               placeholder = 'Nickname' /> 
        </>       
        }
        {/* Button which joins existing game according to input id */}
        <Button className={classes.buttons} onClick={joinGame}>Join Game</Button>
        </>
        : <Redirect to="/multiplayer" /> }
        </>
    )
}

export default GameLounge
