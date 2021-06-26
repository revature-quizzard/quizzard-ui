import { LoginModel } from "../models/login-model";
import { RegisterModel } from "../models/register-model";
import { quizzardApiClient } from "./api-client"

export async function register(newUser: RegisterModel){
    let response = await quizzardApiClient.post(`/register`, newUser);
    return await response;
}

// export async function login(username: string, password: string){
//     let response = await quizzardApiClient.post(`/login`, {username, password});
//     return await response;
// }
export async function login(loginUser: LoginModel){
    let response = await quizzardApiClient.post(`/login`, loginUser);
    return await response;
}