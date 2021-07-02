import { CardSetRequest } from "../models/request-models/card-set-request";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";

export async function createStudySet(studySet: CardSetRequest) {
  let response = await quizzardApiClientTokenAuthorizedSynchronous.post(
    "/sets/newset",
    studySet
  );

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
    "/sets/newset",
    studySet,
    {
      headers: headers,
    }
  );

  return await response.data;
}

