/**
 *  works with GraphQL to set up Answers for game 
*/



//build an array of 3 incorrect answers
export const createWrongAnswerArray = (answers: string[]) => {
    let  answerArray: string[] = [];
  
    // Generate a random number based on length of the answers array that does not include current target of loop, 
    //this random number will choose random wrong answers from pool of potential answers
    let ranNum: number = generateRandom(answers.length);
  
    // Build an array of potential wrong answers from all other answers in study set.
  while (answerArray.length < 3) {
    
    if (!answerArray.includes(answers[ranNum])) {
      
      answerArray.push(answers[ranNum]);
      
    } else {
      
      ranNum = generateRandom(answers.length);
      
      }
    }
  
  
  return answerArray;
}

export const generateWrongAnswers = (card: any, questions: Array<string>) => {
    let listAnswers: Array<string>;
    do {
        listAnswers = createWrongAnswerArray(questions);
    } while (listAnswers.includes(card.correctAnswer));
    listAnswers.push(card.correctAnswer);
    return listAnswers;
}

export const generateRandom = (num: number) => {
    return Math.floor(Math.random() * num);
  };
//@ts-ignore
export const randomizeAnswers = (card): string[] => {
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
        answers.push(card.multiAnswers[order[i++]]);
    }

    console.log(answers);

    return answers;
}