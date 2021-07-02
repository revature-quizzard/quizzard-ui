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
