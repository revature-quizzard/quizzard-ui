/**
 *  works with GraphQL to set up Answers for game 
*/

/**
 *  This function randomizes the order that all four answers for a card display.
 * 
 * @param card 
 * @returns List of four answers in random order
 * @author Robert Ni, Heather Guilfoyle
 */
export function randomizeAnswers(card: any): string[] {
  let allAnswers = card.multiAnswers.concat(card.correctAnswer);
  console.log('All Answers:', allAnswers)
  // allAnswers.push(card.correctAnswer)
  // console.log(allAnswers)
  let answers: string[] | undefined = [];
  let order: number[] = [];
  let ranNum: number = Math.floor(Math.random() * 4);
  while (order.length < 4) {
      if (!order.includes(ranNum)) {
          order.push(ranNum);
      }
      ranNum = Math.floor(Math.random() * 4);
  }

  let i: number = 0;
  while (answers.length < 4) {
      answers.push(allAnswers[order[i++]]);
  }

  console.log('Trimmed answers:',answers);

  return answers;
}

/**
 *  This function generates a list of wrong answers based on other cards in the list.
 * 
 * @param correctAnswer 
 * @param cardList 
 * @returns List of 3 wrong answers
 * @author Robert Ni, Sean Dunn
 */
export const generateWrongAnswers = (correctAnswer : any, cardList: any) => {
    let answers : string[] = [];
    //@ts-ignore
    cardList.forEach(newcard => {
      if (newcard.correctAnswer !== correctAnswer)
        answers.push(newcard.correctAnswer)
    });
    while (answers.length < 3) answers.push('Java');
    while (answers.length > 3) answers.pop();
    return answers;
}

export const generateRandom = (num: number) => {
    return Math.floor(Math.random() * num);
  };
