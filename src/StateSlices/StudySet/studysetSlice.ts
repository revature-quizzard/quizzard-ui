import {StudySet} from "../../Models/StudySet";
import {Flashcard} from "../../Models/Flashcard";
import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "../../store/store";

interface State {
    studyset: StudySet;
    flashcard: Flashcard;

}

const initialState: State = {
    studyset: {id: -1, account_id: -1, name: '', public: true},
    flashcard: {id: -1, account_id: -1, public: true, answer: '', question: '', reviewable: true, subject_id: -1},

}

export const studysetSlice = createSlice({
    name: "studySet",
    initialState,

    reducers: {
        setStudyset: (state, action) => {
            state.studyset = action.payload.studyset;
        },
        setFlashcard: (state, action) => {
            state.flashcard = action.payload.flashcard;
        }
    }
})
export const {setStudyset,setFlashcard} = studysetSlice.actions;
export const studysetState = (state: RootState) => state.studySet;
export default studysetSlice.reducer;