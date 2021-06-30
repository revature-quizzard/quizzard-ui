import axios from "axios";
import {FlashcardDTO, SetFlashcardDTO} from "../models/flashcard";
import apiUrl from './api-url';

/**
 * @author Sean Taba
 * @returns: Persisted flashcard with its generated id
 * @param props: Created flashcard to be persisted
 * persists the created flashcard to the DB
 * @param token
 */
export const flashcardSaver = async (props: SetFlashcardDTO, token: string) =>
{
    const remoteURL = apiUrl;
    let config = {
        headers: {
            Authorization: token
        }
    }
    
    return await axios.post(`${remoteURL}/sets/cards/save`, props, config)
        .then(response => response.data)
        .catch(e => console.log(e));
}