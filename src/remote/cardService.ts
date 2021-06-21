import { quizzardClient } from "./quizzardClient";



export async function createCard(question: String, answer: string, reviewable: boolean, isPublic: boolean, subject: String){
    console.log("Running Axios function")
    //How do I pass along the subject? Sending a string creates a 404 error
    let response = await quizzardClient.post('/card/newcard/', {question, answer, reviewable, isPublic, test:null})
    console.log("Data: " + response.data)
    return await response.data;
}

export async function getCards(){
    console.log("Running getCards axios function")
    let response = await quizzardClient.get('/card/all')
    console.log("Data: " + response.data)
    return await response.data;
}

