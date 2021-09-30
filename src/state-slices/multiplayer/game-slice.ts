import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";


interface Player {
    id: String
}

interface Set {

}

interface Card {

}

interface Game {
    id: String,
    name: String,
    match_state: number,
    question_index: number,
    capacity: number,
    set: Set,
    players: Player[]
}

interface State {
    game: Game
}

const initialState: State = {
    game: {
        id: '-1',
        name: '',
        match_state: 0,
        question_index: 0,
        capacity: 0,
        set: {},
        players: []
    }
};

// Create the actual slice
export const gameSlice = createSlice({
    // Name the slice
    name: 'game',

    // Pass in the initial state
    initialState,

    // Define the reducers/actions to be called by the dispatcher within the components
    reducers: {
        // Define action names here: pass in the state, define how the state is manipulated within the reducer
        
        // Used when establishing a new game
        setNewGame: (state, action: PayloadAction<Game>) => {
            state.game.id = action.payload.id;
            state.game.name = action.payload.name;
            state.game.capacity = action.payload.capacity;
            state.game.set = action.payload.set;
            state.game.players = action.payload.players;
        },

        // Used for changing to next state of game (question -> answer, etc)
        changeMatchState: (state, action) => {
            state.game.match_state = action.payload;
        },

        // Used for adding a new player
        addPlayer: (state, action: PayloadAction<Player>) => {
            state.game.players.push(action.payload);
        },

        // Used to remove a player
        removePlayer: (state, action: PayloadAction<Player>) => {
            state.game.players = state.game.players.filter(player => player.id != action.payload.id);
        }


    }
});

// Export the actions/reducers to be imported into a component and dispatched from component
export const {
    setNewGame,
    changeMatchState,
    addPlayer,
    removePlayer
} = gameSlice.actions;

// Export the state of the entire slice to be referenced in the components
export const gameState = (state: RootState) => state.game;

// Export the entire slice to be included in the configureStore inside of store.ts
export default gameSlice.reducer;