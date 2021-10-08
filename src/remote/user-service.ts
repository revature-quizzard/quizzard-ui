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

export const deleteFavorite = async (setId:string, user_Id:string) => {

    let config = {
        data :{
            id:setId
        }
    }

    let response = await quizzardApiClientTokenAuthorized.delete(`/users/favorites?user_id=${user_Id}`, config );

    return response.data;
}

export const postProfilePicture = async (user_Id:string,image:File) => {
    let data = new FormData();
    data.append('image', image);
    console.log(data);
    let config = {
        headers: { 'Content-Type': 'multipart/form-data' },
    };

    let response = await quizzardApiClientTokenAuthorized.post(`/users/image?user_id=${user_Id}`, data, config);

    return response.data;
}