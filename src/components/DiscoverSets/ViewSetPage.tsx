import {useSelector} from "react-redux";
import {StudySetState} from "../../state-slices/sets/create-study-sets-slice";
import { Set } from "../../dtos/Set"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {
    Box,
    Button,
    Card,
    Modal,
}
from "@mui/material";
import React, {useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import AddBoxIcon from '@mui/icons-material/AddBox';
import BackspaceIcon from '@mui/icons-material/Backspace';
import {User} from "../../models/user";
import {authState} from "../../state-slices/auth/auth-slice";
import {addSetToFavorites} from "../../remote/user-service";
import {useHistory} from "react-router-dom";
import {profileState} from "../../state-slices/user-profile/profile-slice";



/**
 *@author Jose Tejada
 * @constructor
 */



function ViewSetPage() {
    const [open, setOpen] = React.useState(false);
    const [answer, setAnswer] = React.useState(false);
    const user: User = useSelector(authState).authUser;
    const history = useHistory();

    // const state = useSelector(profileState);
    // const favorites = state.userProfile.favoriteSets;


    function handleOpen(a:any){
        setAnswer(a)
        setOpen(true)
        }
    const handleClose = () => setOpen(false);

    const s: Set = useSelector(StudySetState).aSet;


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
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
    };

    async function addTofavoriets(){



        let setId={
            id:s.id
        }

        try{
            await addSetToFavorites(setId, user.id)

        }catch (e:any){
            console.log(e.message)
        }
    }
    function toSetPage(){
        history.push('/study/')
    }



    return(
        <>
            {user
                ?
                <Button  onClick={addTofavoriets} startIcon={<AddBoxIcon />} color="success">
                    Add Set to favorites
                </Button>

                :
                ''
            }

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
                            {card.id}
                        </Typography>
                        <Typography sx={{ mb: 1.5 }} color="text.secondary">
                            {card.question}
                        </Typography>
                    </CardContent>

                        <Button onClick={ () => handleOpen(card.answer)}>View Answer</Button>

                </Card>
                ))}
                <div>
                    <Modal
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="modal-modal-title"
                        aria-describedby="modal-modal-description"
                    >
                        <Box sx={style}>
                            <Typography id="modal-modal-title" variant="h6" component="h2">
                                The answer
                            </Typography>
                            <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                {answer}
                            </Typography>
                        </Box>
                    </Modal>
                </div>

            </div>
    </>
);

}


export default ViewSetPage;