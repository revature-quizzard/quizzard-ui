/**
 * @Author: Sean Taba
 */

import {StudySet} from "../../Models/StudySet";
import {Flashcard} from "../../Models/Flashcard";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../store/store";

interface StudySetState {
    studySet: StudySet;
    flashcard: Flashcard;
}

const initialState: StudySetState = {
    studySet: {id: -1, account_id: -1, name: '', public: true},
    flashcard: {id: -1, account_id: -1, public: true, answer: '', question: '', reviewable: true, subject_id: -1},
}

export const studySetSlice = createSlice({
    name: "studySet",
    initialState,
    reducers: {
        setStudySet: (state, action: PayloadAction<StudySet>) => {
            state.studySet = action.payload;
        },
        setFlashcard: (state, action: PayloadAction<Flashcard>) => {
            state.flashcard = action.payload;
        }
    }
})
export const {setStudySet,setFlashcard} = studySetSlice.actions;
export const studySetState = (state: RootState) => state.studySets;
export default studySetSlice.reducer;