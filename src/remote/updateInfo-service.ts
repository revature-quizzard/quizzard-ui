import { webappClient } from "./webapp-client";

export async function updateAccInfo(id:number){
    let response = await webappClient.put(`/update/${id}`)
    return await response.data;
}