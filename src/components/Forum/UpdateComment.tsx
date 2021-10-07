import { useState } from 'react';
import { authState } from '../../state-slices/auth/auth-slice';
import { useDispatch, useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { forumState } from '../../state-slices/forum/forum-slice';
import { Comment } from '../../models/comment';
import { updateComment } from '../../remote/comment-service';
import { Redirect } from 'react-router';
import { setErrorSeverity, showSnackbar } from '../../state-slices/error/errorSlice';

interface IUpdateCommentProps {
    close: (input: boolean) => void;
}

function UpdateComment(props: IUpdateCommentProps) {
    const [description, setDescription] = useState('');
    const [redirect, setRedirect] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);
    const dispatch = useDispatch();

    let handleChange = (e: any) => {
        setDescription(e)
    }

    let handleClick = async () => {
        setDisabled(true);
        try {
            let toAdd = new Comment(
                forumInfo.currentComment.ancestors,
                forumInfo.currentComment.parent,
                description,
                auth.authUser.username,
                forumInfo.currentComment.id,
                forumInfo.currentComment.subject,
                forumInfo.currentComment.child_count,
                forumInfo.currentComment.date_created,
                forumInfo.currentComment.tags
            );
            console.log(toAdd);
            dispatch(setErrorSeverity('info'));
            dispatch(showSnackbar('Updating your comment...'))
            let resp = await updateComment(toAdd);
            dispatch(setErrorSeverity('success'));
            dispatch(showSnackbar('Comment updated!'))
            setRedirect(true);
            setDisabled(false);
            setRedirect(false);
        } catch (e: any) {
            setDisabled(false);
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar('There was a problem updating your comment'))
        }
    }

    if (redirect) {
        return (
            <Redirect to='/forum' />
        )
    }

    return (
        <>
            <Paper elevation={3} style={{'margin': '4rem'}}>
                <div style={{'margin': '2rem'}}>
                    <Editor onChange={handleChange} placeholder='Update your comment...' />
                    <Button id='updateCommentButton' onClick={handleClick} disabled={disabled} style={{'color':'#75BC3E'}}>Update</Button>
                </div>
            </Paper>
        </>
    )
}

export default UpdateComment;