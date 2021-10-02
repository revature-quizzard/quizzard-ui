import { Table, TableRow } from "@material-ui/core"
import { useSelector } from "react-redux"
import { gameState } from "../../state-slices/multiplayer/game-slice"

/*  
    The Leaderboard will need to be passed a presorted list of players, which
    contains usernames and points.
    The Leaderboard may potentially be passed additional information such as game 
    length, statistics, etc.
 */

/**
 *  The leaderboard component will display a ranked list of players from the game.
 * 
 *  @author Sean Dunn
 */
function Leaderboard() {
    const game = useSelector(gameState);

    return (
        <>
        <p>this is text.</p>
            <Table>
                {game.players.map((player) => {
                    return <TableRow>{player.username} | {player.points}</TableRow>
                })}
            </Table>
        </>
    )
}

export default Leaderboard