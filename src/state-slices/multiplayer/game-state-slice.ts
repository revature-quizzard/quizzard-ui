import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
    match_state: string
}

const initialState: State = {
    match_state: 'WAITING'
};

// Create the actual slice
export const gameStateSlice = createSlice({
    // Name the slice
    name: 'gameState',

    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {
        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        
        nextQuestion: (state, action) => {
            state.match_state = 'DISPLAY_QUESTION';
        },

        showAnswer: (state, action) => {
            state.match_state = 'DISPLAY_ANSWER';
        },

        finishGame: (state) => {
            state.match_state = 'ENDGAME';
        }



    }
});

// Export the actions/reducers to be imported into a component and dispatched from component
export const {
    nextQuestion,
    showAnswer,
    finishGame
} = gameStateSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const gameStateState = (state: RootState) => state.gameState;

// Export the entire slice to be included in the configureStore inside of store.ts
export default gameStateSlice.reducer;