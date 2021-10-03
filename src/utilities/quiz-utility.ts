/* Create quiz utility
    @author: EJ Best
    @author: Everett Diuguid
    6 / 19 / 2021
*/

import {SetFlashcardDTO} from "../models/flashcard";

interface Question {
  question: string;
  answer: string;
  wrong1: string;
  wrong2: string;
  wrong3: string;
}



export interface ScrambledQuestion {
  question: string;
  answers: Array<object>;
}

export const createQuiz = (studySet: Array<SetFlashcardDTO>) => {
  // Create an empty array for questions
  let questionArray: Array<ScrambledQuestion> = [];
  
  // Loop through each card in study set
  studySet.forEach((flashCard: SetFlashcardDTO) => {
    // Filter out the current target of the loop from the study set, creating a new study set array that does not include the current target of loop.
    let newStudySet = filterCurrentCard(flashCard, studySet);
    
    // Create empty array to store all answers from other cards in this particular study set
    // let wrongAnswerArray = createWrongAnswerArray(newStudySet);

    // Assign random wrong answers to variables to build question
    // let wrong1: string = wrongAnswerArray[0];
    // let wrong2: string = wrongAnswerArray[1];
    // let wrong3: string = wrongAnswerArray[2];

    // Push question to question array after being passed through createQuizQuestion and after answers have been placed in random order
    // questionArray.push(createQuizQuestion(flashCard, wrong1, wrong2, wrong3));
  });

  return questionArray;
};

// export const createWrongAnswerArray = (answers: string[]) => {
//     let  answerArray: string[] = [];
  
//     // Generate a random number based on length of the newStudySet array that does not include current target of loop, this random number will choose random wrong answers from pool of potential answers
//     let ranNum: number = generateRandom(answers.length);
  
//     // Build an array of potential wrong answers from all other answers in study set.
//   while (answerArray.length < 3) {
    
//     if (!answerArray.includes(answers[ranNum])) {
      
//       answerArray.push(answers[ranNum]);
      
//     } else {
      
//       ranNum = generateRandom(answers.length);
      
//       }
//     }
  
  
//   return answerArray;
// }

export const filterCurrentCard = (currentCard: SetFlashcardDTO, studySet: Array<SetFlashcardDTO>) => {
  
  return studySet.filter((card: SetFlashcardDTO) => {
      if (card.question !== currentCard.question) {
        return card;
      }
      return null;
    });

}

// Generates a random Number
export const generateRandom = (num: number) => {
  return Math.floor(Math.random() * num);
};

// Creates a question object that includes the question, answer, and three wrong answers gathered from other cards in Study set.
export const createQuizQuestion = (
  flashCard: SetFlashcardDTO,
  wrong1: string,
  wrong2: string,
  wrong3: string
) => {
  let question: Question = {
    question: flashCard.question,
    answer: flashCard.answer,
    wrong1,
    wrong2,
    wrong3,
  };

  // Sends question object to answerChoiceRandomizer to scrambled order of the answer choices.
  return answerChoiceRandomizer(question);
};

export const answerChoiceRandomizer = (question: any) => {
  // Store question for later use
  let theQuestion = question.question;

  // Array of keys used to filter the question out of the question object
  let allowed = ["answer", "wrong1", "wrong2", "wrong3"];

  // Create an empty answer array to store the right answer and three wrong answers filtered out of the question object
  let answerArray: Array<object> = [];

  // Filter the actual question out of the question object
  let answers = allowed.reduce(
    (obj, key) => ({ ...obj, [key]: question[key] }),
    {}
  );

  // Loop through question object, pushing the actual answer and the wrong answers to answerArray
  for (const [key, value] of Object.entries(answers)) {
    answerArray.push({ [key]: value });
  }

  //Generate a random number to randomize answer and wrong answer order.
  let ranNum: number = generateRandom(answerArray.length);

  // Create an empty array to store scramble wrong answers and answers.
  let scrambledAnswerArray: Array<object> = [];

  //Push randomized anwers and wrong answers to scrambledAnswerArray.
  while (scrambledAnswerArray.length < 4) {
    if (!scrambledAnswerArray.includes(answerArray[ranNum])) {
      scrambledAnswerArray.push(answerArray[ranNum]);
    } else {
      ranNum = generateRandom(answerArray.length);
    }
  }

  // Build scrambledQuestion object
  let scrambledQuestion: ScrambledQuestion = {
    question: theQuestion,
    answers: scrambledAnswerArray,
  };

  // Return to createQuiz function to be pushed to questionArray.
  return scrambledQuestion;
};
