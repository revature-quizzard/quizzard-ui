import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as gameUtil from '../../utilities/game-utility';
import { Card } from '../../API';
import { gameState, Player } from '../../state-slices/multiplayer/game-slice';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame } from '../../graphql/mutations';


/**
 * React component that renders that chooseable answers for the questions to players.
 * Function needed to pull random answers off of cards in the set (including correct answer).
 *
 * State 1
 * Function submit 
 * Function Check answer 
 * 
 * State 2
 * Function needed to display correct or incorrect answer.
 * 
 * @authors Heather Guilfoyle, Sean Dunn, Colby Wall, Robert Ni
 */


let previousRenderColor = '';
function renderColors(id: string) {
    if (previousRenderColor !== '') {
        document.getElementById(previousRenderColor).style.border = '3px solid rgba(0,0,0,0)';
    }
    previousRenderColor = id;
    document.getElementById(id).style.border = '3px solid rgb(90, 50, 180)';
}

const useStyles = makeStyles({
    roundedBorder: {
        padding: '10px 0px 10px 0px',
        borderRadius: '10px',
        textAlign: 'center',
        border: '3px solid rgba(0,0,0,0)',
        '&:hover': {
            backgroundColor: 'rgb(240,240,240)'
        }
    }
});

function Answers() {
    
    // if redux.state-slices.store.game.match_state == 2 renderColors()
    const game = useSelector(gameState);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [answers, setAnswers] = useState([])
    

    useEffect(() => {
        setAnswers(gameUtil.randomizeAnswers(game.set.cardList[game.questionIndex]));
    }, [])

    async function submit(e: any) {
        //@ts-ignore
        let currentPlayer : Player = {};
        let playerList : Player[] = [].concat(game.players);
        playerList.forEach(player => {
            if (player.username == 'nobody') Object.assign(currentPlayer, player);
        })
        playerList.splice(playerList.findIndex(playre => playre.id == currentPlayer.id), 1)
        if (!currentPlayer || currentPlayer.answered) return;        
        currentPlayer.answered = true;
        if (e.target.id === game.set.cardList[game.questionIndex].correctAnswer) {            
            currentPlayer.answeredCorrectly = true;            
            currentPlayer.answeredAt = new Date().toISOString();
        } else {
            currentPlayer.answeredCorrectly = false;
        }
        playerList.push(currentPlayer);
        await API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: playerList}}))
        
        renderColors(e.target.id);
    }

    return (
        <>
        <TableContainer>
            <Table style={{tableLayout: 'fixed'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography id={answers[0]} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[0]}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography id={answers[1]} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[1]}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography id={answers[2]} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[2]}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography id={answers[3]} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[3]}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>      
        </>

    );
}
export default Answers; 

