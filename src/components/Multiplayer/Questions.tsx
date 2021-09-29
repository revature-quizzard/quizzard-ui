import{ Card, CardContent, Typography }from '@material-ui/core';

/**
 * React component that renders a questions to the players
 * Props: the question, current index, the total number of cards
 * 
 * @author Colby Wall, Sean Dunn, Heather Guilfoyle
 */

interface IQuestionProps {
    question: string,
    index: number,
    total: number
}

 function Questions(props: IQuestionProps) {
 
    return (
        <>
            <Card>
                <CardContent>
                    <Typography variant="h5" gutterBottom>
                     {props.question}
                    </Typography>
 
                    <Typography >  {/*sx={{ mb: 1.5 }}*/}
                    Question {props.index} of {props.total}
                    </Typography>
                </CardContent>
            </Card>
        </>
    );
 }
 
export default Questions
