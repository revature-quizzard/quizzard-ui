import { quizzardApiClientTokenAuthorized as QuizzardClient } from "./api-client";
import { Comment } from '../models/comment';

/**
 * makes an axios call to the api to POST a new comment (ForumNode)
 * @param comment A comment to be added to the database
 * @returns A response with a status code of 201
 * @author 'Luna Haines'
 */
export async function addComment(comment: Comment) {
    let response = await QuizzardClient.post('/forum/comment', comment);

    if (response.status >= 400 && response.status <= 599) {
        throw response.data;
    }
    return response.data;
}

/**
 * async function which makes an axios call to the API to replace an existing comment with an updated version of itself
 * @param comment - The comment to be updated in the database 
 * @returns - The data inside the axios response, including a 200 status
 * @author - Charles Mettee
 */
export async function updateComment(comment: Comment) {
    let response = await QuizzardClient.put('/forum/comment', comment);

    if (response.status >= 400) {
        throw response.data;
    }
    return response.data;
}