import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import flashcardsReducer from "../StateSlices/Flashcard/flashcardsSlice";
import subjectsReducer from "../StateSlices/Subject/subjectsSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        flashcards: flashcardsReducer,
        subjects: subjectsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;