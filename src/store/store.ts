import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../state-slices/create-quiz/create-quiz-slice";
import createStudySetReducer from "../state-slices/sets/create-study-sets-slice";
import flashcardsReducer from "../state-slices/flashcard/flashcard-slice";
import subjectsReducer from "../state-slices/subject/subject-slice";
import quizResultsReducer from "../state-slices/create-quiz/result-slice";
import setListReducer from '../state-slices/sets/set-list-slice';
import authReducer from "../state-slices/auth/auth-slice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        createStudySet: createStudySetReducer,
        flashcards: flashcardsReducer,
        subjects: subjectsReducer,
        result: quizResultsReducer,
        setList: setListReducer,
        auth: authReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;