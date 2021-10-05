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
                <Button onClick={() => {setShowAddThread(true)}}>Add Thread</Button>
            :
                <div />
            }
          <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>Subject</TableCell>
                      <TableCell align="left">Author&nbsp;</TableCell>
                      <TableCell align="left">Number of Comments&nbsp;</TableCell>
                  </TableRow>
              </TableHead>
            <TableBody>
                {threads?.map((thr) => (
                    <TableRow>
                        <TableCell
                          align="left"
                          onClick={() => Navigate(thr.subject, thr)}>
                          {thr.subject}
                          </TableCell>
                          <TableCell
                          align="left"
                          onClick={() => Navigate(thr.subject, thr)}>
                          {thr.owner}
                        </TableCell>
                      <TableCell align="left">{thr.child_count}</TableCell>
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