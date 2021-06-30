import axios from "axios";
import {StudySet} from "../models/study-set";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";
import apiUrl from './api-url';

/**
 * @author Sean Taba
 * @returns: Public flashcards
 * retrieves public flashcards from DB
 */
export const publicSetsFetcher = async (token: string) =>
{
    let config = {
        headers: {
            Authorization: token
        }
    }
    console.log('fetcher 01')
    let data: StudySet[] = [];
    const remoteURL = apiUrl;
    await axios.get(`${remoteURL}/sets/publicSets`, config)
        .then(response => {
            data = response.data;
        })
        .catch(e => console.log(e));
    return data;
}

export const ownedSetsFetcher = async (token: string) =>
{
    let config = {
        headers: {
            Authorization: token
        }
    }

    console.log('fetcher 02')
    let data: StudySet[] = [];
    const remoteURL = apiUrl;
    
    await axios.get(`${remoteURL}/sets/ownedSets`, config)
        .then(response => {
            data = response.data;
        })
        .catch(e => console.log(e));
    return data;
}

