import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subforum } from '../../models/subforum';
import { Thread } from '../../models/thread';
import { RootState } from '../../store/store';


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

export const { setCurrentSubforum, setCurrentThread } = forumSlice.actions;

export const forumState = (state: RootState) => state.forum;

export default forumSlice.reducer;