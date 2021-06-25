import axios from "axios";
import {FlashcardDTO} from "../Models/flashcard";

/**
 * @author Sean Taba
 * @returns: Persisted flashcard with its generated id
 * @param props: Created flashcard to be persisted
 * persists the created flashcard to the DB
 */
export const flashcardSaver = async (props: FlashcardDTO) =>
{
    const remoteURL = 'http://localhost:5000';
    return await axios.post(`${remoteURL}/cards/save`, props)
        .then(response => response.data)
        .catch(e => console.log(e));
}