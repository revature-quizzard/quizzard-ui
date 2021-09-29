import { Table, Button, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';
import { Row } from 'react-bootstrap';


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
 * @authors Heather Guilfoyle, Sean Dunn, Colby Wall
 */

function generateAnswers(): string[] {
 //pull answer from current question +
 //pull 3 random answers from the set
 //randomize them
 return []
}

function submit() {
    
}

function renderColors() {
    
}


function Answers() {

    let answers = generateAnswers()
    // if redux.state-slices.store.game.match_state == 2 renderColors()
    return (
        <>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell id= "answer1" onClick={submit}>{answers[0]}</TableCell>
                        <TableCell id= "answer2" onClick={submit}>{answers[1]}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell id= "answer3" onClick={submit}>{answers[2]}</TableCell>
                        <TableCell id= "answer4" onClick={submit}>{answers[3]}</TableCell>
                    </TableRow>
                </TableHead>
            </Table>
        </TableContainer>
        </>

    );
}
export default Answers; 