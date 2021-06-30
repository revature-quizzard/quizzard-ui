import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
    errorMsg: string;
    showError: boolean;
}

const initialState: State = {
    errorMsg: "",
    showError: false,
}

export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        showErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMsg = action.payload;
            state.showError = true;
        },
        hideErrorMessage: (state) => {
            state.errorMsg = "";
            state.showError = false;
        }
    }
});

export const { showErrorMessage, hideErrorMessage } = errorSlice.actions;

export const errorState = (state: RootState) => state.error;

export default errorSlice.reducer;