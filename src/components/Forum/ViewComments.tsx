import { useSelector, useDispatch } from 'react-redux';
import { forumState } from '../../state-slices/forum/forum-slice';
import { viewComments } from '../../remote/comment-service';
import { Paper } from '@mui/material';
import { Comment } from '../../models/comment';
import { Divider, Avatar, Grid, Button, Typography } from "@material-ui/core";
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
    const [dummySwitch, setDummySwitch] = useState(false);

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
    }, [dummySwitch]);


    return (
        <>
            <div style={{'marginTop': '1rem', 'padding': '1rem', 'backgroundColor': '#333333'}}>
            {(forumInfo.owner === auth.authUser?.username)
            ? 
                <Button
                style={{'color':'#75BC3E', 'border': 'solid #5E5E5E', 'margin': '.5rem'}}
                onClick={() => {setShowEditThread(true);}}>
                    Update Thread
                </Button> 
            : 
                <></>
            }
            <Paper elevation={3} style={{ 'padding': '40px 20px'}}>
            
                <div style={{'margin': '2rem'}}>
                    <Typography variant='body2' style={{'color':'gray'}}>{forumInfo.owner}</Typography>
                    <h1>{forumInfo.subject}</h1>
                    <Editor readOnly={true} value={forumInfo.description} />
                    <br/>
                    <Typography variant='body2' style={{'color':'gray'}}>{forumInfo.date_created}</Typography>
                    {/* <h1>forumInfo.currentThread.subject</h1>
                    <p>forumInfo.currentThread.description</p> */}
                </div>    
            </Paper>
            </div>

            {comments?.map((comment) => (
                <div style={{'padding':'1rem','backgroundColor':'#5E5E5E'}}>
                    <Paper elevation={2} style={{ padding: "40px 20px" }}>
                        <Grid container wrap="nowrap" spacing={2}>
                            <Grid item xs zeroMinWidth>
                            <Typography variant='body2' style={{ margin: 0, textAlign: "left", color: "gray" }}>{comment.owner}</Typography>
                            <p style={{ textAlign: "left" }}>
                                <Editor readOnly={true} value={comment.description} />
                            </p>
                            <Typography variant='body2' style={{ textAlign: "left", color: "gray" }}>
                                {comment.date_created.replace('T', ' ').substring(0,16)}
                            </Typography>
                            {(comment.owner === auth.authUser?.username) ?
                            <Button style={{'color': '#75BC3E'}} onClick={() => {
                                dispatch(setCurrentComment(comment));
                                setShowEditComment(true);
                            }}>edit</Button> : <></>}
                            </Grid>
                        </Grid>
                    </Paper>
                    <Divider variant="fullWidth" style={{ margin: "30px 0" }} />
                </div>
            ))}
            <div style={{'padding':'1rem','backgroundColor':'#5E5E5E'}}>
            {(auth.isAuthenticated) ? <AddComment dummySwitch={dummySwitch} setDummySwitch={setDummySwitch} /> : <></>}
            </div>
            <Modal open={showEditComment} onClose={() => {setShowEditComment(false)}}>
                <UpdateComment dummySwitch={dummySwitch} setDummySwitch={setDummySwitch} close={setShowEditComment} />
            </Modal>
            <Modal open={showEditThread} onClose={() => {setShowEditThread(false)}}>
                <UpdateThread dummySwitch={dummySwitch} setDummySwitch={setDummySwitch} close={setShowEditThread} />
            </Modal>
        </>
    )
}

export default ViewComment;