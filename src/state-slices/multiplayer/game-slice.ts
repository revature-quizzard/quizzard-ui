import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";


export interface Player {
    id: string,
    username: string,
    points: number,
    answered: boolean,
    answeredAt: string,
    answeredCorrectly: boolean,
    placing: number,
    streak: number,
    pointsEarned: number,
    afk: boolean
}

interface Set {
    cardList: Card[]
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
    matchState: number,
    questionIndex: number,
    capacity: number,
    host: String,
    questionTimer: number,
    set: Set,
    players: Player[]
}

const initialState: State = {
    id: '',
    name: '',
    matchState: 0,
    questionIndex: 0,
    capacity: 0,
    host: '',
    questionTimer: 10,
    set: {
        cardList: []
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
            state.matchState = action.payload.matchState;
            state.questionIndex = action.payload.questionIndex;
            state.capacity = action.payload.capacity;
            state.host = action.payload.host;
            state.questionTimer = action.payload.questionTimer;
            state.set = action.payload.set;
            state.players = action.payload.players;
            console.log('Setting ', state, ' to ', action.payload)
        },

        // Used when resetting the state
        resetGame: (state) => {
            state.id = '';
            state.name = '';
            state.matchState = 0;
            state.questionIndex = 0;
            state.capacity = 0;
            state.host = '';
            state.questionTimer = 0;
            state.set = undefined;
            state.players = undefined;
        }
    }
});

// Export the actions/reducers to be imported into a component and dispatched from component
export const {
    setGame,
    resetGame
} = gameSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const gameState = (state: RootState) => state.game;

// Export the entire slice to be included in the configureStore inside of store.ts
export default gameSlice.reducer;