// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

/**
 * React component that renders the current players username and their points of an active game.
 * Props: gets the list of users and their points
 * 
 * @author Colby Wall
 */
function Players() {

    return (
        <>
        {/* <TableContainer component={Paper}>
            <Table sx={{ maxWidth: 200 }} aria-label="simple table">
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
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                    <TableCell component="th" scope="row">
                        {row.name}
                    </TableCell>
                    <TableCell align="right">{row.username}</TableCell>
                    <TableCell align="right">{row.points}</TableCell>
                    </TableRow>
                ))}
                </TableBody>
            </Table>
            </TableContainer> */}
        </>
    )
}

export default Players;