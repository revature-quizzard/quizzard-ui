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
import { studySet } from "../Utilities/dummyData"; 


let flashCard1 : FlashCard;
let flashCard2 : FlashCard;
let flashCard3:  FlashCard;

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


// studySet = [flashCard1, flashCard2, flashCard3];
})

afterEach(() => {
  flashCard1 = null;
  flashCard2 = null;
  flashCard3 = null;
  //studySet = null;
})
  
test("Generates random number between 0 and number passed in as argument", () => {

    const num = 4;
    const argArray = [0, 1, 2, 3];

    let ranNum: number = generateRandom(num);

    expect(argArray.includes(ranNum)).toBeTruthy();

});

const dummyData = require('../Utilities/dummyData');

const quizUtility = require('../Utilities/quizUtility'); 

test('creates 3 questions from studySet',()=>{
    expect(createQuiz(studySet)).toBeTruthy();
});

test('create quiz question',()=>{
  let questionArray = createQuiz([]);
  expect(createQuizQuestion(flashCard1, "wrong1", "wrong2", "wrong3")).toBeTruthy();
});
test('answerChoiceRandomizer',()=>{
  expect(answerChoiceRandomizer(flashCard1.question)).toBeTruthy();
});

//filters currCard for Quiz Component
test('Filter Current Card',()=>{
  expect(filterCurrentCard(flashCard1,studySet)).toBeTruthy();
});
test('Filter Current Card, Check Length',()=>{
  let filteredArray = filterCurrentCard(flashCard1,studySet);
  expect(filteredArray.length).toBe(9);
});
//wrong answer array test
test('createWrongAnswerArray',()=>{
  expect(createWrongAnswerArray(studySet)).toBeTruthy();
});
test('Check length of wrong Answer Array',()=>{
  let answerArray = createWrongAnswerArray(studySet);
  expect(answerArray.length).toBe(3);
});



