import { quizzardApiClientTokenAuthorized as QuizzardClient } from "./api-client";
import { Comment } from '../models/comment';

export async function addComment(comment: Comment) {
    let response = await QuizzardClient.post('/forum/comment');

    if (response.status > 400 && response.status < 599) {
        throw response.data;
    }
    return response.data;
}