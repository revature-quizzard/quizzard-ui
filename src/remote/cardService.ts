import { quizzardClient } from "./quizzardClient";


/**
 * Performs an axio post request to save a card into the database
 * @param question A string representing the question
 * @param answer A string representing the answer to the question
 * @param reviewable A boolean to set wether a card flaged for review
 * @param isPublic A boolean to set wether a card is public
 * @param subject A string representing the subjectId
 * @returns The flashcard that was saved to the database with an updated id
 * @author 'Kevin Chang'
 * @author 'Giancarlo Tomasello'
 */

export async function createCard(question: String, answer: string, reviewable: boolean, isPublic: boolean, subject: string){
    console.log("Running Axios function")

    let subjectId = parseInt(subject)
    let response = await quizzardClient.post('/card/newcard', {question, answer, reviewable, isPublic, subjectId})
    console.log("Data: " + response.data)
    return await response.data;
}

/**
 * Performs an axios get request to the database to get all the flashcard
 * @returns A list of all the cards in the database
 * @author 'Kevin Chang'
 * @author 'Giancarlo Tomasello'
 */

export async function getCards(){
    console.log("Running getCards axios function")
    let response = await quizzardClient.get('/card/all')
    console.log("Data: " + response.data)
    return await response.data;
}

