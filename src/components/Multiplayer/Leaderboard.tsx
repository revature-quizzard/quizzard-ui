import { makeStyles, Paper, Table, TableContainer, TableRow } from "@material-ui/core"
import { TableBody, TableCell, TableHead, Typography } from "@mui/material";
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

    const useStyles = makeStyles(() => ({
        root: {
          width: '18em',
          borderStyle: 'solid',
          borderColor: '#4e3e61',
          display: 'flex'
        },
        table: {
            verticalAlign: 'middle',
            msAlignSelf: 'left'
        }
    }))

    const styles = useStyles();

    return (
        <>        
            <TableContainer className={styles.root} component={Paper}>
            <Table className={styles.table} aria-label="simple table"> {/*sx={{ maxWidth: 200 }}*/}
                <TableHead>
                <TableRow>
                    <TableCell align="left">Username</TableCell>
                    <TableCell align="right">Points&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {game.players.map((player, i) => (
                    <TableRow
                    key={player.username}      
                    >
                    <TableCell align="left">{player.username} {i == 0 ? <> &#x1F451; </> : <></>}</TableCell>
                    <TableCell align="right">{player.points}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default Leaderboard