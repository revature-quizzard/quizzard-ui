import { useState, useEffect, useRef } from 'react';
import { createStyles, Input, InputLabel, Theme, makeStyles, Button, MenuItem, Select, Grid, Typography, FormControl } from "@material-ui/core";
import { getCards } from '../../remote/card-service';
import Game from './Game';
import { FlashcardDTO } from '../../models/flashcard';
import { constants } from 'buffer';

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle
 **/

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

export default function GameLounge() {
    const [cards, setCards] = useState(undefined as Set[] | undefined)
    const [formData, setFormData] = useState({
        set: []
    })

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
        console.log(formData);
    }

    
    // async function asyncSets(){
    //     setCards(await getCards());
    //     console.log(cards);
    // }

    // asyncSets();

        

    return (
        <>
        <div className="App">
            <header className="App-header">
                Welcome to the looounnnge...
                <br></br>
                <br></br>
                <br></br>
            </header>
            
            </div>
                {console.log(cards)}
                {/* <Game/> */}
                <FormControl margin="normal" fullWidth>
                    <InputLabel htmlFor="set">Sets</InputLabel>
                        {console.log(cards)}
                        <Select
                            id="set"
                            name="set"
                            label="Sets"
                            onChange={handleChange}
                            value={formData.set[0]}
                        >  

                        {cards == null // check if cards are null
                        ?
                        <MenuItem>No sets found</MenuItem> // displays this if no sets found
                        :
                        // maps the cards if it's found
                        cards.map(
                            (item: any, index: any) => (
                                <MenuItem value={item}>{item.name}</MenuItem>
                            )
                        )}

                        {/* {cards?.map(
                            (item: any, index: any) =>
                            (
                                <MenuItem value={item}>item.name</MenuItem>
                            )
                        )} */}

                        </Select>
                    </FormControl>
        </>
    )
}