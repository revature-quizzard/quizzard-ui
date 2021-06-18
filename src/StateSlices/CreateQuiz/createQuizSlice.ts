import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Create an interface for the state object
interface State {
    studySet: Array<object>;
    isLoading: boolean;
    flashCard: object;
    isLoaded: boolean;
    studySetName: string;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    studySet: [],
    isLoading: false,
    flashCard: {},
    isLoaded: false,
    studySetName: ""
}

// Create the actual slice useing createSlice from the @reduxjs/toolkit dependency
export const createQuizSlice = createSlice({
    
    // Name the slice
    name: "createQuiz",
    
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
        }
    }
})

// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { isLoading, isLoaded } = createQuizSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const createQuizState = (state: RootState) => state.createQuiz;

// Export the entire slice to be included in the configureStore inside of store.ts
export default createQuizSlice.reducer;