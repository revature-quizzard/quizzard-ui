import{ Card, CardContent, Typography }from '@material-ui/core';
import { useSelector } from 'react-redux';
import { gameState } from '../../state-slices/multiplayer/game-slice';

/**
 * React component that renders a questions to the players
 * Props: the question, current index, the total number of cards
 * 
 * @author Colby Wall, Sean Dunn, Heather Guilfoyle
 */

 function Questions() {
 
    const game = useSelector(gameState);
    console.log('Game in Questions component', game)

    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                     {game.set.cardList[game.questionIndex].question}
                    </Typography>
 
                    <Typography >  {/*sx={{ mb: 1.5 }}*/}
                    Question {game.questionIndex + 1} of {game.set.cardList.length}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
 }
 
export default Questions;
