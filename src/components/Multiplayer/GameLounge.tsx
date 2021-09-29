import { useState, useEffect, useRef } from 'react';

/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle
 **/

function GameLounge() {

    return (
        <>
        <div className="App">
            <header className="App-header">
                Welcome to the looounnnge...
                <br></br>
                <br></br>
                <br></br>
            </header>
            
            </div>
        {/* // Game Settings Modal
        // <GameSettings />

        // // Button which loads game based on settings set in modal
        // <Button >Create Game</Button>

        // // Input for Game ID for existing game
        // <Input />

        // // Button which joins existing game according to input id
        // <Button >Join Game</Button> */}
        </>
    )
}

export default GameLounge