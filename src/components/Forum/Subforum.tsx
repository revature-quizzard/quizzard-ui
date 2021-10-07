import { getAllSubForums } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Subforum } from '../../models/subforum';
import { useHistory } from 'react-router';
import { setCurrentSubforum } from '../../state-slices/forum/forum-slice';
import { forumState } from '../../state-slices/forum/forum-slice';
import { useDispatch, useSelector } from 'react-redux';

const SubforumHandler = ()=> {
    
    let [subforums,setSubforums] = useState(undefined as Subforum[] | undefined);
    const history = useHistory();
    const forumInfo: Subforum = useSelector(forumState).currentSubforum;
    const dispatch = useDispatch();

    useEffect(() => {
        const getSubforums = async () => {
          try{
              setSubforums(await getAllSubForums());
          } catch(error) {
              console.log(error);
          }
        };
        getSubforums();
      }, []);

    function Navigate(id: string, sub: Subforum){
      dispatch(setCurrentSubforum(sub));
      console.log("Navigating to " + id);
      history.push("/forum/" + id);
    }

    return (
      <>
      <h1 className="logo-Grand-Qwuizzard" style={{color: '#4E3E61 ' , fontFamily:"Emilys Candy" ,  textAlign: 'center' }}><b> <span >Q W I Z Z A R D</span>
      <br/> 
      <span style={{color: 'grey' ,  textAlign: 'center'}}>Forum</span> </b> </h1>
      <hr/>

      <TableContainer component={Paper}>
        <Table>
          <TableHead style={{'backgroundColor':'#333333'}}>
            <TableRow>
              <TableCell style={{'color':'#FFFFFF'}}>Subject</TableCell>
              <TableCell align="left" style={{'color':'#FFFFFF'}}>Description&nbsp;</TableCell>
              <TableCell align="left" style={{'color':'#FFFFFF'}}>Number of Threads&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subforums?.map((sub) => (
              <TableRow style={{'backgroundColor':'#5E5E5E'}}>
                <TableCell
                align="left"
                style={{'color':'#FFFFFF'}}
                onClick={() => Navigate(sub.subject, sub)}>
                  {sub.subject}
                </TableCell>
                <TableCell
                align="left"
                style={{'color':'#FFFFFF'}}
                onClick={() => Navigate(sub.subject, sub)}>
                  {sub.description}
                </TableCell>
                <TableCell
                align="left"
                style={{'color':'#75BC3E'}}>
                  {sub.child_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      </>
    );
}

export default SubforumHandler;