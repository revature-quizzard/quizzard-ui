import { quizzardApiClient } from "./api-client";


export async function getUser(userId: String){
    let response = await quizzardApiClient.get(`/user?id=${userId}`)
    return response.data;
}