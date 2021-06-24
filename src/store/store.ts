import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import createStudySetReducer from "../StateSlices/Sets/createStudySetsSlice";
import flashcardsReducer from "../StateSlices/Flashcard/flashcardsSlice";
import subjectsReducer from "../StateSlices/Subject/subjectsSlice";
import quizResultsReducer from "../StateSlices/CreateQuiz/resultSlice";
import setListReducer from '../StateSlices/Sets/setListSlice';
import authReducer from "../StateSlices/Auth/authSlice";

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