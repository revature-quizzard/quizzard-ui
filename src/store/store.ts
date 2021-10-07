
/**
 * @Co-Author: Sean Taba
 */

import { configureStore } from "@reduxjs/toolkit";
import createStudySetReducer from "../state-slices/sets/create-study-sets-slice";
import flashcardsReducer from "../state-slices/flashcard/flashcard-slice";
import subjectsReducer from "../state-slices/subject/subject-slice";
import authReducer from "../state-slices/auth/auth-slice";
import studySetReducer from "../state-slices/study-set/study-set-slice";
import gameReducer from "../state-slices/multiplayer/game-slice";
import guestReducer from "../state-slices/multiplayer/guest-slice";
import errorReducer from "../state-slices/error/errorSlice";
import forumReducer from "../state-slices/forum/forum-slice"
import profileReducer from "../state-slices/user-profile/profile-slice";
import createSetReducer  from "../state-slices/study-set/create-set-model-slice";
import updateSetReducer  from "../state-slices/study-set/update-set-modal-slice";
import {createStore, combineReducers} from 'redux'



export const store = configureStore({
    reducer: {
        studySets: studySetReducer,
        createStudySet: createStudySetReducer,
        flashcards: flashcardsReducer,
        subjects: subjectsReducer,
        auth: authReducer,
        game: gameReducer,
        error: errorReducer,
        profile: profileReducer, 
        createSet: createSetReducer,
        updateSet: updateSetReducer,
        forum: forumReducer,
        guest: guestReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;