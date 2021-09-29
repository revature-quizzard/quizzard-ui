import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subforum } from '../../models/subforum';
import { Thread } from '../../models/thread';


interface State {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
}

const initialState: State = {
    currentSubforum: undefined,
    currentThread: undefined
}

export const forumSlice = createSlice({
    name: 'forum',
    initialState,
    reducers: {
        setCurrentSubforum: (state, action: PayloadAction<Subforum>) => {
            state.currentSubforum = action.payload;
        },
        setCurrentThread: (state, action: PayloadAction<Thread>) => {
            state.currentThread = action.payload;
        }
    }
})