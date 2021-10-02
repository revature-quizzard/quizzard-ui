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

function UpdateThread() {
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
        try {
            let threadAncestors: string[] = ["114687543"];
            let toAdd = new Thread(
                threadAncestors,
                "114687543",
                description,
                subject,
                "cmettee",
                "310f67a1-822c-4fab-9b7f-8313686f7fb2",
                1,
                "2021-10-01T21:59:02.879",
                ["tag1id", "tag2id"]
            );
            console.log(toAdd);
            let resp = await updateThread(toAdd);
        } catch (e: any) {
            console.log(e);
            // #TODO: set error message / toast here
        }
    }

    return (
        <div id="add-thread-component" className={classes.addThreadContainer}>
                <Typography align="center" variant="h5">Update Thread</Typography>
                <br />
                <Typography>Update Thread Title</Typography>
                <FormControl style={{'margin': '1rem'}}>
                    <Input className={classes.input}
                        onChange={handleSubjectChange}
                        placeholder={forumInfo?.currentThread?.subject}
                    />
                </FormControl>

                <Typography>Update Your Post</Typography>
                <Paper style={{'margin': '1rem'}}>
                    <Editor
                        onChange={handleDescriptionChange}
                        placeholder={forumInfo?.currentThread?.description} />
                </Paper>
                <br />
                <Box textAlign='center'>
                    <Button variant="contained" className={classes.button} onClick={handleClick}>Create Thread</Button>
                </Box>
        </div>
    )

}

export default UpdateThread;