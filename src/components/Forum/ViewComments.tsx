import { useSelector, useDispatch } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import { Comment } from '../../models/comment';
import { Divider, Avatar, Grid, Button } from "@material-ui/core";
import React, { useEffect, useState } from 'react';
import  Editor  from 'rich-markdown-editor';
import { Thread } from '../../models/thread';
import { authState } from '../../state-slices/auth/auth-slice';
import AddComment from './AddComment';
import UpdateComment from './UpdateComment';
import Modal from '@mui/material/Modal'
import { setCurrentComment } from '../../state-slices/forum/forum-slice';
import UpdateThread from './UpdateThread';

function ViewComment() {
    const forumInfo: Thread = useSelector(forumState).currentThread;
    const auth = useSelector(authState);
    const dispatch = useDispatch();
    const [showEditComment, setShowEditComment] = useState(false);
    const [showEditThread, setShowEditThread] = useState(false);

    let [comments,setComments] = useState(undefined as Comment[] | undefined);


    useEffect(() => {
        console.log(forumInfo);
        const getComments = async () => {
        try{
            setComments(await viewComments(forumInfo.id));
        } catch(e:any) {
            // set an error message / toast here
            console.log(e);
        }
        }
        getComments();
    }, []);


    return (
        <>
            {(forumInfo.owner === auth.authUser?.username)
            ? 
                <Button onClick={() => {setShowEditThread(true);}}>
                    Update Thread
                </Button> 
            : 
                <></>
            }
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
                                {comment.date_created.replace('T', ' ').substring(0,16)}
                            </p>
                            {(comment.owner === auth.authUser?.username) ? <Button onClick={() => {
                                dispatch(setCurrentComment(comment));
                                setShowEditComment(true);
                            }}>edit</Button> : <></>}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </div>
            ))}
            {(auth.isAuthenticated) ? <AddComment /> : <></>}
            <Modal open={showEditComment} onClose={() => {setShowEditComment(false)}}>
                <UpdateComment close={setShowEditComment}/>
            </Modal>
            <Modal open={showEditThread} onClose={() => {setShowEditThread(false)}}>
                <UpdateThread />
            </Modal>
        </>
    )
}

export default ViewComment;