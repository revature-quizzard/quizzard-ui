import {
    quizzardApiClientTokenAuthorized,
    quizzardApiClient,
    quizzardApiClientTokenAuthorizedSynchronous
} from "./api-client";
import addPoints from "../models/request-models/add-points";
import { UpdateAccModel} from "../models/update-account-info-model";

/**
 * Axios call that leverages the Token that contains account ID, which is used in the back end.
 * We pass in the new information to update the account being an object with the properties
 * username, email, and password with string type. Back end validates emptiness, so will not persist.
 * @param newInformationModel Model object with fields username, email, password with string type.
 */
export async function updateAccInfo (newInformationModel:UpdateAccModel,headers:any){
    let response = await quizzardApiClientTokenAuthorizedSynchronous.put(`/accounts/update`,newInformationModel,{
        headers: headers
    });
    return await response.data;
}


export async function addPointsToUser (ponits: addPoints) {
    let response = await quizzardApiClientTokenAuthorized.post(`/accounts/points`, ponits);
    return await response.data;
}