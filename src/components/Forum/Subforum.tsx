import { getAllSubForums } from '../../remote/sub-forum-service';
import { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Typography } from '@material-ui/core';

const Subforum = ()=> {
    
    useEffect(() => {
   
        const getSubforums = async () => {
          let subforums = await getAllSubForums();
        };
        getSubforums();
    
      }, []);

      return (
        <> 
        </>
    );
}

export default Subforum;