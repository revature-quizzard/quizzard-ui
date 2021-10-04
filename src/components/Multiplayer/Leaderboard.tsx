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
          backgroundColor: "#b15fc2",
          width: '18em',
          borderStyle: 'solid',
          borderColor: '#7636a3',
          display: 'flex'
        },
        table: {
            verticalAlign: 'middle',
            msAlignSelf: 'left'
        },
        text: {
            color: 'white'
        }
    }))

    const styles = useStyles();

    return (
        <>        
            <TableContainer className={styles.root} component={Paper}>
            <Table className={styles.table} aria-label="simple table"> {/*sx={{ maxWidth: 200 }}*/}
                <TableHead>
                <TableRow>
                    <TableCell className={styles.text} align="left">Username</TableCell>
                    <TableCell className={styles.text} align="right">Points&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {game.players.map((player) => (
                    <TableRow
                    key={player.username}      
                    >
                    <TableCell className={styles.text} align="left">{player.username}</TableCell>
                    <TableCell className={styles.text} align="right">{player.points}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default Leaderboard