
import {StudySet} from "../../models/study-set";
import {Flashcard, SetFlashcardDTO} from "../../models/cards";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "../../store/store";
import {Account} from "../../models/account";
import {Subject} from "../../models/subject";

/**
 * @author Sean Taba
 * interface for the state
 */
interface StudySetState {
    selectedStudySet: StudySet;
    flashcard: Flashcard;
    isStudySetSelected: boolean;
    isFlashCardSelected: boolean;
    showModal: boolean;
    question: string;
    answer: string;
    reviewable: boolean;
    public: boolean;
    availableStudySets: StudySet[];
    isLoading: boolean;
    finishedLoading: boolean;
    account: Account;
}

/**
 * @author Sean Taba
 * initial state values
 */
const initialState: StudySetState = {
    selectedStudySet: {id: -1, creator: {} as Account,cards: [] as SetFlashcardDTO[], name: '', isPublic: true},
    isStudySetSelected: false,
    flashcard: {id: -1, creator: {} as Account, public: true, answer: '', question: '', reviewable: true, subject: {} as Subject},
    isFlashCardSelected: false,
    showModal: false,
    question: '',
    answer: '',
    reviewable: true,
    public: true,
    availableStudySets: [],
    isLoading: false,
    finishedLoading: false,
    account: {} as Account
}

/**
 * @author Sean Taba
 * state definition, name, initial state, reducers
 */
export const studySetSlice = createSlice({
    name: "studySet",
    initialState,
    reducers: {
        finishedLoading: (state) => {
            state.isLoading = false;
            state.finishedLoading = true;
        },
        currentlyLoading: (state) => {
            state.isLoading = true;
            state.finishedLoading = false;
        },
        setStudySet: (state, action: PayloadAction<StudySet>) => {
            state.selectedStudySet = action.payload;
            state.isStudySetSelected = true;
        },
        clearStudySet: (state) => {
            state.selectedStudySet = {id: 0, creator: {} as Account,cards: [] as SetFlashcardDTO[], name: '', isPublic: true};
            state.isStudySetSelected = false;
        },
        setFlashcard: (state, action: PayloadAction<Flashcard>) => {
            state.flashcard = action.payload;
            state.isFlashCardSelected = true;
        },
        clearFlashcard: (state) => {
            state.flashcard = {id: 0, creator: {} as Account, public: true, answer: '', question: '', reviewable: true, subject: {} as Subject};
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
        },
        saveStudySets: (state, action: PayloadAction<StudySet[]>) => {
            state.availableStudySets = action.payload;
            state.finishedLoading = true;
        },
        appendCardToStudySet: (state, action: PayloadAction<SetFlashcardDTO>) => {
            state.selectedStudySet.cards.push(action.payload);
        }
        
    }
})
export const {setStudySet,setFlashcard, clearStudySet, saveFlashcard,
                saveStudySets, currentlyLoading, finishedLoading,
                appendCardToStudySet} = studySetSlice.actions;
export const studySetState = (state: RootState) => state.studySets;
export default studySetSlice.reducer;