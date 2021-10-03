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
import {Box, Button, Card, CssBaseline, Popover, Skeleton, SwipeableDrawer} from "@mui/material";
import React, {useState} from "react";
import {makeStyles, Theme} from "@material-ui/core/styles";
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


/**
 *
 * @constructor
 */
function ViewSetPage() {

    const s: Set = useSelector(StudySetState).aSet;
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(event.currentTarget)
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const useStyles = makeStyles((theme:Theme) => ({


        divTable: {
            display:"flex",
            marginTop: 20,


        },
        paper: {


            backgroundColor: theme.palette.background.paper,
            boxShadow: theme.shadows[5],
            padding: theme.spacing(4, 3),
        },
        cardStyle: {

            width:"fit-content",
            marginLeft: 10,



            }
    }));
    const classes = useStyles();






    return(
        <>


        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Set Name</TableCell>
                        <TableCell align="center">Author</TableCell>
                        <TableCell align="center">Views</TableCell>
                        <TableCell align="center">Favorites</TableCell>
                        <TableCell align="center">Tags</TableCell>
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
                        <Typography sx={{ mb: 1.5, fontSize: 14, textAlign: "center" }} color="text.secondary">
                            {card.answer}
                        </Typography>
                    </CardContent>
                        {/*<Button size="small" onClick={handleClick} color="secondary">View Answer</Button>*/}
                        {/*<Popover*/}
                        {/*    id={card.id}*/}
                        {/*    open={open}*/}
                        {/*    anchorEl={anchorEl}*/}
                        {/*    onClose={handleClose}*/}
                        {/*    anchorOrigin={{*/}
                        {/*        vertical: 'bottom',*/}
                        {/*        horizontal: 'left',*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Typography sx={{ p: 2 }}>{card.answer}</Typography>*/}
                        {/*</Popover>*/}

                </Card>))}
            </div>


    </>
);

}


export default ViewSetPage;