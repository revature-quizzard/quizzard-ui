import { CardSet } from "../Models/CardSet";
import { webappClient } from "./web-client";

export async function createStudySet(studySet: CardSet){
	let response = await webappClient.post('/sets/newset', {studySet});
	return await response.data;
}


export async function createdSetSearch(username: String) {
	let response = await webappClient.get(`/created/${username}`);
	return await response.data;
    }