import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CardDto } from "../../models/request-models/card-dto";
import { Card } from "../../models/response-models/card";
import { Set } from "../../models/set";
import { Tag } from "../../models/tag";
import { RootState } from "../../store/store";


// Create an interface for the state object
interface State {
    isLoading: boolean;
    isLoaded: boolean;
    isPublic: boolean;
    cardsIsShowing: boolean; // toggles card vissibility
    currentSet: Set;
   
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    isLoading: false,
    isLoaded: false,
    isPublic: false,
    cardsIsShowing: false,
    currentSet: undefined,
    //If you are using test cards, start at count: 426, so you can see the 'end of flashcards' component
    //Which provides the button to go back to the start
}

// Create the actual slice useing createSlice from the @reduxjs/toolkit dependency
export const flashcardsSlice = createSlice({
    
    // Name the slice
    name: "sets",
    
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

        setCards: (state, action: PayloadAction<Card[]>) => {
        },
        setCurrentSet: (state, action: PayloadAction<Set>) => {
            state.currentSet = action.payload
        },
        toggleCards: (state) => {
            state.cardsIsShowing = !state.cardsIsShowing;
          },
        prevCard: (state) => {
        },

        resetCount: (state) => {
        }
        

    }
})

// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { isLoading, isLoaded,  prevCard, resetCount } = flashcardsSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const SetState = (state: RootState) => state.sets;

// Export the entire slice to be included in the configureStore inside of store.ts
export default flashcardsSlice.reducer;