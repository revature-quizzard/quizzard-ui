import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { AlertColor } from '@mui/material';

interface State {
    errorMsg: string;
    showError: boolean;
    errorSeverity: AlertColor;
}

const initialState: State = {
    errorMsg: "",
    showError: false,
    errorSeverity: 'info'
}

class errorInput {
    message: string;
    severity: AlertColor;
}

/**
 * Slice of state for errors. note: DO NOT USE showErrorMessage, it will be deprecated within the week
 * @author 'Luna Haines'
 */
export const errorSlice = createSlice({
    name: "error",
    initialState,
    reducers: {
        // BEING DEPRECATED SOON! DO NOT USE!
        showErrorMessage: (state, action: PayloadAction<string>) => {
            state.errorMsg = action.payload; 
            state.showError = true;
        },
        showSnackbar: (state, action: PayloadAction<errorInput>) => {
            state.errorMsg = action.payload.message;
            state.errorSeverity = action.payload.severity;
            state.showError = true;
        },
        hideErrorMessage: (state) => {
            state.errorMsg = "";
            state.showError = false;
            state.errorSeverity = 'info';
        }
    }
});

export const { showErrorMessage, showSnackbar, hideErrorMessage } = errorSlice.actions;

export const errorState = (state: RootState) => state.error;

export default errorSlice.reducer;