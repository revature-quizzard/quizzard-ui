import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import {Subject} from "../../models/subject"
import UserProfile from "../../components/UserProfile/UserProfile";
import { UserData } from "../../models/user-data";
import { isLoading } from "../sets/create-study-sets-slice";
import { loading } from "../auth/auth-slice";
import { getUser } from "../../remote/user-service";

// Create an interface for the state object
interface State {
    userProfile: UserData | undefined;
    isLoading: boolean;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    userProfile: undefined,
    isLoading: false,
}
  /**
   * Creates a slice for current user with a reducer to set the user state for existing users.
   * @author 'Cody McDonald'
   */
export const profileSlice = createSlice({
    
    // Name the slice
    name: "profile",
    
    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {
        loading: (state) => {
            state.isLoading = true;
        },
        isLoaded: (state) => {
            state.isLoading = false;
        },

        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        setProfile: (state, action: PayloadAction<string>) => {
            loading();
            getUser(action.payload).then(resp => {
                console.log(resp);
                state.userProfile = resp;
            });
            // state.userProfile = action.payload;
        },
        clearProfile: (state) =>{
            state.userProfile = undefined;
        }
    }
})


// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { setProfile } = profileSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const profileState = (state: RootState) => state.profile;

// Export the entire slice to be included in the configureStore inside of store.ts
export default profileSlice.reducer;