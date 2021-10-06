import { useState } from 'react';
import { authState } from '../../state-slices/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { forumState } from '../../state-slices/forum/forum-slice';
import { addComment } from '../../remote/comment-service';
import { showSnackbar, setErrorSeverity } from '../../state-slices/error/errorSlice';
import { AlertColor } from '@mui/material';
import { Comment } from '../../models/comment';
import { Redirect } from 'react-router';
import AddCommentRoundedIcon from '@mui/icons-material/AddCommentRounded';

function AddComment() {
    const [inputText, setInputText] = useState('');
    const [redirect, setRedirect] = useState(false);
    const dispatch = useDispatch();
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);

    let handleChange = (e: any) => {
        setInputText(e)
    }

    let handleClick = async () => {
        try {
            dispatch(setErrorSeverity('info'));
            dispatch(showSnackbar('Creating comment...'));
            let commentAncestors: string[] = [forumInfo.currentSubforum.id, forumInfo.currentThread.id]
            let toAdd = new Comment(commentAncestors, forumInfo.currentThread.id, inputText, auth.authUser.username)
            let resp = await addComment(toAdd);
            setRedirect(true);
            setRedirect(false);
            dispatch(setErrorSeverity('success'));
            dispatch(showSnackbar('Comment added!'));
        } catch (e: any) {
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar('There was a problem creating your comment'));
        }
    }
    
    if (redirect) {
        return (
            <Redirect to='/forum' />
        )
    }

    return (
        <Paper elevation={3} style={{'margin': '.5rem'}}>
            <div style={{'margin': '2rem'}}>
                <Editor id='addNewComment' onChange={handleChange} placeholder='Write your comment here...' />
                <Button id='createCommentButton' onClick={handleClick} style={{'color':'#75BC3E'}}><AddCommentRoundedIcon />Create</Button>
            </div>
        </Paper>
    )
}

export default AddComment;