// Create dummy flashcards
interface FlashCard {
  id: number;
  question: string;
  answer: string;
}

let questionArray: any[] = [];
export const createQuiz = (studySet: any[]) => {

  studySet.forEach((flashCard: FlashCard) => {
    
    let newStudySet = studySet.filter((card: FlashCard) => {
      if (card.question !== flashCard.question) {
        return card;
      }
      return null;
    });
   
    let wrongAnswerArray: string[] = [];

    let ranNum: number = generateRandom(newStudySet.length);

    while (wrongAnswerArray.length < 3) {
      if (!wrongAnswerArray.includes(newStudySet[ranNum].answer)) {
        wrongAnswerArray.push(newStudySet[ranNum].answer);
      } else {
        ranNum = generateRandom(newStudySet.length);
      }
    }

    let wrong1: string = wrongAnswerArray[0];
    let wrong2: string = wrongAnswerArray[1];
    let wrong3: string = wrongAnswerArray[2];

    questionArray.push(createQuizQuestion(flashCard, wrong1, wrong2, wrong3));
  });
    console.log("questionArray: ", questionArray);
    return questionArray;
};

const generateRandom = (num: number) => {
  return Math.floor(Math.random() * num);
};

const createQuizQuestion = (
  flashCard: FlashCard,
  wrong1: string,
  wrong2: string,
  wrong3: string
) => {
  let question = {
    question: flashCard.question,
    answer: flashCard.answer,
    wrong1,
    wrong2,
    wrong3,
    };
    
    return question;
};




