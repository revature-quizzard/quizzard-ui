import axios from "axios";
import {FlashcardDTO, SetFlashcardDTO} from "../models/flashcard";

/**
 * @author Sean Taba
 * @returns: Persisted flashcard with its generated id
 * @param props: Created flashcard to be persisted
 * persists the created flashcard to the DB
 * @param token
 */
export const flashcardSaver = async (props: SetFlashcardDTO, token: string) =>
{
    // const remoteURL = 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com';
    let config = {
        headers: {
            Authorization: token
        }
    }
    const remoteURL = "http://localhost:5000";
    return await axios.post(`${remoteURL}/sets/cards/save`, props, config)
        .then(response => response.data)
        .catch(e => console.log(e));
}