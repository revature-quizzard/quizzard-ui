import { useSelector } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import { Divider, Avatar, Grid } from "@material-ui/core";
import React from 'react';


function ViewComment() {
    const forumInfo = useSelector(forumState);

    let resp;
    let handleClick = async () => {
        try{
            resp = await viewComments(forumInfo.currentThread.id);
        } catch(e:any) {
            // set an error message / toast here
        }
    }

return (
    <>
        <Paper elevation={3} style={{'margin':'4rem'}}>
            <div style={{'margin': '2rem'}}>
                <h1>Thread subject</h1>
                <br></br>
                <br></br>
                <p>Thread description</p>
                {/* <h1>forumInfo.currentThread.subject</h1>
                <p>forumInfo.currentThread.description</p> */}
            </div>
        </Paper>
        {true && 
            <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                    <h5 style={{ margin: 0, textAlign: "left" }}>USERNAME</h5>
                    <p style={{ textAlign: "left" }}>
                        Comment!
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        posted 1 minute ago
                    </p>
                    </Grid>
                </Grid>
            </Paper>
        }
    </>
    
)
}
export default ViewComment;