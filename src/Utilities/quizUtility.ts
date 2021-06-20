// Create dummy flashcards
interface FlashCard {
  id: number;
  question: string;
  answer: string;
}

interface Question {
  question: string;
  answer: string;
  wrong1: string;
  wrong2: string;
  wrong3: string;
}

interface ScrambledQuestion {
  question: string;
  answers: Array<object>;
}

export const createQuiz = (studySet: Array<FlashCard>) => {
  let questionArray: Array<ScrambledQuestion> = [];
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
  let question: Question = {
    question: flashCard.question,
    answer: flashCard.answer,
    wrong1,
    wrong2,
    wrong3,
  };

  return answerChoiceRandomizer(question);
};

export const answerChoiceRandomizer = (question: any) => {
  let theQuestion = question.question;

  let allowed = ["answer", "wrong1", "wrong2", "wrong3"];

  let answerArray: Array<object> = [];

  let answers = allowed.reduce(
    (obj, key) => ({ ...obj, [key]: question[key] }),
    {}
  );

  for (const [key, value] of Object.entries(answers)) {
    answerArray.push({ [key]: value });
  }

  let ranNum: number = generateRandom(answerArray.length);

  let scrambledAnswerArray: Array<object> = [];

  while (scrambledAnswerArray.length < 4) {
    if (!scrambledAnswerArray.includes(answerArray[ranNum])) {
      scrambledAnswerArray.push(answerArray[ranNum]);
    } else {
      ranNum = generateRandom(answerArray.length);
    }
  }

  let scrambledQuestion: ScrambledQuestion = {
    question: theQuestion,
    answers: scrambledAnswerArray,
  };

  return scrambledQuestion;
};
