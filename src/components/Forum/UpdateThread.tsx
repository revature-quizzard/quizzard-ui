import { useState } from 'react';
import { useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import { Paper } from '@mui/material';
import { Button, Box, FormControl, Input, Typography, makeStyles } from '@material-ui/core';
import { authState } from '../../state-slices/auth/auth-slice';
import { forumState } from '../../state-slices/forum/forum-slice';
import {Thread } from '../../models/thread';
import { updateThread } from '../../remote/thread-service';

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
    close: (input: boolean) => void;
}

function UpdateThread(props: IUpdateThreadProps) {
    const classes = useStyles();
    const [description, setDescription] = useState('');
    const [subject, setSubject] = useState('');
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);

    
    const handleSubjectChange = (e: any) => {
        setSubject(e.currentTarget.value);
    }

    let handleDescriptionChange = (e: any) => {
        console.log(e);
        setDescription(e);
    }

    let handleClick = async () => {
        props.close(false);
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
            let resp = await updateThread(toAdd);
        } catch (e: any) {
            console.log(e);
            // #TODO: set error message / toast here
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
                        placeholder={forumInfo.currentThread?.description} />
                </Paper>
                <br />
                <Box textAlign='center'>
                    <Button variant="contained" className={classes.button} onClick={handleClick}>Update Thread</Button>
                </Box>
        </div>
    )

}

export default UpdateThread;