import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { Flashcard } from "../../models/flashcard";
import { Set } from "../../dtos/Set"

//Create interface for state
interface State {
    isLoading: boolean;
    isLoaded: boolean;
    aSet: Set | undefined;
}
//set the initial state
const initialState: State = {
    isLoading: false,
    isLoaded: false,
    aSet: undefined,

};

//create the slice using createSlice
export const createStudySetSlice = createSlice({

    //Name the slice
    name: "createStudySet",

    //initial state
    initialState,

    //Outline actions called by Dispatcher within components
    reducers: {

        isLoading: (state) => {
            state.isLoading = true;
            state.isLoaded = false;
        },

        isLoaded: (state) => {
            state.isLoading = false;
            state.isLoaded = true;
        },

        StudySet: (state, action: PayloadAction<Set>) => {

             state.aSet = action.payload;
             console.log(state.aSet)
         },

//load studySet

        deleteStudySet: (state) => {
            state.aSet = undefined;
        }

    },
});
export const {
    isLoading,
    isLoaded,
    StudySet,
    deleteStudySet

} = createStudySetSlice.actions;




export const StudySetState = (state: RootState) => state.createStudySet;

export default createStudySetSlice.reducer;