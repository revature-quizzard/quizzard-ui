import axios from "axios";
import {StudySet} from "../models/study-set";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";

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
    // const remoteURL = 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com';
    const remoteURL = "http://localhost:5000";
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
    // const remoteURL = 'http://quizzard-api-lb-109748176.us-east-2.elb.amazonaws.com';
    const remoteURL = "http://localhost:5000";
    await axios.get(`${remoteURL}/sets/ownedSets`, config)
        .then(response => {
            data = response.data;
        })
        .catch(e => console.log(e));
    return data;
}

