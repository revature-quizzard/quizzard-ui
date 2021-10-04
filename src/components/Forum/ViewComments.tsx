import { useSelector, useDispatch } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import { Comment } from '../../models/comment';
import { Divider, Avatar, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import  Editor  from 'rich-markdown-editor';
import { Thread } from '../../models/thread';


function ViewComment() {
    const forumInfo: Thread = useSelector(forumState).currentThread;
    const dispatch = useDispatch();
    let [comments,setComments] = useState(undefined as Comment[] | undefined);


    useEffect(() => {
        console.log(forumInfo);
        const getComments = async () => {
        try{
            console.log("ABOUT TO FETCH COMMENTS");
            setComments(await viewComments(forumInfo.id));
        } catch(e:any) {
            // set an error message / toast here
            console.log("AN ERROR OCCURED WHILE TRYING TO GET COMMENTS");
            console.log(e);
        }
        }
        getComments();
    }, []);

    function showComments(){
        console.log(comments);
    }

    return (
        <>
            <Button onClick={() => showComments()}>Click me</Button>
            <Paper elevation={3} style={{ padding: "40px 20px"}}>
            
                <div style={{'margin': '2rem'}}>
                    <h1>{forumInfo.subject}</h1>
                    <br></br>
                    <br></br>
                    <p>{forumInfo.description}</p>
                    {/* <h1>forumInfo.currentThread.subject</h1>
                    <p>forumInfo.currentThread.description</p> */}
                </div>    
            </Paper>

             <br></br>

            {comments?.map((comment) => (
                <div>
                    <Paper style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                            <h5 style={{ margin: 0, textAlign: "left" }}>{comment.owner}</h5>
                            <p style={{ textAlign: "left" }}>
                                <Editor readOnly={true} value={comment.description} />
                                
                            </p>
                            <p style={{ textAlign: "left", color: "gray" }}>
                                {comment.date_created}
                            </p>
                            </Grid>
                        </Grid>
                    </Paper>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </div>
            ))}
            
    
        </>
    )
}

export default ViewComment;