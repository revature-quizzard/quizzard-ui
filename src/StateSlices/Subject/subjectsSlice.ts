import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {Subject} from "../../Models/Subject"

// Create an interface for the state object
interface State {
    subjects: Array<Subject>;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    subjects: [],
}

export const subjectsSlice = createSlice({
    
    // Name the slice
    name: "subjects",
    
    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {

        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        setSubjects: (state, action: PayloadAction<Subject[]>) => {
            state.subjects = action.payload
        }
    }
})


// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { setSubjects } = subjectsSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const subjectsState = (state: RootState) => state.subjects;

// Export the entire slice to be included in the configureStore inside of store.ts
export default subjectsSlice.reducer;