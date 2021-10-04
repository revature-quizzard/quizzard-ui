import { useState } from 'react';
import { authState } from '../../state-slices/auth/auth-slice';
import { useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { forumState } from '../../state-slices/forum/forum-slice';
import { addComment } from '../../remote/comment-service';
import { showSnackbar, setErrorSeverity } from '../../state-slices/error/errorSlice';
import { AlertColor } from '@mui/material';
import { Comment } from '../../models/comment';
import { setReload } from '../../state-slices/forum/forum-slice';

function AddComment() {
    const [inputText, setInputText] = useState('');
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);

    let handleChange = (e: any) => {
        setInputText(e)
    }

    let handleClick = async () => {
        try {
            setErrorSeverity('info');
            showSnackbar('Createing comment...')
            let commentAncestors: string[] = [forumInfo.currentSubforum.id, forumInfo.currentThread.id]
            let toAdd = new Comment(commentAncestors, forumInfo.currentThread.id, inputText, auth.authUser.username)
            let resp = await addComment(toAdd);
            setReload(true);
            setErrorSeverity('success');
            showSnackbar('Comment successfully added')
        } catch (e: any) {
            setErrorSeverity('error');
            showSnackbar('Your comment could not be added');
        }
    }

    return (
        <Paper elevation={3} style={{'margin': '4rem'}}>
            <div style={{'margin': '2rem'}}>
                <Editor id='addNewComment' onChange={handleChange} placeholder='Write your comment here...' />
                <Button id='createCommentButton' onClick={handleClick} style={{'color':'#75BC3E'}}>Create</Button>
            </div>
        </Paper>
    )
}

export default AddComment;