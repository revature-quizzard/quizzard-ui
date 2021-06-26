import axios from "axios";
import {StudySet} from "../models/study-set";

/**
 * @author Sean Taba
 * @returns: Public flashcards
 * retrieves public flashcards from DB
 */
export const publicSetsFetcher = async () =>
{
    console.log('fetcher 01')
    let data: StudySet[] = [];
    const remoteURL = 'http://localhost:5000';
    await axios.get(`${remoteURL}/sets`)
        .then(response => {
            data = response.data;
        })
        .catch(e => console.log(e));
    return data;
}

