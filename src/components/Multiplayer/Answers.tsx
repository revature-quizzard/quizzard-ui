import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, TextField, Typography } from '@material-ui/core';
import React, { useState, useEffect, useRef } from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as gameUtil from '../../utilities/game-utility';
import { Card } from '../../API';
import { gameState, Player } from '../../state-slices/multiplayer/game-slice';
import { useSelector, useDispatch } from 'react-redux';
import { updateGame } from '../../graphql/mutations';
import { authState } from '../../state-slices/auth/auth-slice';
import { guestState } from '../../state-slices/multiplayer/guest-slice';


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
 * @author Heather Guilfoyle, Sean Dunn, Colby Wall, Robert Ni
 */

const useStyles = makeStyles({
    roundedBorder: {
        padding: '10px 0px 10px 0px',
        borderRadius: '10px',
        textAlign: 'center',
        border: '3px solid rgba(0,0,0,0)',
        '&:hover': {
            backgroundColor: 'rgb(240,240,240)'
        }
    },
    selectedAnswer: {
        border: '3px solid rgb(90, 50, 180)'
    },
    correctAnswer: {
        border: '3px solid rgb(6, 196, 44)'
    },
    wrongAnswer: {
        border: '3px solid rgb(196, 22, 10)'
    }
});

function Answers() {
    const game = useSelector(gameState);
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    const dispatch = useDispatch();
    const classes = useStyles();
    const [answers, setAnswers] = useState([])
    

    useEffect(() => {
        if (game.matchState === 1) {
            setAnswers(gameUtil.randomizeAnswers(game.set.cardList[game.questionIndex]));  
        }      
    }, [game.matchState]);

    useEffect(() => {
        // Render correct/incorrect answers with color
        if (game.matchState === 1) {
            for (let i = 0; i < 4; i++) {
                let element = document.getElementById(i.toString());
                element.classList.remove(classes.selectedAnswer);
                element.classList.remove(classes.correctAnswer);
                element.classList.remove(classes.wrongAnswer);
            }
        } else if (game.matchState === 2) {
            answers.forEach((answer, i) => {
                if (answer == game.set.cardList[game.questionIndex].correctAnswer) {                    
                    document.getElementById(i.toString()).classList.add(classes.correctAnswer);
                } else document.getElementById(i.toString()).classList.add(classes.wrongAnswer);
            });
        }
    }, [game.matchState, answers]);

    async function submit(e: any) {
        if (game.matchState == 2) return;

        console.log('submit e:', e.target.id)
        let currentUser = user.authUser ? user.authUser.username : guestUser ? guestUser.nickname : undefined;
        //@ts-ignore
        let currentPlayer : Player = {};
        let playerList : Player[] = [].concat(game.players);
        playerList.forEach(player => {
            if (player.username == currentUser) Object.assign(currentPlayer, player);
        })
        playerList.splice(playerList.findIndex(player => player.id == currentPlayer.id), 1)
        if (!currentPlayer || currentPlayer.answered) return;        
        currentPlayer.answered = true;
        if (answers[e.target.id] === game.set.cardList[game.questionIndex].correctAnswer) {            
            currentPlayer.answeredCorrectly = true;            
            currentPlayer.answeredAt = new Date().toISOString();
        } else {
            currentPlayer.answeredCorrectly = false;
        }
        playerList.push(currentPlayer);
        console.log('Player list after submit:', playerList)
        await API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: playerList}}))
        
        renderColors(e.target.id);
    }

    function renderColors(id: string) {
        document.getElementById(id).classList.add(classes.selectedAnswer);
    }

    return (
        <>
        <TableContainer>
            <Table style={{tableLayout: 'fixed'}}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography id={'0'} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[0]}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography id={'1'} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[1]}
                            </Typography>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>
                            <Typography id={'2'} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
                                {answers[2]}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography id={'3'} onClick={submit} className={classes.roundedBorder} variant='button' display='block'>
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

