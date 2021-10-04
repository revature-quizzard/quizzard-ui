import API from '@aws-amplify/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { deleteGame, updateGame } from '../../graphql/mutations';
import { authState } from '../../state-slices/auth/auth-slice';
import { gameState, Player } from '../../state-slices/multiplayer/game-slice';

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
      },
      button: {
          color: 'red'
      }
  }))
  
function Players() {

    const styles = useStyles();
    const game = useSelector(gameState);
    const user = useSelector(authState);

    const executeKick = async (user: Player) => {
        let copylist: Player[] = [].concat(game.players);
        let index = copylist.findIndex((player) => player.id == user.id);
        copylist.splice(index, 1);
        (API.graphql(graphqlOperation(updateGame, {input: {id: game.id, players: copylist}})));
    }

    return (
        <>
        <TableContainer className={styles.root} component={Paper}>
            <Table className={styles.table} aria-label="simple table"> {/*sx={{ maxWidth: 200 }}*/}
                <TableHead>
                <TableRow>
                    {user.authUser.username == game.host
                    ?
                    <>
                        <TableCell className={styles.text} align="left">Username</TableCell>
                        <TableCell className={styles.text} align="right">Points&nbsp;</TableCell>
                        <TableCell className={styles.text} align="right">Kick Players</TableCell>
                    </>
                    :
                    <>
                        <TableCell className={styles.text} align="left">Username</TableCell>
                        <TableCell className={styles.text} align="right">Points&nbsp;</TableCell>
                    </>
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {user.authUser.username == game.host
                ?
                game.players.map((player) => (
                    <TableRow
                    key={player.username}      
                    >
                    <TableCell className={styles.text} align="left">{player.username}</TableCell>
                    <TableCell className={styles.text} align="right">{player.points}</TableCell>
                    <TableCell className={styles.button} align="right"><Button onClick={() => executeKick(player)}>Kick</Button></TableCell>
                    </TableRow>
                ))
                :
                game.players.map((player) => (
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