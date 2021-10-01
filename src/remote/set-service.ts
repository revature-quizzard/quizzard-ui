import { SetDto } from "../models/set-dto";
import { quizzardApiClientTokenAuthorizedSynchronous } from "./api-client";


export async function createSet(studySet: SetDto , token : string) {
  let response = await quizzardApiClientTokenAuthorizedSynchronous.post(
    "/sets/newset",
    studySet
  );

  return await response.data;
}



