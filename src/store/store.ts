import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import createStudySetReducer from "../StateSlices/StudySets/CreateStudySetsSlice";
import flashcardsReducer from "../StateSlices/Flashcard/flashcardsSlice";
import subjectsReducer from "../StateSlices/Subject/subjectsSlice";
import quizResultsReducer from "../StateSlices/CreateQuiz/resultSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        createStudySet: createStudySetReducer,
        flashcards: flashcardsReducer,
        subjects: subjectsReducer,
        result: quizResultsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;