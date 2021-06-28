import axios from "axios";
import {FlashcardDTO, SetFlashcardDTO} from "../models/flashcard";

/**
 * @author Sean Taba
 * @returns: Persisted flashcard with its generated id
 * @param props: Created flashcard to be persisted
 * persists the created flashcard to the DB
 */
export const flashcardSaver = async (props: SetFlashcardDTO) =>
{
    const remoteURL = 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com';
    return await axios.post(`${remoteURL}/cards/save`, props)
        .then(response => response.data)
        .catch(e => console.log(e));
}