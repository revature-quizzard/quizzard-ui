import {
    quizzardApiClientTokenAuthorized,
    quizzardApiClient,
    quizzardApiClientTokenAuthorizedSynchronous
} from "./api-client";
import { UpdateAccModel} from "../Models/UpdateAccountInfo-model";

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



