import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UserData } from "../../models/user-data";


// Create an interface for the state object
interface State {
    userProfile: UserData | undefined;
    isLoaded: boolean;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    userProfile: undefined,
    isLoaded: false,
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
            state.isLoaded = false;
        },
        isLoaded: (state) => {
            state.isLoaded = true;
        },
        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        setProfile: (state, action: PayloadAction<UserData>) => {
            state.userProfile = action.payload;
        },
        clearProfile: (state) =>{
            state.userProfile = undefined;
        },
        deleteFavorite: (state, action: PayloadAction<string>) =>{
            let sets = state.userProfile.favoriteSets;

        }
    }
})


// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { setProfile, loading, isLoaded, clearProfile } = profileSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const profileState = (state: RootState) => state.profile;

// Export the entire slice to be included in the configureStore inside of store.ts
export default profileSlice.reducer;