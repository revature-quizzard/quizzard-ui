import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import * as gameUtil from '../../utilities/game-utility';
import { Card } from '../../API';
import { gameState } from '../../state-slices/multiplayer/game-slice';
import { useSelector, useDispatch } from 'react-redux';


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

let testCard = {
    id: "1",
    question: "What are you doing?",
    correctAnswer: "Sleeping",
    multiAnswers: [
        "Working",
        "Working Very Hard",
        "Working, but also not working.",
        "Sleeping"
    ]
}





function renderColors() {
    
}


function Answers() {
    
    // if redux.state-slices.store.game.match_state == 2 renderColors()
    const game = useSelector(gameState);
    const dispatch = useDispatch();

    let answers: string[] = gameUtil.randomizeAnswers(game.set.cardList[game.questionIndex]);

    function submit(e: any) {
        if (e.target.id === game.set.cardList[game.questionIndex].correctAnswer) {
            console.log('yes');
        } else {
            console.log('no');
        }
    }

    return (
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    {testCard.question}
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