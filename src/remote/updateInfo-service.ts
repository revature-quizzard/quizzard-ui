import { quizzardApiClientTokenAuthorized, quizzardApiClient } from "./api-client";
import { UpdateAccModel} from "../models/UpdateAccountInfo-model";

/**
 * Axios call that leverages the Token that contains account ID, which is used in the back end.
 * We pass in the new information to update the account being an object with the properties
 * username, email, and password with string type. Back end validates emptiness, so will not persist.
 * @param newInformationModel Model object with fiels username, email, password with string type.
 */
export async function updateAccInfo(newInformationModel:UpdateAccModel){
    let response = await quizzardApiClient.put(`/accounts/update`,newInformationModel);
    return await response.data;
}