import axios from "axios";
import {Flashcard} from "../../Models/Flashcard";


export const flashcardSaver = async (props: any) =>
{
    console.log('Running flashcardSaver');
    console.log(props);
    const remoteURL = 'http://localhost:5000';
    return await axios.post(`${remoteURL}/cards/save`,
        props)
        .then(response => response.data)
        .catch(e => console.log(e));
}