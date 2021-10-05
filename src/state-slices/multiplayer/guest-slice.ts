import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

/**
 * Slice of state for setting guests in the multiplayer game.
 * @author Heather Guilfoyle
 */
interface State {
    id: string,
    nickname: string
    answered: false,
    answeredAt: string,
    answeredCorrectly: boolean,
    placing: number,
    streak: number,
    points: number
}

const initialState: State = {
    id: '',
    nickname: '',
    answered: false,
    answeredAt: new Date().toISOString(),
    answeredCorrectly: false,
    placing: -1,
    streak: 0,
    points: 0
}
export const guestSlice = createSlice({
    name: 'guest',

    initialState,

    reducers: {
        setGuest: (state,action) => {
            state.id = Math.random().toString(36).substr(2, 10);
            state.nickname = action.payload.nickname;
            state.answered = action.payload.answered;
            state.answeredAt = action.payload.answeredAt;
            state.answeredCorrectly = action.payload.answeredCorrectly;
            state.placing = action.payload.placing;
            state.streak = action.payload.streak;
            state.points = action.payload.points;
        }
    }
})

export const {
    setGuest
} = guestSlice.actions;

export const guestState = (state: RootState) => state.guest;

export default guestSlice.reducer;