import { quizzardClient } from "./quizzard-client";

/**
 * Performs an axios post request to save a card into the database
 * @param question A string representing the question
 * @param answer A string representing the answer to the question
 * @param reviewable A boolean to set wether a card flaged for review
 * @param isPublic A boolean to set wether a card is public
 * @param subjectId A string representing the subjectId
 * @returns The flashcard that was saved to the database with an updated id
 * @author 'Kevin Chang'
 * @author 'Alfonso Holmes'
 * @author 'Bill Thomas'
 * @author 'Kim Tran'
 * @author 'Jose Tejada'
 */

export async function createCard(question: String, answer: string, card_id: string, set_id: string ) {
  let response = await quizzardClient.post("/sets/card", {
    question,
    answer,
    card_id,
    set_id,
  });

  return await response.data;
}

/**
 * Performs an axios get request to the database to get all the flashcard
 * @returns A list of all the cards in the database
 * @author 'Kevin Chang'
 * @author 'Giancarlo Tomasello'
 */

export async function getCards( set_id: string ) {
  let response = await quizzardClient.get(`/cards?set_id=${set_id}`);
  return await response.data;
}
