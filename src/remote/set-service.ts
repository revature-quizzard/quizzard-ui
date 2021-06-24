import { CardSet } from "../Models/CardSet";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";

export async function createStudySet(studySet: CardSet){
	let response = await quizzardApiClientTokenAuthorizedSynchronous.post('/sets/newset', {studySet});
	return await response.data;
}


/**
 * An axios get request to get all sets created by account
 * @param username A string of the username of the account
 * @returns A list of sets that the account has created
 * @author Vinson Chin
 * @author Austin Knauer
 */
 export async function createdSetSearch(headers:any) {
	let response = await quizzardApiClientTokenAuthorizedSynchronous.get(`/sets/created`,{
		headers:headers
	});
	return await response.data;
    }