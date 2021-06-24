import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {Flashcard} from "../../Models/Flashcard"

// Create an interface for the state object
interface State {
    isLoading: boolean;
    isLoaded: boolean;
    flashCards: Array<Flashcard>;
    count: number;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    flashCards: [],
    isLoading: false,
    isLoaded: false,
    //If you are using test cards, start at count: 426, so you can see the 'end of flashcards' component
    //Which provides the button to go back to the start
    count: 0
}

// Create the actual slice useing createSlice from the @reduxjs/toolkit dependency
export const flashcardsSlice = createSlice({
    
    // Name the slice
    name: "flashcards",
    
    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {

        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        isLoading: (state) => {
            state.isLoading = true;
            state.isLoaded = false;
        },
        isLoaded: (state) => {
            state.isLoading = false;
            state.isLoaded = true;
        },

        addFlashcard: (state, action: PayloadAction<Flashcard>) =>{
           state.flashCards.push(action.payload)
        },

        setFlashcards: (state, action: PayloadAction<Flashcard[]>) => {
            state.flashCards = action.payload
        },
        nextCard: (state) => {
            state.count += 1;
          },
        prevCard: (state) => {
        state.count -= 1;
        },

        resetCount: (state) => {
            state.count = 0;
        }
        

    }
})

// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { isLoading, isLoaded, addFlashcard, setFlashcards, nextCard, prevCard, resetCount } = flashcardsSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const flashcardsState = (state: RootState) => state.flashcards;

// Export the entire slice to be included in the configureStore inside of store.ts
export default flashcardsSlice.reducer;