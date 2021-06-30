import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string;
  token: string;
  showLogin: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  username: "",
  token: "",
  showLogin: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loading: (state) => {
      state.isLoading = true;
    },
    isLoaded: (state) => {
      state.isLoading = false;
    },

    // this will have to be modified later once login and register compenents are pulled in to handle passing back a token and username
    loginUserReducer: (state, action: PayloadAction<any>) => {
      state.username = action.payload.username;
      state.token = action.payload.token;
      state.isAuthenticated = true;
    },
    logoutUserReducer: (state) => {
      state.username = "";
      state.token = "";
      state.isLoading = false;
      state.isAuthenticated = false;
      state.showLogin = false;
    },

    loginFormReducer: (state) => {
      state.showLogin = true;
    },

    registerFormReducer: (state) => {
      state.showLogin = false;
    }
  },
});

export const { loading, isLoaded, loginUserReducer, logoutUserReducer, loginFormReducer, registerFormReducer } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
