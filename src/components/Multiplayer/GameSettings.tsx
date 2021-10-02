import {FormControl, InputLabel, MenuItem, Modal, Select} from '@material-ui/core';
import { useEffect, useState } from 'react';
import { FlashcardDTO } from '../../models/flashcard';
import { getCards } from '../../remote/card-service';

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
        set: []
    })

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        console.log(formData);
    }

    const getData = async function () {
        try{
            setCards(await getCards());
        } catch (e: any){
            console.log(e);
        }
    }

    useEffect(() => {
        getData();
    },[]);


    /*      - name
            - set
            - capacity
            - timer */
    return (
        <>
            <div>
                <h1>Create Game</h1>
            </div>
                {console.log(cards)}
                {/* <Game/> */}
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="set">Set</InputLabel>
                        {console.log(cards)}
                        <Select
                            id="set"
                            name="set"
                            label="Sets"
                            onChange={handleChange}
                            value={formData?.set[0]}
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
        </>
    );
}

export default GameSettings;