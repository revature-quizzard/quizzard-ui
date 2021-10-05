import { ClassNames } from '@emotion/react';
import{ Card, CardContent, Typography, makeStyles }from '@material-ui/core';
import { borderColor } from '@mui/system';
import { useSelector } from 'react-redux';
import { gameState } from '../../state-slices/multiplayer/game-slice';

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
        borderColor: 'orange'
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
        verticalAlign: 'center'
    },

    questNumTypo: {

    }
 });

 function Questions() {

    const classes = useStyles();
 
    const game = useSelector(gameState);
    console.log('Game in Questions component', game)

    return (
        <>
            <Card className={classes.cardClass}>
                <CardContent className={classes.contentClass}>
                    <div className={classes.vAlign}>
                    <Typography variant="h5" gutterBottom className={classes.questionTypo}>
                        {game.set.cardList[game.questionIndex].question}
                    </Typography>
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
