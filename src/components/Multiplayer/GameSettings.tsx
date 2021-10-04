import {FormControl, Input, InputLabel, MenuItem, Select} from '@mui/material';
import { API, graphqlOperation } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import { useEffect, useState } from 'react';
import { createGame } from '../../graphql/mutations';
import { getSets } from '../../remote/sets-fetcher';
import { setGame } from '../../state-slices/multiplayer/game-slice';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { Button } from '@mui/material';
import { authState } from '../../state-slices/auth/auth-slice';
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
 * @author Colby Wall
 */
function GameSettings() {
    const [sets, setSets] = useState(undefined as Set[] | undefined)
    const user = useSelector(authState);
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
            setSets(await getSets());
        } catch (e: any){
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    },[]);

    // Tries to create a game, pushes it to DynamoDB, and
    // reroutes user to /multiplayer
    const createNewGame = async() => {
        if(!isFormValid()){
            //Snack bar error message to user 
            // props.setMessage('Please fill in all fields');
            // props.setSeverity('warning');
            // props.setOpen(true)
            return;
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

        try{
            if(user.authUser){
                var inputGame = {
                    id: Math.random().toString(36).substr(2, 5),
                    name: formData.gameName,
                    matchState: 0,
                    questionIndex: 0,
                    // @ts-ignore
                    capacity: parseInt(formData.capacity),
                    host: user.authUser.username,
                    set: {
                        id: formData.set.id,
                        name: formData.set.setName,
                        creator: formData.set.author,
                        cardList
                    },
                    // @ts-ignore
                    questionTimer: parseInt(formData.timer),
                    players: [{
                        id: user.authUser.id,
                        username: user.authUser.username,
                        points: 0,
                        answered: false,
                        answeredAt: new Date().toISOString(),
                        answeredCorrectly: false,
                        placing: -1,
                        streak: 0
                    }]
                }
            } else {
                console.log("inputGame is undefined because user is not logged in.");
            }
            console.log(inputGame);
            //Set game in graphql
            await API.graphql(graphqlOperation(createGame, {input: inputGame })) as Promise<GraphQLResult>;
            //Set game in redux
            dispatch(setGame(inputGame));
            history.push('/multiplayer');
        }
        catch(e: any){
            //SNACKBAR notis here
            console.log(e);
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
                        {console.log(sets)}
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