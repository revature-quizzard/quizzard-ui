import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
    total: number;
    answered: Array<number>;
    correct: Array<number>;
    incorrect: Array<number>;
    showResults: boolean;
}

const initialState: State = {
    total: 0,
    answered: [],
    correct: [],
    incorrect: [],
    showResults: false,
}

export const resultSlice = createSlice({
    name: "result",
    initialState,
    reducers: {
        setTotal: (state, action: PayloadAction<number>) => {
            state.total = action.payload;
        },
        addAnswered: (state, action: PayloadAction<number>) => {
            state.answered.push(action.payload);
        },
        addCorrect: (state, action: PayloadAction<number>) => {
            state.correct.push(action.payload);
        },
        addIncorrect: (state, action: PayloadAction<number>) => {
            state.incorrect.push(action.payload);
        },
        resetAll: (state) => {
            state.total = 0;
            state.answered = [];
            state.correct = [];
            state.incorrect = [];
        },
        showResults: (state) => {
            state.showResults = true;
        },
        hideResults: (state) => {
            state.showResults = false;
        }

    }
})

export const { setTotal, addAnswered, addCorrect, addIncorrect, resetAll, showResults, hideResults } = resultSlice.actions;

export const resultState = (state: RootState) => state.result;

export default resultSlice.reducer;