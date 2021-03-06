import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import { Paper } from '@mui/material';
import { Button, Box, FormControl, Input, Typography, makeStyles } from '@material-ui/core';
import { authState } from '../../state-slices/auth/auth-slice';
import { forumState } from '../../state-slices/forum/forum-slice';
import {Thread } from '../../models/thread';
import { addThread } from '../../remote/thread-service';
import { Redirect } from 'react-router';
import { setErrorSeverity, showSnackbar } from '../../state-slices/error/errorSlice';

interface IAddThreadProps {
    close: (input: boolean) => void;
}

const useStyles = makeStyles({
    addThreadContainer: {
        justifyContent: "center",
        margin: 'auto',
        padding: 20,
        width: "50%",
        borderStyle: 'solid',
        borderColor: '#333333',
        backgroundColor: '#5E5E5E',
        color: '#FFFFFF',
    },
    input: {
        backgroundColor: '#FFFFFF'
    },
    button: {
        color: '#333333',
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
    }
});

function AddThread(props: IAddThreadProps) {
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [subject, setSubject] = useState('');
    const [disabled, setDisabled] = useState(false);
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);
    const dispatch = useDispatch();

    
    const handleSubjectChange = (e: any) => {
        setSubject(e.currentTarget.value);
    }

    let handleDescriptionChange = (e: any) => {
        console.log(e);
        setDescription(e);
    }

    let handleClick = async () => {
        setDisabled(true);
        try {
            let threadAncestors: string[] = [forumInfo.currentSubforum.id]
            let toAdd = new Thread(
                threadAncestors,
                forumInfo.currentSubforum.id,
                description,
                subject,
                auth.authUser.username
            );
            dispatch(setErrorSeverity('info'));
            dispatch(showSnackbar('Creating thread...'));
            let resp = await addThread(toAdd);
            dispatch(setErrorSeverity('success'));
            dispatch(showSnackbar('Thread created!'))
            setRedirect(true);
            setDisabled(false);
            setRedirect(false);
        } catch (e: any) {
            console.log(e);
            setDisabled(false);
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar('There was a problem creating your thread'));
        }
    }

    if (redirect) {
        return (
            <Redirect to='/forum' />
        )
    }

    return (
        <div id="add-thread-component" className={classes.addThreadContainer}>
            <Typography align="center" variant="h5">Create Thread</Typography>
            <br />
            <Typography>Thread Title</Typography>
            <FormControl style={{'margin': '1rem'}}>
                <Input id='subjectInput' className={classes.input}
                    onChange={handleSubjectChange}
                    placeholder="Enter the thread title"
                />
            </FormControl>

            <Typography>Enter Your Post</Typography>
            <Paper style={{'margin': '1rem'}}>
                <Editor id='descriptionInput'
                    onChange={handleDescriptionChange}
                    placeholder='Enter the first post here...' />
            </Paper>
            <br />
            <Box textAlign='center'>
                <Button id='createThreadButton' disabled={disabled} variant="contained" className={classes.button} onClick={handleClick}>Create Thread</Button>
            </Box>
        </div>
    )
}

export default AddThread;