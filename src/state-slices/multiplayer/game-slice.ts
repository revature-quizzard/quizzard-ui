import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";


interface Player {
    id: String
}

interface Set {
    card_list: Card[]
}

interface Card {
    id: String,
    question: String,
    correctAnswer: String,
    multiAnswers: String[]
}

interface State {
    id: String,
    name: String,
    match_state: number,
    question_index: number,
    capacity: number,
    host: String,
    set: Set,
    players: Player[]
}

const initialState: State = {
    id: '-1',
    name: '',
    match_state: 0,
    question_index: 0,
    capacity: 0,
    host: '',
    set: {
        card_list: []
    },
    players: []
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
            // state = action.payload;
            state.id = action.payload.id;
            state.name = action.payload.name;
            state.match_state = action.payload.match_state;
            state.question_index = action.payload.question_index;
            state.capacity = action.payload.capacity;
            state.host = action.payload.host;
            state.set = action.payload.set;
            state.players = action.payload.players;
            console.log('Setting ', state, ' to ', action.payload)
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