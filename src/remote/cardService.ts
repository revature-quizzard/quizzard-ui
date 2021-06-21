import { quizzardClient } from "./quizzardClient";



export async function createCard(question: String, answer: string, reviewable: boolean, isPublic: boolean, subject: string){
    console.log("Running Axios function")

    let subjectId = parseInt(subject)
    let response = await quizzardClient.post('/card/newcard/', {question, answer, reviewable, isPublic, subjectId})
    console.log("Data: " + response.data)
    return await response.data;
}

export async function getCards(){
    console.log("Running getCards axios function")
    let response = await quizzardClient.get('/card/all')
    console.log("Data: " + response.data)
    return await response.data;
}

