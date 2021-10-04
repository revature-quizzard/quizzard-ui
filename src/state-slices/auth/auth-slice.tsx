import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../models/user";
import { RootState } from "../../store/store";

interface State {
  username: string;
  isAuthenticated: boolean;
  isLoading: boolean;
  authUser : User | undefined;
  showLogin: boolean;
}

const initialState: State = {
  isAuthenticated: false,
  isLoading: false,
  authUser: undefined,
  showLogin: false,
  username: ""
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
    loginUserReducer: (state, response: any) => {
      let id = response.payload.attributes.sub;
      let username = response.payload.username;
      let name = response.payload.attributes.name;
      let email = response.payload.attributes.email;
      let token = response.payload.signInUserSession.idToken.jwtToken;

      state.authUser = new User(id, username, name, email, token);
      state.isAuthenticated = true;
    },
    
    logoutUserReducer: (state) => {
      state.authUser = undefined;
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
