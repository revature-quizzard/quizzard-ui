import { getAllSubForums } from '../../remote/sub-forum-service';
import { useEffect, useState } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Subforum } from '../../models/subforum';

const SubforumHandler = ()=> {
    
    let [subforums,setSubforums] = useState(undefined as Subforum[] | undefined);
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
                <TableCell align="left">{sub.subject}</TableCell>
                <TableCell align="left">{sub.description}</TableCell>
                <TableCell align="left">{sub.child_count}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
}

export default SubforumHandler;