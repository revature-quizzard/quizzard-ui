import { useState } from 'react';
import Editor from 'rich-markdown-editor';
import Button from '@mui/material/Button';
import { Dialog } from '@mui/material';

interface IAddCommentProps {
    open: boolean;
    setOpen: (openStatus: boolean) => void
}

function AddComment(props: IAddCommentProps) {
    const [inputText, setInputText] = useState('');

    let handleChange = (e: any) => {
        setInputText(e);
    }

    let handleClick = async () => {
        try {
            // make axios call here
            setInputText('');
        } catch (e: any) {
            // set an error message / toast here
        }
    }

    let handleClose = () => {
        props.setOpen(false);
    }

    return (
        <Dialog open={props.open} onClose={handleClose} style={{'margin': '2rem'}}>
            <Editor onChange={handleChange} placeholder='Write your comment here...' />
            <Button onClick={handleClick}>Create</Button>
        </Dialog>
    )
}

export default AddComment;