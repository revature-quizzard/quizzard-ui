import { ClassNames } from '@emotion/react';
import{ Card, CardContent, Typography, makeStyles }from '@material-ui/core';
import { borderColor } from '@mui/system';
import { useSelector } from 'react-redux';
import { authState } from '../../state-slices/auth/auth-slice';
import { gameState } from '../../state-slices/multiplayer/game-slice';
import { guestState } from '../../state-slices/multiplayer/guest-slice';

/**
 * React component that renders a questions to the players
 * Props: the question, current index, the total number of cards
 * 
 * @author Colby Wall, Sean Dunn, Heather Guilfoyle
 */

 const useStyles = makeStyles({
    cardClass: {
        width: '100%',
        flexGrow: 1,
        borderColor: 'orange',
        borderLeftStyle: 'solid',
        backgroundColor: 'rgb(240,240,240)'
    },

    contentClass: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        height: '100%'
    },

    vAlign: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexGrow: 1
    },

    questionTypo: {
        alignSelf: 'center',
        verticalAlign: 'center',
    },

    pointsEarned: {
        color: 'rgb(6, 196, 44)',
        alignSelf: 'center',
        verticalAlign: 'center'
    },

    noPointsEarned: {
        color: 'rgb(196, 22, 10)',
        alignSelf: 'center',
        verticalAlign: 'center'
    },

    questNumTypo: {
    }
 });

 function Questions() {

    const classes = useStyles();
 
    const game = useSelector(gameState);
    const user = useSelector(authState);
    const guestUser = useSelector(guestState);
    console.log('Game in Questions component', game)

    let currentUser = user.authUser ? user.authUser.id : guestUser.id
    let currentPlayer = game.players.find((player) => player.id == currentUser);

    return (
        <>
            <Card className={classes.cardClass}>
                <CardContent className={classes.contentClass}>
                    <div className={classes.vAlign}>
                        <Typography variant="h5" gutterBottom className={classes.questionTypo}>
                            {game.set.cardList[game.questionIndex].question}
                        </Typography>

                        { 
                        game.matchState == 2 && currentPlayer.pointsEarned > 0 ?
                            <Typography variant="h5" className={classes.pointsEarned}>
                                + {currentPlayer.pointsEarned} points! 
                                &nbsp; <img height='50px' src='fast_meow_party.gif'/> &nbsp;
                                {currentPlayer.streak > 1 ? <> {currentPlayer.streak} &#x1F525; </>: <> </>}
                            </Typography> : game.matchState == 2 ?
                            <Typography variant="h5" className={classes.noPointsEarned}>
                                No points earned... &#x1F4A9;
                            </Typography> : <> </>
                        }

                    </div>
                    <Typography className={classes.questNumTypo}>  {/*sx={{ mb: 1.5 }}*/}
                        Question {game.questionIndex + 1} of {game.set.cardList.length}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
 }
 
export default Questions;
