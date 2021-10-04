import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
    
}
const initialState: State = {
    id: ''
}
export const guestSlice = createSlice({
    name: 'guest',

    initialState,

    reducers: {

    }
})

export const guestState = (state: RootState) => state.game;

export default guestSlice.reducer;