import { useState } from 'react';
import { authState } from '../../state-slices/auth/auth-slice';
import { useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { forumState } from '../../state-slices/forum/forum-slice';
import { Comment } from '../../models/comment';
import { addComment } from '../../remote/comment-service';

function AddComment() {
    const [inputText, setInputText] = useState('');
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);

    let handleChange = (e: any) => {
        setInputText(e)
    }

    let handleClick = async () => {
        try {
            let commentAncestors: string[] = [forumInfo.currentSubforum.id, forumInfo.currentThread.id]
            let toAdd = new Comment(commentAncestors, forumInfo.currentThread.id, inputText, auth.authUser.username)
            let resp = await addComment(toAdd);
        } catch (e: any) {
            // set an error message / toast here
        }
    }

    return (
        <Paper elevation={3} style={{'margin': '4rem'}}>
            <div style={{'margin': '2rem'}}>
                <Editor onChange={handleChange} placeholder='Write your comment here...' />
                <Button onClick={handleClick} style={{'color':'#75BC3E'}}>Create</Button>
            </div>
        </Paper>
    )
}

export default AddComment;