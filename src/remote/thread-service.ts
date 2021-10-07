import { quizzardApiClientTokenAuthorized as QuizzardClient } from "./api-client";
import { Thread } from "../models/thread";

/**
 * async function which makes an axios call to the API to post a new thread
 * @param thread - Thread to be persisted to database
 * @returns The data inside the axios response, including a 201 status
 * @author Charles Mettee
 */
export async function addThread(thread: Thread){
    let response = await QuizzardClient.post('/forum/thread', thread);

    if(response.status >= 400){
        throw response.data;
    }
    return response.data;
}

/**
 * async function which makes an axios call to the API to replace an existing thread with an updated version of itself
 * @param thread - Thread to be updated in the database
 * @returns The data inside the axios response, including a 200 status
 * @author Charles Mettee
 */
 export async function updateThread(thread: Thread){
    let response = await QuizzardClient.put('/forum/thread', thread);

    if(response.status >= 400){
        throw response.data;
    }
    return response.data;
}
