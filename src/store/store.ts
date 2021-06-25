/**
 * @Co-Author: Sean Taba
 */

import { configureStore } from "@reduxjs/toolkit";
import createQuizReducer from "../state-slices/create-quiz/create-quiz-slice";
import studySetReducer from "../state-slices/study-set/study-set-slice"
export const store = configureStore({
    reducer: {
        createQuiz: createQuizReducer,
        studySets: studySetReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;