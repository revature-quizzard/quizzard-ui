import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import { Paper } from '@mui/material';
import { Button, Box, FormControl, Input, Typography, makeStyles } from '@material-ui/core';
import { authState } from '../../state-slices/auth/auth-slice';
import { forumState } from '../../state-slices/forum/forum-slice';
import {Thread } from '../../models/thread';
import { updateThread } from '../../remote/thread-service';
import { Redirect } from 'react-router';
import { setErrorSeverity, showSnackbar } from '../../state-slices/error/errorSlice';

const useStyles = makeStyles({
    updateThreadContainer: {
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

interface IUpdateThreadProps {
    dummySwitch: boolean,
    setDummySwitch: (nextDummySwitchVal: boolean) => void,
    close: (input: boolean) => void;
}

function UpdateThread(props: IUpdateThreadProps) {
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const [disabled, setDisabled] = useState(false);
    const auth = useSelector(authState);
    const dispatch = useDispatch();
    const forumInfo = useSelector(forumState);

    
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
            let threadAncestors: string[] = ["114687543"];
            let toAdd = new Thread(
                forumInfo.currentThread.ancestors,
                forumInfo.currentThread.parent,
                description,
                subject,
                forumInfo.currentThread.owner,
                forumInfo.currentThread.id,
                forumInfo.currentThread.child_count,
                forumInfo.currentThread.date_created,
                forumInfo.currentThread.tags
            );
            console.log(toAdd);
            dispatch(setErrorSeverity('info'));
            dispatch(showSnackbar('Updating your thread...'))
            let resp = await updateThread(toAdd);
            dispatch(setErrorSeverity('success'));
            dispatch(showSnackbar('Thread updated!'))
            setDisabled(false);
            props.setDummySwitch(!props.dummySwitch);
            props.close(false);
        } catch (e: any) {
            setDisabled(false);
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar('There was a problem updating your thread'))
        }
    }

    return (
        <div id="update-thread-component" className={classes.updateThreadContainer}>
                <Typography align="center" variant="h5">Update Thread</Typography>
                <br />
                <Typography>Update Thread Title</Typography>
                <FormControl style={{'margin': '1rem'}}>
                    <Input className={classes.input}
                        onChange={handleSubjectChange}
                        placeholder={forumInfo.currentThread?.subject}
                    />
                </FormControl>

                <Typography>Update Your Post</Typography>
                <Paper style={{'margin': '1rem'}}>
                    <Editor
                        onChange={handleDescriptionChange}
                        placeholder='Write your new description...' />
                </Paper>
                <br />
                <Box textAlign='center'>
                    <Button id='updateThreadButton' variant="contained" disabled={disabled} className={classes.button} onClick={handleClick}>Update Thread</Button>
                </Box>
        </div>
    )

}

export default UpdateThread;