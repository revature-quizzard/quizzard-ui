import { useSelector } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import { Comment } from '../../models/comment';
import { Divider, Avatar, Grid } from "@material-ui/core";
import React from 'react';


function ViewComment() {
    const forumInfo = useSelector(forumState);
    let testArray = [
        new Comment(["ancestor1", "ancestor2"], "parent1ID", "This is a comment!", "hax0r", "ID1", "Subject1", 0, "dateCreated"),
        new Comment(["ancestor1", "ancestor2"], "parent2ID", "This is another comment!", "LukesUsername", "ID2", "Subject1", 0, "dateCreated"),
        new Comment(["ancestor1", "ancestor2"], "parent3ID", "This is a third comment!", "negativeNancy", "ID3", "Subject1", 0, "dateCreated")
    ];
    let resp: Comment[] | undefined;
    let handleClick = async () => {
        try{
            resp = await viewComments(forumInfo.currentThread.id);
        } catch(e:any) {
            // set an error message / toast here
        }
    }
    let rd = function(comment: Comment) {
        return <>
            <Paper style={{ padding: "40px 20px" }}>
                <Grid container wrap="nowrap" spacing={2}>
                    <Grid item xs zeroMinWidth>
                    <h5 style={{ margin: 0, textAlign: "left" }}>{comment.owner}</h5>
                    <p style={{ textAlign: "left" }}>
                        {comment.description}
                    </p>
                    <p style={{ textAlign: "left", color: "gray" }}>
                        {comment.date_created}
                    </p>
                    </Grid>
                </Grid>
            </Paper>
            <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
        </>
    }

    return (
        <>
            <Paper elevation={3} style={{ padding: "40px 20px"}}>
            
                <div style={{'margin': '2rem'}}>
                    <h1>Thread subject</h1>
                    <br></br>
                    <br></br>
                    <p>Thread description</p>
                    {/* <h1>forumInfo.currentThread.subject</h1>
                    <p>forumInfo.currentThread.description</p> */}
                </div>    
            </Paper>

             <br></br>

            {testArray.map( (comment : Comment) => rd(comment))}
    
        </>
    )
}

export default ViewComment;