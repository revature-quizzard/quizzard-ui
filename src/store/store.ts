import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";

export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;