import { tokenToString } from "typescript";
import { quizzardApiClientTokenAuthorized } from "./api-client";


export async function getUserData(userId: string){
    let response = await quizzardApiClientTokenAuthorized.get(`/users?id=${userId}`)
    return response.data;
}

export async function addSetToFavorites(setId:{id:string}, user_Id:string){

    console.log(user_Id)
    console.log(setId)
    let response = await quizzardApiClientTokenAuthorized.post(`/users/favorites?user_id=${user_Id}`, setId )
    console.log("we did it")

    return response.data
}