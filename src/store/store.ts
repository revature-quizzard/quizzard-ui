import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import studySetReducer from "../StateSlices/StudySet/studysetSlice"
export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        studySet: studySetReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;