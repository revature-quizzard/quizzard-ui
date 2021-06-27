import { CardSet } from "../models/card-set";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";

export async function createStudySet(studySet: CardSet) {
	
	console.log("Inside set-service: " + JSON.stringify(studySet))
	let response = await quizzardApiClientTokenAuthorizedSynchronous.post('/sets/newset', studySet);
	console.log(response);
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