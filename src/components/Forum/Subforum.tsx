import {render} from '@testing-library/react';
import {SubforumDTO} from './SubforumDTO';
import { Grid, Box, ButtonBase, Typography, useTheme, makeStyles } from '@material-ui/core';
import {Link} from 'react-router-dom';
import { useEffect } from 'react';

interface ISubforumRenderProps {
    subforums: SubforumDTO[] | undefined
    setSubforums: (nextSubforums: SubforumDTO[]) => void;
    currentSubject: SubforumDTO | undefined
    setCurrentSubject: (nextTopic: SubforumDTO | undefined) => void;
}

function SubforumRenderComponent(props: ISubforumRenderProps) {
    const theme = useTheme();

    const useStyles = makeStyles((theme) => ({
        button: {
            margin: '2rem',
            backgroundColor: 'lightskyblue',
            justifyContent: 'center',
            borderStyle: 'solid',
            borderColor: 'royalblue',
            borderRadius: '.7rem',
            textAlign: 'center',
            width: '20rem',
            padding: '1rem',
        },
    }))

    const classes = useStyles();

    return (
        <>
            {props.subforums?.map((subforum) => {
                return <Grid item>
                <Box className={classes.button} color="text.primary">
                    <ButtonBase onClick={() => {props.setCurrentSubject(subforum)}} component={Link} to={"/forum/" + subforum.subject}>
                        <Typography variant='h6'>{subforum.subject}</Typography>
                    </ButtonBase>
                </Box>
            </Grid>
            })}
        </>
    );
}

export default SubforumRenderComponent;