import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, makeStyles, TextField, Typography } from '@material-ui/core';
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

let previousRenderColor = '';

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

function renderColors(id: string) {
    if (previousRenderColor !== '') {
        document.getElementById(previousRenderColor).style.border = '3px solid rgba(0,0,0,0)';
    }
    previousRenderColor = id;
    document.getElementById(id).style.border = '3px solid rgb(90, 50, 180)';
}


function Answers() {
    const classes = useStyles();

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
        renderColors(e.target.id);
    }

    return (
        <>
        <Button onClick={createAnswers}>Test Me</Button>
        {
        <TableContainer>
            <Table style={{tableLayout: 'fixed'}}>
                <TableHead>
                    {testCard.question}
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
        }       
        </>

    );
}
export default Answers; 

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