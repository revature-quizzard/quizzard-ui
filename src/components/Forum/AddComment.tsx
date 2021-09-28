import { useState } from 'react';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';

function AddComment() {
    const [inputText, setInputText] = useState('');

    let handleChange = (e: any) => {
        setInputText(e)
    }

    let handleClick = async () => {
        try {
            // make axios call here
            setInputText('');
        } catch (e: any) {
            // set an error message / toast here
        }
    }

    return (
        <Paper elevation={3} style={{'margin': '4rem'}}>
            <div style={{'margin': '2rem'}}>
                <Editor onChange={handleChange} placeholder='Write your comment here...' />
                <Button onClick={handleClick} style={{'color':'#75BC3E'}}>Create</Button>
            </div>
        </Paper>
    )
}

export default AddComment;