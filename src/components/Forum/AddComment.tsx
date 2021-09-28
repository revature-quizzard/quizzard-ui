import { useState } from 'react';
import Editor from 'rich-markdown-editor';

function AddComment() {
    const [inputText, setInputText] = useState('');

    let handleChange = (e: any) => {
        setInputText(e)
    }

    return (
        <>
            <Editor onChange={handleChange} placeholder='Write your comment here...' />
        </>
    )
}

export default AddComment;