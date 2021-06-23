import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface State {
  isAuthenticated: boolean;
  isLoading: boolean;
  username: string;
  token: string;
}

const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  username: "",
  token: "",
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
    loginUser: (state, action: PayloadAction<string>) => {
      state.username = action.payload;
      state.token = action.payload;
      state.isAuthenticated = true;
    },
    logoutUser: (state) => {
      state.username = "";
      state.token = "";
      state.isLoading = false;
      state.isAuthenticated = false;
    },
  },
});

export const { loading, isLoaded, loginUser, logoutUser } = authSlice.actions;

export const authState = (state: RootState) => state.auth;

export default authSlice.reducer;
