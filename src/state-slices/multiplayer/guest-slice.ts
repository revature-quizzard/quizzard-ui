import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

/**
 * Slice of state for setting guests in the multiplayer game.
 * @author Heather Guilfoyle
 */
interface State {
    id: string,
    nickname: string
}

const initialState: State = {
    id: '',
    nickname: '',
}
export const guestSlice = createSlice({
    name: 'guest',

    initialState,

    reducers: {
        setGuest: (state,action) => {
            state.id = Math.random().toString(36).substr(2, 5);
            state.nickname = action.payload.nickname;
        }
    }
})

export const {
    setGuest
} = guestSlice.actions;

export const guestState = (state: RootState) => state.guest;

export default guestSlice.reducer;