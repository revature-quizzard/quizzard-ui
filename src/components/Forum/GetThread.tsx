import { getAllThreads } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button } from '@material-ui/core';
import Modal from '@mui/material/Modal';
import { Thread } from '../../models/thread';
import { useHistory } from 'react-router';
import { forumState, setCurrentThread } from '../../state-slices/forum/forum-slice';
import { useDispatch, useSelector } from 'react-redux';
import { authState } from '../../state-slices/auth/auth-slice';
import AddThread from './AddThread';
import NorthRoundedIcon from '@mui/icons-material/NorthRounded';
import MoreVertRoundedIcon from '@mui/icons-material/MoreVertRounded';

const GetThreads = ()=> {
    let [threads, setThread] = useState(undefined as Thread[] | undefined);
    const [showAddThread, setShowAddThread] = useState(false);
    const history = useHistory();
    const auth = useSelector(authState);
    const forumInfo = useSelector(forumState);
    const dispatch = useDispatch();

    useEffect(() => {
   
        const getThreads = async () => {
          try{
            console.log(forumInfo.currentSubforum.id);
            setThread(await getAllThreads(forumInfo.currentSubforum.id));
          }catch(error)
          {
            console.log(error);
          }
        };
        getThreads();
        
      }, []);

    function Navigate(id: string, thr: Thread){
      dispatch(setCurrentThread(thr));
      history.push("/forum/thread/" + id);
    }


    return (
      <>
            {(auth.isAuthenticated)
            ?
                <Button
                style={{'color':'#75BC3E'}}
                onClick={() => {setShowAddThread(true)}}>
                  Add Thread
                </Button>
            :
                <div />
            }
          <TableContainer component={Paper}>
          <Table>
              <TableHead style={{'backgroundColor':'black'}}>
                  <TableRow>
                      <TableCell style={{'color':'grey'}}>Subject</TableCell>
                      <TableCell align="left" style={{'color':'grey'}}>Author&nbsp;</TableCell>
                      <TableCell align="left" style={{'color':'grey'}}>Date Created&nbsp;</TableCell>
                      <TableCell align="left" style={{'color':'grey'}}>Comments&nbsp;</TableCell>
                  </TableRow>
              </TableHead>
            <TableBody>
                {threads?.map((thr) => (
                    <TableRow style={{'backgroundColor':'#1E1E1E'}}>
                        {thr.child_count > 0 ? 

                         <TableCell
                        align="left"
                        style={{'color':'grey'}}
                        onClick={() => Navigate(thr.subject, thr)}>
                        <span style={{color: '#75BC3E'}}><MoreVertRoundedIcon/>  </span>    { thr.subject}
                        </TableCell>

                         :       
                         <TableCell
                         align="left"
                         style={{'color':'grey'}}
                         onClick={() => Navigate(thr.subject, thr)}>
                         <span style={{color: 'red'}}><MoreVertRoundedIcon/>  </span>    { thr.subject}
                         </TableCell>
                         
                         }
                       

                        <TableCell
                        align="left"
                        style={{'color':'grey'}}
                        onClick={() => Navigate(thr.subject, thr)}>
                          {thr.owner}
                        </TableCell>
                        <TableCell
                        align="left"
                        style={{'color':'grey'}}>
                            {thr.date_created.replace('T', ' ').substring(0,16)}
                        </TableCell>
                        { thr.child_count > 0 ? <TableCell
                        align="left"
                        style={{'color':'#75BC3E'}}>
                            {thr.child_count}
                            </TableCell>
                             :
                        <TableCell
                        align="left"
                        style={{'color':'red'}}>
                            {thr.child_count}
                            </TableCell>}


                        
                  </TableRow>
                        
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Modal open={showAddThread} onClose={() => {setShowAddThread(false)}}>
          <AddThread close={setShowAddThread}/>
        </Modal>
      </>
    );


}

export default GetThreads;