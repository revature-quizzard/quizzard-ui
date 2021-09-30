import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import gameStateSlice from "./game-state-slice";


interface Player {
    id: String
}

interface Set {
    card_list: Card[]
}

interface Card {
    id: String,
    question: String,
    answer: String
}

interface Game {
    id: String,
    name: String,
    match_state: number,
    question_index: number,
    capacity: number,
    set: Set,
    players: Player[]
}

interface State {
    game: Game
}

const initialState: State = {
    game: {
        id: '-1',
        name: '',
        match_state: 0,
        question_index: 0,
        capacity: 0,
        set: {
            card_list: []
        },
        players: []
    }
};

// Create the actual slice
export const gameSlice = createSlice({
    // Name the slice
    name: 'game',

    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {
        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        
        // Used when establishing a new game
        setGame: (state, action) => {
            state.game = action.payload;
        }


    }
});

// Export the actions/reducers to be imported into a component and dispatched from component
export const {
    setGame
} = gameSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const gameState = (state: RootState) => state.game;

// Export the entire slice to be included in the configureStore inside of store.ts
export default gameSlice.reducer;