
/*  
    The Leaderboard will need to be passed a presorted list of players, which
    contains usernames and points.
    The Leaderboard may potentially be passed additional information such as game 
    length, statistics, etc.
 */
interface ILeaderboardProps {
    // players: Player[]
}

/**
 *  The leaderboard component will display a ranked list of players from the game.
 * 
 *  @author Sean Dunn
 */
function Leaderboard(props: ILeaderboardProps) {

    return (
        <>
            {/* <Table>
                props.players.map(player.name | player.points)
            </Table> */}
        </>
    )
}

export default Leaderboard