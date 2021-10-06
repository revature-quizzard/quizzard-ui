import React, {useState} from "react";

import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {Set} from "../../dtos/Set";
import {StudySetState} from "../../state-slices/sets/create-study-sets-slice";
import {makeStyles, Theme} from "@material-ui/core/styles";
import {Button, Card} from "@mui/material";
import BackspaceIcon from "@mui/icons-material/Backspace";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableBody from "@mui/material/TableBody";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import {deleteCard} from "../../remote/set-service";


function ViewUserCards(){

    const history = useHistory();
    const s: Set = useSelector(StudySetState).aSet;
    const [value,setValue] = useState();


    // const state = useSelector(profileState);
    // const favorites = state.userProfile.favoriteSets;


    const useStyles = makeStyles((theme:Theme) => ({
        tableContainer:{
            borderStyle: "ridge",
            borderColor:"#4e3e61"
        },
        Thread:{
            backgroundColor:"#4e3e61",
            threadColor: "whitesmoke"
        },
        cell:{

        },
        button:{
            textAlign:"center"

        },
        divTable: {
            display:"flex",
            flexDirection:"row",
            flexWrap:"wrap",
            marginTop: 20,

        },
        paper: {
            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 3),
            borderStyle: "ridge",

        },
        cardStyle: {
            width:"fit-content",
            marginLeft: 10,
            borderStyle: "groove",
            textAlign:"center",
            marginBottom: 10,

        }
    }));
    const classes = useStyles();

    function toSetPage(){
        history.push('/profile/')
    }

    const deleteSet = async function (sId:string,cId:string ){
        try{
            let resp = await deleteCard(sId, cId);
        }catch (e:any){
            console.log(e.message)
        }

    }

    const refresh = ()=>{
        // it re-renders the component
        // @ts-ignore
        setValue({});
    }

    function deleteCardFrom(sId:string,cId:string ){
        let d = deleteSet(sId, cId);
        refresh()

    }




    return(
        <>


            <Button startIcon={<BackspaceIcon />} onClick={toSetPage} color="secondary" >
                Go back to Sets
            </Button>
            <TableContainer component={Paper} className={classes.tableContainer}>
                <Table sx={{minWidth: 700}} aria-label="customized table">
                    <TableHead className={classes.Thread}>
                        <TableRow style={{background: "#4E3E61" , color: 'white '}}>
                            <TableCell style={{color: 'white '}} align="center" >Set Name</TableCell>
                            <TableCell style={{color: 'white '}} align="center">Author</TableCell>
                            <TableCell style={{color: 'white '}} align="center">Views</TableCell>
                            <TableCell style={{color: 'white '}} align="center">Favorites</TableCell>
                            <TableCell style={{color: 'white '}} align="center">Tags</TableCell>
                            <TableCell style={{color: 'white '}} align="center">Set Id</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>

                            <TableCell align="center">{s.setName}</TableCell>
                            <TableCell align="center">{s.author}</TableCell>
                            <TableCell align="center">{s.views}</TableCell>
                            <TableCell align="center">{s.favorites}</TableCell>
                            <TableCell align="center">{s.tags.map((tag, index, s) => (
                                <h6 key={index}>{tag.tagName}</h6>))}</TableCell>
                            <TableCell align="center">{s.id}</TableCell>
                        </TableRow>

                    </TableBody>
                </Table>
            </TableContainer>

            <div className={classes.divTable}>
                {s.cards.map((card,index, c)=>(
                    <Card key={card.id} sx={{ minWidth: 25 }} className={classes.cardStyle}>
                        <CardContent>
                            <Typography sx={{ fontSize: 14, textAlign: "center" }} color="text.secondary" gutterBottom>
                                Card ID: {card.id}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Question: {card.question}
                            </Typography>
                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                Answer: {card.answer}
                            </Typography>

                        </CardContent>

                        <Button onClick={ () => deleteCardFrom(s.id,card.id)}>Delete</Button>

                    </Card>
                ))}

            </div>
        </>
    );

}

export default ViewUserCards;