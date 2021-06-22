import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {Studyset} from "../../Models/Studyset"
import { Flashcard } from "../../models/Flashcard";
import FlashCard from "../../components/Flashcards/Flashcard";
import { studySet } from "../../Utilities/dummyData";

//Create interface for state
interface State {
    isLoading: boolean;
    isLoaded: boolean;
    studySet: Array<Flashcard>;
    flashCard: object;
    showStudySet: boolean;
    listStudySet: Array<Studyset>
}

//set the initial state
const initialState: State = {
    isLoading: false,
    isLoaded: false,
    studySet: [],
    flashCard: {},
    showStudySet: false,
    listStudySet: [],

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

        addStudySet: (state, action: PayloadAction<Array<Studyset>>) => {
            state.studySet = action.payload;
        },

//load studySet

        deleteStudySet: (state) => {
            state.studySet = [];
        }

    },
});
export const {
    isLoading,
    isLoaded,
    addStudySet,
    deleteStudySet,
    loadStudySet
} = createStudySetSlice.actions;




export const createStudySetState = (state: RootState) => state.createStudySet;

export default createStudySetSlice.reducer;