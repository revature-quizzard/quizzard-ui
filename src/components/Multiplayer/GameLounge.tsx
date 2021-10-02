import GameSettings from './GameSettings';


/** This React component is a splash screen/landing page for the multiplayer quiz game.
 * 
 *  If no game is currently defined, a lobby will be rendered which allows users to 
 *      define game settings and create a new game or join an existing game by ID.
 * 
 *  @author Sean Dunn, Colby Wall, Heather Guilfoyle
 **/

export default function GameLounge() {

    

    return (
        <>
            <div className="App">
                <header className="App-header">
                    Welcome to the looounnnge...
                    <br></br>
                    <br></br>
                    <br></br>
                </header>
                <GameSettings />
            </div>
        </>
    )
}