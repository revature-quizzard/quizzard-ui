import {
  createQuiz,
  generateRandom,
  createQuizQuestion,
  answerChoiceRandomizer,
  FlashCard,
  Question,
  ScrambledQuestion,
  createWrongAnswerArray,
  filterCurrentCard
} from "../Utilities/quizUtility";


let flashCard1 : FlashCard;
let flashCard2 : FlashCard;
let flashCard3:  FlashCard;
let studySet: Array<FlashCard>;

beforeEach(() => {
  flashCard1 = {
  id: 1,
  question: "Who am I?",
  answer: "The best",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true
  };
  flashCard2 = {
  id: 2,
  question: "what is for lunch?",
  answer: "burgers",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
  };
  flashCard3 = {
  id: 3,
  question: "Which color?",
  answer: "green",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};

studySet = [flashCard1, flashCard2, flashCard3];
})

afterEach(() => {
  flashCard1 = null;
  flashCard2 = null;
  flashCard3 = null;
  studySet = null;
})
  
test("Generates random number between 0 and number passed in as argument", () => {

    const num = 4;
    const argArray = [0, 1, 2, 3];

    let ranNum: number = generateRandom(num);

    expect(argArray.includes(ranNum)).toBeTruthy();

});

test("creates 3 questions from study set containing 3 questions", () => {
  let createdQuiz = createQuiz(studySet);
 
    expect(createdQuiz.length).toBe(3);
 
});



