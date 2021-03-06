import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
import { UserData } from "../../models/user-data";


// Create an interface for the state object
interface State {
    userProfile: UserData | undefined;
    selectedImage: File | undefined;
    isLoaded: boolean;
}

//Declare the initial state values that extends the State interface
const initialState: State = {
    userProfile: undefined,
    selectedImage: undefined,
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
            state.isLoaded = false;
        },
        deleteSetReducer: (state, action: PayloadAction<string>) =>{
            let sets = state.userProfile.createdSets;
            let removeIndex = sets.findIndex( set => set.id === action.payload);
            sets.splice( removeIndex, 1 );
            state.userProfile.createdSets = sets;
        },
        updateSetReducer: (state, action: PayloadAction<string>) =>{
            let sets = state.userProfile.createdSets;
            let removeIndex = sets.findIndex( set => set.id === action.payload);
            sets.splice( removeIndex, 1 );
            state.userProfile.createdSets = sets;
        },
        deleteFavoriteReducer: (state, action: PayloadAction<string>) =>{
            let sets = state.userProfile.favoriteSets;
            let removeIndex = sets.findIndex( set => set.id === action.payload);
            sets.splice( removeIndex, 1 );
            state.userProfile.favoriteSets = sets;
        },
        updateSelectedImage: (state, action: PayloadAction<File>) =>{
            state.selectedImage = action.payload;
        },
        updateImageReducer: (state, action: PayloadAction<string>) =>{
            state.userProfile.profilePicture = action.payload;
        }
    }
})


// Export the actions/reducers to be imported into a component and dispatched from componenent
export const { setProfile, loading, isLoaded, clearProfile, deleteFavoriteReducer, deleteSetReducer, updateSetReducer, updateImageReducer, updateSelectedImage } = profileSlice.actions;


// Export the state of the entire slice to be referenced in the components
export const profileState = (state: RootState) => state.profile;

// Export the entire slice to be included in the configureStore inside of store.ts
export default profileSlice.reducer;