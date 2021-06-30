import { quizzardClient } from "../remote/quizzard-client";

/**
   * Sends an axios call to retrieve all subjects in the database.
   * @returns Subject data in JSON format
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
export async function getSubs(){
    console.log("Running getSubs axios function to retrieve Subjects")
    let response = await quizzardClient.get('/subject/all')
    // console.log("Subjects: " + response.data)
    return await response.data;
}