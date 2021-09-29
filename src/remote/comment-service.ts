import { quizzardApiClientTokenAuthorized as QuizzardClient } from "./api-client";

export async function AddComment(comment: Comment) {
    let response = await QuizzardClient.post('/forum/comment');

    if (response.status > 400 && response.status < 599) {
        throw response.data;
    }
    return response.data;
}