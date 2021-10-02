import { quizzardApiClientTokenAuthorized as QuizzardClient } from "./api-client";
import { Thread } from "../models/thread";

/**
 * @param thread - Thread to be persisted to database
 * @returns The response data
 * @author Charles Mettee
 */
export async function addThread(thread: Thread){
    let response = await QuizzardClient.post('/forum/thread', thread);

    if(response.status >= 400){
        throw response.data;
    }
    return response.data;
}