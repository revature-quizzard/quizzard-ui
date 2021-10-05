import {FormControl, Input, InputLabel, MenuItem, Select} from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useEffect, useState } from 'react';
import { createGame } from '../../graphql/mutations';
import { getAllSets } from '../../remote/set-service';
import { setGame } from '../../state-slices/multiplayer/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import { authState } from '../../state-slices/auth/auth-slice';
import { guestState, setGuest } from '../../state-slices/multiplayer/guest-slice';
import { errorState, setErrorSeverity, showSnackbar, hideErrorMessage } from '../../state-slices/error/errorSlice';
import * as gameUtil from '../../utilities/game-utility'

//Need set to satisy typescript
interface Set{};

/**
 *  This component is used to set game settings with which to start a game, when the user clicks
 *  'Create Game'. 
 *  Users will be able to set:
 *      + Game name
 *      + Set of cards
 *      + Game capacity
 *      + Question timer
 * 
 *  Invalid input is set with default values (capacity and timer)
 * 
 * @author Colby Wall, John Callahan
 */
function GameSettings() {
    const [sets, setSets] = useState(undefined as Set[] | undefined)
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    const error = useSelector(errorState);
    const dispatch = useDispatch();
    const history = useHistory();

    //formData holds the model of a game and sets to default values
    const [formData, setFormData] = useState({
        gameName: '',
        capacity: 15,
        timer: 15,
        set: {
            id: '',
            setName: '',
            author: '',
            cards: [{
                id: '',
                question: '',
                correctAnswer: '',
                multiAnswers: []
            }]
        }
    })

    //Validation for creating the game
    let isFormValid = () => {
        for (const [key,value] of Object.entries(formData)) {
            if (!value) {
                return 2;
            }
        }
        if (formData.capacity < 1 || formData.capacity > 20) {
            return 3;
        } else if (formData.timer<3 || formData.timer > 45) {
            return 4;
        }
        return 1;
    }

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        console.log('formdata:',formData);
    }

    const getData = async() => {
        try{
            setSets(await getAllSets());
        } catch (e: any){
            console.log('e',e);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    // Tries to create a game, pushes it to DynamoDB, and
    // reroutes user to /multiplayer
    const createNewGame = async() => {
        let value = isFormValid();
        switch(value) {
            case 2:
            //Snack bar error message to user 
                dispatch(setErrorSeverity("warning"));
                dispatch(showSnackbar("Please fill in all fields"));
                return;
            case 3:
                //Snack bar error message to user 
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("There cannot be fewer than one players, or more than twenty!"));
                return;
            case 4:
                //Snack bar error message to user 
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("You cannot set a timer for less than five seconds, or more than forty-five seconds!"));
                return;
            default:
                break;
        }
        // Map the cards to an object that GraphQL will accept
        let cardList = formData.set.cards.map((card) => {
            let cardElement={};

            // @ts-ignore
            cardElement['id'] = card.id;
            // @ts-ignore
            cardElement['question'] = card.question;
            // @ts-ignore
            cardElement['correctAnswer'] = card.answer;
            // @ts-ignore
            cardElement['multiAnswers'] = [];
        
            return cardElement;
        })
        cardList.forEach((card, i) => {
            //@ts-ignore
            card.multiAnswers = gameUtil.generateWrongAnswers(card.correctAnswer, cardList);
        })
        console.log("CardList: ",cardList);

        let host = '';
        let id = '';
        let username = '';
        try{
            if(user.authUser){
                host = user.authUser.id;
                id = user.authUser.id;
                username = user.authUser.username;
            } else if (guestUser) {
                // @ts-ignore
                host = guestUser.id;
                // @ts-ignore
                id = guestUser.id;
                // @ts-ignore
                username = guestUser.nickname;
            } else {
                dispatch(setErrorSeverity("error"));
                dispatch(showSnackbar("Please login or continue as guest by setting a nickname."));
                return;
            }

            let inputGame = {
                id: Math.random().toString(36).substr(2, 5),
                name: formData.gameName,
                matchState: 0,
                questionIndex: 0,
                // @ts-ignore
                capacity: parseInt(formData.capacity),
                host: host,
                set: {
                    id: formData.set.id,
                    name: formData.set.setName,
                    creator: formData.set.author,
                    cardList
                },
                // @ts-ignore
                questionTimer: parseInt(formData.timer),
                players: [{
                    id: id,
                    username: username,
                    points: 0,
                    answered: false,
                    answeredAt: new Date().toISOString(),
                    answeredCorrectly: false,
                    placing: -1,
                    streak: 0
                }]
            }

            console.log('game',inputGame);
            //Set game in graphql
            await API.graphql(graphqlOperation(createGame, {input: inputGame })) as Promise<GraphQLResult>;
            //Set game in redux
            dispatch(setGame(inputGame));
            history.push('/multiplayer');
        }
        catch(e: any){
            //SNACKBAR notis here
            console.log('e',e);
        }
    }

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
                        placeholder='Enter question timer'
                    />
                </FormControl>

                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="set">Set</InputLabel>
                        {console.log('sets:',sets)}
                        <Select
                            id="set"
                            name="set"
                            label="Sets"
                            onChange={handleChange}
                            value={formData.set}
                            placeholder="Choose a set"
                        >

                        {sets == null // check if set is null
                        ?
                        <MenuItem>No sets found</MenuItem> // displays this if no sets found
                        :
                        // maps the sets if found
                        sets.map(
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