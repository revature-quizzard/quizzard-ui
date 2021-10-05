import API from '@aws-amplify/api';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { graphqlOperation } from 'aws-amplify';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { deleteGame, updateGame } from '../../graphql/mutations';
import { authState } from '../../state-slices/auth/auth-slice';
import { gameState, Player } from '../../state-slices/multiplayer/game-slice';
import { guestState } from '../../state-slices/multiplayer/guest-slice';

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
        width: '21em',
        borderStyle: 'solid',
        borderColor: '#4e3e61',
        display: 'flex'
      },
      table: {
          verticalAlign: 'middle',
          msAlignSelf: 'left'
      },
      button: {
          color: 'red'
      }
  }))
  
function Players() {

    const styles = useStyles();
    const game = useSelector(gameState);
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    const history = useHistory();

    let currentUser = user.authUser ? user.authUser.username : guestUser ? guestUser.nickname : undefined;

    if (!currentUser) history.push('/lounge')

    /**
     *  The host of a game can remove players from the game.
     * 
     *  This logic is run when the 'Kick Player' button is clicked next
     *  to a player's name. The given id will be removed from the game data and 
     *  the player list will be updated accordingly.
     * 
     * @param user - player to be kicked from game
     */
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
                    {currentUser == game.host
                    ?
                    <>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="right">Points&nbsp;</TableCell>
                        <TableCell align="right">Kick Players</TableCell>
                    </>
                    :
                    <>
                        <TableCell align="left">Username</TableCell>
                        <TableCell align="right">Points&nbsp;</TableCell>
                    </>
                    }
                </TableRow>
                </TableHead>
                <TableBody>
                {currentUser == game.host
                ?
                game.players.map((player) => (
                    <TableRow
                    key={player.username}      
                    >
                    {(user.authUser.username == player.username)
                        ?
                        <>
                        <TableCell align="left">{player.username}</TableCell>
                        <TableCell align="right">{player.points}</TableCell>
                        <TableCell className={styles.button} align="right"><Button onClick={() => (API.graphql(graphqlOperation(deleteGame, {input: {id: game.id}}))) }>Close Game</Button></TableCell>
                        </>
                        :
                        <>
                        <TableCell align="left">{player.username}</TableCell>
                        <TableCell align="right">{player.points}</TableCell>
                        <TableCell className={styles.button} align="right"><Button onClick={() => executeKick(player)}>Kick</Button></TableCell>
                        </>}
                    </TableRow>
                ))
                :
                game.players.map((player) => (
                    <TableRow
                    key={player.username}      
                    >
                        {(user.authUser.username == player.username)
                        ?
                        <>
                        <TableCell align="left">{player.username}</TableCell>
                        <TableCell align="right">{player.points}</TableCell>
                        <TableCell className={styles.button} align="right"><Button onClick={() => executeKick(player)}>Leave Game</Button></TableCell>
                        </>
                        :
                        <>
                        <TableCell align="left">{player.username}</TableCell>
                        <TableCell align="right">{player.points}</TableCell>
                        </>}                    
                    </TableRow>                
                    ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default Players;