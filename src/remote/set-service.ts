import { CardSetRequest } from "../models/request-models/card-set-request";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";

export async function createStudySet(studySet: CardSetRequest) {
	
	console.log("Inside set-service: " + JSON.stringify(studySet))
	let response = await quizzardApiClientTokenAuthorizedSynchronous.post('/sets/newset', studySet);
	console.log(response);
	return await response.data;
}

/**
 * Added on a refactor to include token header for user integration. Copy pasted code
 * just in case, as editing above may have been cusing bugs... though we don't know why.
 * @author Kyle, Ej, Everett, Rich
 * @param studySet
 */
export async function createStudySetWithToken(studySet: CardSetRequest, headers: any) {

	console.log("Inside set-service: " + JSON.stringify(studySet))
	let response = await quizzardApiClientTokenAuthorizedSynchronous.post('/sets/newset', studySet, {
		headers: headers
	});
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