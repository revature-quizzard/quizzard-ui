import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Create an interface for the state object
interface ScrambledQuestion {
  question: string;
  answers: Array<object>;
}

interface FlashCard {
  id: number;
  question: string;
  answer: string;
}

interface State {
  studySet: Array<FlashCard>;
  isLoading: boolean;
  flashCard: object;
  isLoaded: boolean;
  studySetName: string;
  showQuiz: boolean;
  quiz: Array<ScrambledQuestion>;
  count: number;
  isAnswered: boolean;
  
}

//Declare the initial state values that extends the State interface
const initialState: State = {
  studySet: [],
  isLoading: false,
  flashCard: {},
  isLoaded: false,
  studySetName: "",
  showQuiz: false,
  quiz: [],
  count: 0,
  isAnswered: false
  
};

// Create the actual slice using createSlice from the @reduxjs/toolkit dependency
export const createQuizSlice = createSlice({
  // Name the slice
  name: "createQuiz",

  // Pass in the initial state
  initialState,

  // Define the reducers/actions to be called by the dispatcher within the components
  reducers: {
    // Define action names here: pass in the state, define how the state is manipulated within the reducer
    isLoading: (state) => {
      state.isLoading = true;
      state.isLoaded = false;
    },
    isLoaded: (state) => {
      state.isLoading = false;
      state.isLoaded = true;
    },
    showQuiz: (state) => {
      state.showQuiz = true;
    },
    hideQuiz: (state) => {
      state.showQuiz = false;
    },
      loadQuiz: (state, action: PayloadAction<Array<ScrambledQuestion>>) => {
      state.quiz = action.payload;
    },
    clearQuiz: (state) => {
      state.quiz = [];
      state.count = 0;
    },
    nextCard: (state) => {
      state.count += 1;
    },
    prevCard: (state) => {
      state.count -= 1;
    },
    takeAnotherQuizCreate: (state) => {
      state.quiz = [];
      state.count = 0;
      state.showQuiz = false;
    }
  }
});

// Export the actions/reducers to be imported into a component and dispatched from componenent
export const {
  isLoading,
  isLoaded,
  showQuiz,
  hideQuiz,
  loadQuiz,
  nextCard,
  prevCard,
  clearQuiz,
  takeAnotherQuizCreate
} = createQuizSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const createQuizState = (state: RootState) => state.createQuiz;

// Export the entire slice to be included in the configureStore inside of store.ts
export default createQuizSlice.reducer;

