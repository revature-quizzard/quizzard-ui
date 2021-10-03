// import {DataGrid} from "@material-ui/data-grid";
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    AppBar, Button,
    CssBaseline,
    Divider,
    Drawer,
    IconButton,
    List,
    ListItem,
    ListItemIcon,
    useTheme,
} from "@mui/material";
import {makeStyles, Theme } from '@material-ui/core/styles'
import React, {useEffect, useState} from "react";
import {getAllSets} from "../../remote/set-service";
import {Set} from "../../dtos/Set";
import {Tag} from "../../dtos/Tag";
import {useDispatch, useSelector} from "react-redux";
import {StudySet, StudySetState} from "../../state-slices/sets/create-study-sets-slice";
import {useAppDispatch} from "../../store/hooks";
import {useHistory} from "react-router-dom";

/**
 * @Author Jose Tejada
 * @constructor
 */
function PublicSets() {

    let history = useHistory();
    let [set, setSet] = useState([] as Set[]);
    const dispatch = useAppDispatch();



    const useStyles = makeStyles((theme:Theme) => ({
        divTable: {
            textAlign: 'center',
            width: '70%',
            marginLeft: 200,
        },
        paper: {


            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        }
    }));

    const classes = useStyles();
    const theme = useTheme();


    async function getSets() {
        console.log("FETCHING TRIVIA CARD SETS")
        try{
            let sets = await getAllSets();
            setSet(sets)
            console.log(sets)


        }catch (e:any){
            console.log(e.message);
        }


    }

    useEffect(() => {
       getSets()

    }, []);


    function handleSetState(s:Set){
        dispatch(StudySet(s))
        history.push("/sets")
    }


    return(
        <>


            <div>
                <h1>inside the public set component</h1>
            <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell align="left">Tags</TableCell>
                            <TableCell align="left"># of cards</TableCell>
                            <TableCell align="center">View</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {set.map((Set, index, n) => (
                            <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">{Set.setName}</TableCell>
                                <TableCell align="left">{Set.tags.map((tag,index, s) =>( <h6 key={index}>{tag.tagName} </h6>   ))}</TableCell>
                                <TableCell align="left">{Set.cards.length}</TableCell>
                                <TableCell align="center"> <Button key={index} onClick={ () =>{handleSetState(Set)}} variant="outlined">
                                    view
                                </Button> </TableCell>


                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
        </>
    )
}

export default PublicSets;