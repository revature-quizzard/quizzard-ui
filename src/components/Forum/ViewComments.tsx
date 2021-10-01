import { useSelector } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import React from 'react';


function ViewComment() {
    const forumInfo = useSelector(forumState);
    let handleClick = async () => {
        try{
            let resp = await viewComments(forumInfo.currentThread.id);
        } catch(e:any) {
            // set an error message / toast here
        }
    }

return (
    <Paper elevation={3} style={{'margin':'4rem'}}>
        <div>
            <h1>Thread subject</h1>
            <p>Thread description</p>
            {/* <h1>forumInfo.currentThread.subject</h1>
            <p>forumInfo.currentThread.description</p> */}
        </div>
    </Paper>

)
}
export default ViewComment;