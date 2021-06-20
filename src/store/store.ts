import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import quizResultsReducer from "../StateSlices/CreateQuiz/resultSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        result: quizResultsReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;