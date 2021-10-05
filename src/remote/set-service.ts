import { SetDto } from "../dtos/set-dto";
import { CardSetRequest } from "../models/request-models/card-set-request";
import {
  quizzardApiClient,
  quizzardApiClientTokenAuthorized,
  quizzardApiClientTokenAuthorizedSynchronous
} from "./api-client";

export async function createStudySet(studySet: SetDto) {

  let response = await quizzardApiClientTokenAuthorized.post("/sets", studySet);

  return await response.data;
}


export async function getSetTags() {

  let response = await quizzardApiClientTokenAuthorized.get("/tags");

  return await response.data;
}
/**
 * Added on a refactor to include token header for user integration. Copy pasted code
 * just in case, as editing above may have been cusing bugs... though we don't know why.
 * @author Kyle, Ej, Everett, Rich
 * @param studySet
 */


export async function createStudySetWithToken(
  studySet: CardSetRequest,
  headers: any
) {
  let response = await quizzardApiClientTokenAuthorizedSynchronous.post(
    "/sets",
    studySet,
    {
      headers: headers,
    }
  );

  return await response.data;
}

export const getAllSets = async () =>{

  let resp = await quizzardApiClientTokenAuthorized.get('/sets')


  if (resp.status >= 400 && resp.status <= 599) {
    throw resp.data;
  }
  console.log(resp.data)
  return resp.data;
}
