import { getAllSubForums } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Subforum } from '../../models/subforum';
import { NavigateNextOutlined } from '@material-ui/icons';
import { useHistory } from 'react-router';

const SubforumHandler = ()=> {
    
    let [subforums,setSubforums] = useState(undefined as Subforum[] | undefined);
    const history = useHistory();
    useEffect(() => {
   
        const getSubforums = async () => {
          try{
          setSubforums(await getAllSubForums());
          console.log('in component: ' + subforums[0]);
          }catch(error)
          {
            console.log(error);
          }
        };
        getSubforums();
      }, []);

    function Navigate(id: string){
      console.log("Navigating to " + id);
      history.push("/forum/" + id);
    }

    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Subject</TableCell>
              <TableCell align="left">Description&nbsp;</TableCell>
              <TableCell align="left">Number of Threads&nbsp;</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {subforums?.map((sub) => (
              <TableRow>
                <TableCell
                align="left"
                onClick={() => Navigate(sub.subject)}>
                {sub.subject}
                </TableCell>
                <TableCell
                align="left"
                onClick={() => Navigate(sub.subject)}>
                {sub.description}
                </TableCell>
                <TableCell align="left">{sub.child_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default SubforumHandler;