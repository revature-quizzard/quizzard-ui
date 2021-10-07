import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
  Button,
    useTheme,
} from "@mui/material";
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

import {makeStyles, Theme } from '@material-ui/core/styles'
import React, {useEffect, useState} from "react";
import {getAllSets} from "../../remote/set-service";
import {Set} from "../../dtos/Set";
import {StudySet} from "../../state-slices/sets/create-study-sets-slice";
import {useAppDispatch} from "../../store/hooks";
import {useHistory} from "react-router-dom";
import {useSelector} from "react-redux";
import {profileState} from "../../state-slices/user-profile/profile-slice";

/**
 * @Author Jose Tejada
 * @constructor
 */
function PublicSets() {

    let history = useHistory();
    let [set, setSet] = useState([] as Set[]);
    const dispatch = useAppDispatch();
    const username:string | undefined = useSelector(profileState)?.userProfile?.username;



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
                        <Table size="small" aria-label="a dense table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="left">Author</TableCell>
                                    <TableCell align="left">name</TableCell>
                                    <TableCell align="left"># of cards</TableCell>
                                    <TableCell align="center">View</TableCell>

                                </TableRow>
                            </TableHead>
                                <TableBody>
                                        {

                                                set.map((Set, index, n) => (
                                                    <TableRow key={index} sx={{'&:last-child td, &:last-child th': {border: 0}}}>

                                                                        {username === Set.author
                                                                            ?
                                                                            <></>
                                                                        :
                                                                            <>
                                                                              <TableCell style={{background: 'white ' , color: 'black'}}component="th" scope="row">{Set.cards.length > 0 ?<span className={classes.cardsInSet}><MoreVertRoundedIcon/></span> : <span className={classes.noCardsInSet}><MoreVertRoundedIcon/></span> }{Set.setName}</TableCell>
                                                                              <TableCell style={{background: 'white ' , color: 'black'}}align="left">{Set.tags.map((tag,index, s) =>( <h6 key={index}>{tag.tagName} </h6>   ))}</TableCell>
                                                                              <TableCell style={{background: 'white ' }}align="left">{Set.cards.length > 0 ?<span className={classes.cardsInSet}>{Set.cards.length}</span> : <span className={classes.noCardsInSet}>{Set.cards.length}</span> }</TableCell>
                                                                              <TableCell style={{background: 'white ' , color: 'black'}}align="center"> <Button key={index} style={{background: '#4E3E61 ' , color: 'black'}} onClick={ () =>{handleSetState(Set)}} variant="contained">
                                                                                    view
                                                                                </Button> </TableCell>

                                                                            </>
                                                                        }

                                                    </TableRow>
                                                ))

                                        }
                                </TableBody>
                        </Table>
                    </TableContainer>

            </div>
        </>
    )
}

export default PublicSets;