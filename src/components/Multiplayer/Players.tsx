import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { gameState } from '../../state-slices/multiplayer/game-slice';

/**
 * React component that renders the current players username and their points of an active game.
 * Props: gets the list of users and their points
 * 
 * @author Colby Wall, Sean Dunn, John Callahan
 */

  function createData(username: string, points: number) {
    return { username, points };
  }

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
  
function Players() {

    const styles = useStyles();
    const game = useSelector(gameState);

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

export default Players;