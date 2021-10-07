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
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

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
        },
        cardsInSet: {
            color: "#75BC3E"
        },
        noCardsInSet: {
            color: "grey"
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
                <h1  style={{color: '#4E3E61' ,fontFamily:"Emilys Candy"  }}>Discover Set</h1>
            <TableContainer component={Paper}>
                <Table size="small"  style={{background: '#4E3E61  ' }} >
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
                            <TableRow key={index} >
                                <TableCell style={{background: 'white ' , color: 'black'}}component="th" scope="row">{Set.cards.length > 0 ?<span className={classes.cardsInSet}><MoreVertRoundedIcon/></span> : <span className={classes.noCardsInSet}><MoreVertRoundedIcon/></span> }{Set.setName}</TableCell>
                                <TableCell style={{background: 'white ' , color: 'black'}}align="left">{Set.tags.map((tag,index, s) =>( <h6 key={index}>{tag.tagName} </h6>   ))}</TableCell>
                                <TableCell style={{background: 'white ' }}align="left">{Set.cards.length > 0 ?<span className={classes.cardsInSet}>{Set.cards.length}</span> : <span className={classes.noCardsInSet}>{Set.cards.length}</span> }</TableCell>
                                <TableCell style={{background: 'white ' , color: 'black'}}align="center"> <Button key={index} style={{background: '#4E3E61 ' , color: 'black'}} onClick={ () =>{handleSetState(Set)}} variant="contained">
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