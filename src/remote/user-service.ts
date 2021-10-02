import { tokenToString } from "typescript";
import { quizzardApiClientTokenAuthorized } from "./api-client";


export async function getUserData(userId: string){
    let response = await quizzardApiClientTokenAuthorized.get(`/users?id=${userId}`)
    return response.data;
}