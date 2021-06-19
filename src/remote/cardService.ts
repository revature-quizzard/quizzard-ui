import { quizzardClient } from "./quizzardClient";



export async function createCard(question: String, answer: string, reviewable: boolean, isPublic: boolean, subject: String){
    console.log("Running Axios function")
    let response = await quizzardClient.post('/card/newcard', {question, answer, reviewable, isPublic, subject})
    console.log("Data: " + response.data)
    return await response.data;
}