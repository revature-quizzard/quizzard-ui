import { getAllSubForums } from '../../remote/sub-forum-service';
import { useEffect } from 'react';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core';
import { Subforum } from '../../models/subforum';

const SubforumHandler = ()=> {
    
    let subforums: Subforum[] | undefined;
    subforums = [new Subforum([], "NULL", "Subforum about Core Java", "id", "Core Java", 1), 
    new Subforum([], "NULL", "Subforum about React", "id", "React", 1),
    new Subforum([], "NULL", "Subforum about Spring", "id", "Spring", 1)];
    useEffect(() => {
   
        // const getSubforums = async () => {
        //   try{
        //   subforums = await getAllSubForums();
        //   }catch(error)
        //   {
        //     console.log(error);
        //   }
        // };
        // getSubforums();
    
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