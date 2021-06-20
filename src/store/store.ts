import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../StateSlices/CreateQuiz/createQuizSlice";
import studySetReducer from "../StateSlices/StudySet/studysetSlice"
export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        studySets: studySetReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;