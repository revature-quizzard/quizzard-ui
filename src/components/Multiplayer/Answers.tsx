import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import React from 'react';
import { API, graphqlOperation } from 'aws-amplify';
import * as queries from '../../graphql/queries';
import { createWrongAnswerArray, generateWrongAnswers } from '../../utilities/game-utility';
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

 export async function createAnswers() {
    let response = await API.graphql(graphqlOperation(queries.getGame, {id: '1'}));
    getCardList(response);
}

let getCardList = (response: any) => {
    let cardList = response.data.getGame.set.cardList;
    let answerBank: Array<string> = [];
    console.log(cardList);

    for (let card of cardList) {
        answerBank.push(card.correctAnswer);
    }

    for (let card of cardList) {
        let wrongAnswers = generateWrongAnswers(card, answerBank);
        card.multiAnswers = wrongAnswers;
    }
    console.log(cardList);
}


// @ts-ignore
function randomizeAnswers(card): string[] {
    let answers: string[] | undefined = [];
    let order: number[] = [];
    let ranNum: number = Math.floor(Math.random() * 4);
    while (order.length < 4) {
        if (!order.includes(ranNum)) {
            order.push(ranNum);
        }
        ranNum = Math.floor(Math.random() * 4);
    }

    let i: number = 0;
    while (answers.length < 4) {
        answers.push(card.multiAnswers[order[i++]]);
    }

    console.log(answers);

    return answers;
}



function renderColors() {
    
}


function Answers() {
    let answers: string[] = randomizeAnswers(testCard);
    // if redux.state-slices.store.game.match_state == 2 renderColors()
    const game = useSelector(gameState);
    const dispatch = useDispatch();
    
    function submit(e: any) {
        if (e.target.id === testCard.correctAnswer) {
            console.log('yes');
        } else {
            console.log('no');
        }
    }

    return (
        <>
        <Button onClick={createAnswers}>Test Me</Button>
        {
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
        }       
        </>

    );
}
export default Answers; 