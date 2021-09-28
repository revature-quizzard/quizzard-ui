import { useState } from 'react';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';

function AddComment() {
    const [inputText, setInputText] = useState('');

    let handleChange = (e: any) => {
        setInputText(e)
    }

    let handleClick = async () => {
        // make axios call here
        // also probably set input text to empty string
    }

    return (
        <>
            <Editor onChange={handleChange} placeholder='Write your comment here...' />
            <Button onClick={handleClick}>Create</Button>
        </>
    )
}

export default AddComment;