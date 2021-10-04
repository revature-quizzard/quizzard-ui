import { useState } from 'react';
import { authState } from '../../state-slices/auth/auth-slice';
import { useSelector } from 'react-redux';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import { forumState } from '../../state-slices/forum/forum-slice';
import { Comment } from '../../models/comment';
import { updateComment } from '../../remote/comment-service';

interface IUpdateCommentProps {
    close: (input: boolean) => void;
}

function UpdateComment(props: IUpdateCommentProps) {
    const [description, setDescription] = useState('');
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);

    let handleChange = (e: any) => {
        setDescription(e)
    }

    let handleClick = async () => {
        console.log("button clicked!");
        props.close(false);
        try {
            let commentAncestors: string[] = [forumInfo.currentSubforum.id, forumInfo.currentThread.id]
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
            let resp = await updateComment(toAdd);
        } catch (e: any) {
            console.log(e);
        }
    }

    return (
        <Paper elevation={3} style={{'margin': '4rem'}}>
            <div style={{'margin': '2rem'}}>
                <Editor onChange={handleChange} placeholder='Update your comment...' />
                <Button onClick={handleClick} style={{'color':'#75BC3E'}}>Update</Button>
            </div>
        </Paper>
    )
}

export default UpdateComment;