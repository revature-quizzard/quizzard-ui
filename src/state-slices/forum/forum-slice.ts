import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Subforum } from '../../models/subforum';
import { Thread } from '../../models/thread';
import { Comment } from '../../models/comment';
import { RootState } from '../../store/store';


interface State {
    currentSubforum: Subforum | undefined;
    currentThread: Thread | undefined;
    currentComment: Comment | undefined;
    isEditing: boolean;
}

const initialState: State = {
    currentSubforum: undefined,
    currentThread: undefined,
    currentComment: undefined,
    isEditing: false
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
        },
        setCurrentComment: (state, action: PayloadAction<Comment>) => {
            state.currentComment = action.payload;
        },
        setEditing: (state, action: PayloadAction<boolean>) => {
            state.isEditing = action.payload;
        }
    }
})

export const { setCurrentSubforum, setCurrentThread, setCurrentComment, setEditing } = forumSlice.actions;

export const forumState = (state: RootState) => state.forum;

export default forumSlice.reducer;