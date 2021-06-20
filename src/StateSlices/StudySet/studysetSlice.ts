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
    isStudySetSelected: boolean;
    isFlashCardSelected: boolean;
    showModal: boolean;
    question: string;
    answer: string;
    reviewable: boolean;
    public: boolean;
}

const initialState: StudySetState = {
    studySet: {id: -1, account_id: -1, name: '', public: true},
    isStudySetSelected: false,
    flashcard: {id: -1, account_id: -1, public: true, answer: '', question: '', reviewable: true, subject_id: -1},
    isFlashCardSelected: false,
    showModal: false,
    question: '',
    answer: '',
    reviewable: true,
    public: true,
}

export const studySetSlice = createSlice({
    name: "studySet",
    initialState,
    reducers: {
        setStudySet: (state, action: PayloadAction<StudySet>) => {
            state.studySet = action.payload;
            state.isStudySetSelected = true;
        },
        clearStudySet: (state) => {
            state.studySet = {id: -1, account_id: -1, name: '', public: true};
            state.isStudySetSelected = false;
        },
        setFlashcard: (state, action: PayloadAction<Flashcard>) => {
            state.flashcard = action.payload;
            state.isFlashCardSelected = true;
        },
        clearFlashcard: (state) => {
            state.flashcard = {id: -1, account_id: -1, public: true, answer: '', question: '', reviewable: true, subject_id: -1};
            state.isFlashCardSelected = false;
        },
        showAddFlashcardModal: (state, action: PayloadAction<boolean>) =>  {
            state.showModal = action.payload;
        },
        saveFlashcard: (state, action: PayloadAction<Flashcard>) => {
            state.question = action.payload.question;
            state.answer = action.payload.answer;
            state.reviewable = action.payload.reviewable;
            state.public = action.payload.public;
        }
    }
})
export const {setStudySet,setFlashcard, clearFlashcard, clearStudySet, showAddFlashcardModal,saveFlashcard} = studySetSlice.actions;
export const studySetState = (state: RootState) => state.studySets;
export default studySetSlice.reducer;