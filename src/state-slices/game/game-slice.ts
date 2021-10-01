import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Round } from "../../models/round";
import { Vector2 } from "../../models/vector2";
import { RootState } from "../../store/store";

// Create an interface for the state object
interface State {
    rounds: Array<Round>;
    score: number;
    target_position: Vector2;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    rounds: [],
    score: 0,
    target_position: { x: 0, y: 0 } as Vector2
   
}
  /**
   * Creates a slice for subjects with a reducer to set the subject state for existing subjects.
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
export const gameSlice = createSlice({
    
    // Name the slice
    name: "game",
    
    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {

        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        setRounds: (state, action: PayloadAction<Round[]>) => {
            state.rounds = action.payload;
        },
        translateY: (state) => {
            state.target_position.y += 1; 
        },
        translateX: (state) => {
            state.target_position.x += 1; 
        },
        increaseScore: (state, action: PayloadAction<number>) => {
            state.score += action.payload; 
        }, 
        resetScore: (state, action: PayloadAction<Event>) => {
            state.score = 0; 
        }
        
    }
})


// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { setRounds , translateY , translateX , increaseScore , resetScore } = gameSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const gameState = (state: RootState) => state.game;

// Export the entire slice to be included in the configureStore inside of store.ts
export default gameSlice.reducer;