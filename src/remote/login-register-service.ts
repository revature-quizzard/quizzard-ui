import { quizzardApiClient } from "./api-client"

export async function register(newUser: object){
    let response = await quizzardApiClient.post(`/register`, newUser);
    return await response;
}

export async function login(username: string, password: string){
    let response = await quizzardApiClient.post(`/login`, {username, password});
    return await response;
}