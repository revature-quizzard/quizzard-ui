import { getAllThreads } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Thread } from '../../models/thread';
import { useHistory } from 'react-router';
import { forumState, setCurrentThread } from '../../state-slices/forum/forum-slice';
import { useDispatch, useSelector } from 'react-redux';

import AddThread from './AddThread';

const GetThreads = ()=> {
    let [threads, setThread] = useState(undefined as Thread[] | undefined);
    const history = useHistory();
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
        <AddThread />
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
      </>
    );


}

export default GetThreads;