import { webappClient } from "./web-client";

export async function createStudySet(name: String, isPublic: boolean){
	let response = await webappClient.post('/sets/newset',{name, isPublic});
	return await response.data;
}


export async function createdSetSearch(username: String) {
	let response = await webappClient.get(`/created/${username}`);
	return await response.data;
    }