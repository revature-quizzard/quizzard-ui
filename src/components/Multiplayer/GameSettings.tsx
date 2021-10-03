import {FormControl, Input, InputLabel, MenuItem, Select} from '@mui/material';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useEffect, useState } from 'react';
import { createGame } from '../../graphql/mutations';
import { FlashcardDTO } from '../../models/flashcard';
import { getCards } from '../../remote/card-service';
import { setGame } from '../../state-slices/multiplayer/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import { authState } from '../../state-slices/auth/auth-slice';

/*
    Redux Props:
        + user
        + gameSettings {
            - name
            - set
            - capacity
            - timer
        }
 */

// Might not use modal?
// interface IGameSettings {
//     show: boolean;
//     setShow: (val: boolean) => void
// }

type Set = {
    id: string,
    author: string,
    cards: FlashcardDTO[],
    favorites: number,
    isPublic: boolean,
    name: string,       //Name of the type of set
    plays: number,
    setName: string,
    tags: object[],
    views: number
}

/**
 *  This modal is used to set game settings with which to start a game, when the user clicks
 *  'Create Game' in Game.tsx.
 *  Users will be able to set:
 *      + Game Name
 *      + Game Set
 *      + Game Capacity
 *      + Game Timer
 *  with some validation on each field.
 * 
 *  Games will not be able to be created if not all of these fields are set and valid.
 * 
 * @author Sean Dunn, Colby Wall, Heather Guilfoyle
 */
function GameSettings() {
    const [cards, setCards] = useState(undefined as Set[] | undefined)
    const [formData, setFormData] = useState({
        gameName: '',
        capacity: 15,
        timer: 15,
        set: {}
    })
    const user = useSelector(authState);
    const dispatch = useDispatch();
    const history = useHistory();

    let isFormValid = () => {
        for (const [key,value] of Object.entries(formData)) {
            if (!value) {
                return false;
            }
        }
        return true;
    }

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        console.log(formData);
    }

    const getData = async() => {
        try{
            setCards(await getCards());
        } catch (e: any){
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    // Creates a game, pushes it to DynamoDB, and
    // reroutes user to /multiplayer
    const createNewGame = async() => {
        if(!isFormValid()){
            //Snack bar error message to user 
            // props.setMessage('Please fill in all fields');
            // props.setSeverity('warning');
            // props.setOpen(true)
            // return;
        }
        try{
            if(user.authUser){
                var inputGame = {
                    id: Math.random().toString(36).substr(2, 5),
                    name: formData.gameName,
                    matchState: 0,
                    questionIndex: 0,
                    capacity: formData.capacity,
                    host: user.authUser.username,
                    set: formData.set,
                    timer: formData.timer,
                    // set: {
                    //     id: '10',
                    //     name: 'Test Set',
                    //     creator: 'nobody',
                    //     cardList: [{
                    //         id: '10',
                    //         question: 'What is the answer to this question?',
                    //         correctAnswer: "There isn't one",
                    //         multiAnswers: ['wrong', 'correct', 'idk']
                    //     }]
                    // },
                    players: [{
                        id: '10',
                        username: 'nobody',
                        points: 0,
                        answered: false,
                        answeredAt: new Date().toISOString(),
                        answeredCorrectly: false
                    }]
                }
            }
            console.log(inputGame);
            let resp = await API.graphql(graphqlOperation(createGame, {input: inputGame })) as Promise<GraphQLResult>;
            dispatch(setGame(inputGame));
            history.push('/multiplayer');
        }
        catch(e: any){
            //SNACKBAR notis here uwu
            console.log(e);
        }
    }

    /*      - name
            - set
            - capacity
            - timer */
    return (
        <>
            <div>
                <h1>Create Game</h1>
            </div>
                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='gameName'>Game Name</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='gameName'
                        name='gameName'
                        type='text'
                        placeholder='Enter a game name'
                    />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='capacity'>Capacity</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='capacity'
                        name='capacity'
                        type='number'
                        placeholder='Enter a capacity'
                    />
                </FormControl>

                <FormControl margin='normal' fullWidth>
                    <InputLabel htmlFor='timer'>Timer</InputLabel>
                    <Input
                        onChange={handleChange}
                        id='timer'
                        name='timer'
                        type='number'
                        placeholder='Enter a timer for questions'
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="set">Set</InputLabel>
                        {console.log(cards)}
                        <Select
                            id="set"
                            name="set"
                            label="Sets"
                            onChange={handleChange}
                            value={formData.set}
                            placeholder="Choose a set"
                        >

                        {cards == null // check if cards are null
                        ?
                        <MenuItem>No sets found</MenuItem> // displays this if no sets found
                        :
                        // maps the cards if it's found
                        cards.map(
                            (item: any, index: any) => (
                                <MenuItem value={item}>{item.setName}</MenuItem>
                            )
                        )}

                        </Select>
                    </FormControl>

                    <Button onClick = {createNewGame}>Create Game </Button>
        </>
    );
}

export default GameSettings;