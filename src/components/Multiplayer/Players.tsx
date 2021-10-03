import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, useTheme } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

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
        width: '18%',
        borderStyle: 'solid',
        borderColor: '#7636a3'
      },
      table: {
          verticalAlign: 'middle',
          msAlignSelf: 'left'
      },
      text: {
          color: 'white'
      }
  }))  
  
  const rows = [
    createData('Yozur', 159),
    createData('John', 237),
    createData('Tommy', 262),
    createData('Cupcake', 305),
    createData('Sam', 134),
  ];

function Players() {

    const styles = useStyles();

    return (
        <>
        <TableContainer className={styles.root} component={Paper}>
            <Table className={styles.table} aria-label="simple table"> {/*sx={{ maxWidth: 200 }}*/}
                <TableHead>
                <TableRow>
                    <TableCell className={styles.text}>Players</TableCell>
                    <TableCell className={styles.text} align="right">Username</TableCell>
                    <TableCell className={styles.text} align="right">Points&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.username}      
                    >
                    <TableCell className={styles.text} component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell className={styles.text} align="right">{row.username}</TableCell>
                    <TableCell className={styles.text} align="right">{row.points}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default Players;