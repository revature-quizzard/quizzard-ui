import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import React from 'react';
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

function renderColors() {
    
}

function Answers() {
    
    // if redux.state-slices.store.game.match_state == 2 renderColors()
    const game = useSelector(gameState);
    const dispatch = useDispatch();

    let answers: string[] = gameUtil.randomizeAnswers(game.set.cardList[game.questionIndex]);

    async function submit(e: any) {
        let currentPlayer : Player;
        let playerList : Player[] = game.players;
        playerList.forEach(player => {
            if (player.username == 'nobody') currentPlayer = player;
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
    }

    return (
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell id={answers[0]} onClick={submit}>{answers[0]}</TableCell>
                        <TableCell id={answers[1]} onClick={submit}>{answers[1]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell id={answers[2]} onClick={submit}>{answers[2]}</TableCell>
                        <TableCell id={answers[3]} onClick={submit}>{answers[3]}</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>      
        </>

    );
}
export default Answers; 