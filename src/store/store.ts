import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import flashcardsReducer from "../StateSlices/Flashcard/flashcardsSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        flashcards: flashcardsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;