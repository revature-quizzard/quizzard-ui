import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@material-ui/core';

/**
 * React component that renders the current players username and their points of an active game.
 * Props: gets the list of users and their points
 * 
 * @author Colby Wall, Sean Dunn, John Callahan
 */

 function createData(username: string, points: number) {
    return { username, points };
  }
  
  const rows = [
    createData('Yozur', 159),
    createData('John', 237),
    createData('Tommy', 262),
    createData('Cupcake', 305),
    createData('Sam', 134),
  ];

function Players() {

    return (
        <>
        <TableContainer component={Paper}>
            <Table aria-label="simple table"> {/*sx={{ maxWidth: 200 }}*/}
                <TableHead>
                <TableRow>
                    <TableCell>Players</TableCell>
                    <TableCell align="right">Username</TableCell>
                    <TableCell align="right">Points&nbsp;</TableCell>
                </TableRow>
                </TableHead>
                <TableBody>
                {rows.map((row) => (
                    <TableRow
                    key={row.username}      
                    >
                    <TableCell component="th" scope="row">
                        {row.username}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> 
        </>
    )
}

export default Players;