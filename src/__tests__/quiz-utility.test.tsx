import {
  createQuiz,
  generateRandom,
  createQuizQuestion,
  answerChoiceRandomizer,
  createWrongAnswerArray,
  filterCurrentCard
} from '../utilities/quiz-utility';
import { studySet } from "../utilities/dummy-data";
import { Flashcard } from "../models/flashcard";

let flashCard1 : Flashcard;
let flashCard2 : Flashcard;
let flashCard3:  Flashcard;

beforeEach(() => {
  flashCard1 = {
    question: "Who am I?",
    answer: "The best",
    subjectId: "",
    reviewable: true,
    isPublic: true
  };
  flashCard2 = {
    question: "what is for lunch?",
    answer: "burgers",
    subjectId: "",
    reviewable: true,
    isPublic: true,
  };
  flashCard3 = {
    question: "Which color?",
    answer: "green",
    subjectId: "",
    reviewable: true,
    isPublic: true,
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

test('creates 3 questions from studySet',()=>{
    expect(createQuiz(studySet)).toBeTruthy();
});

test('create quiz question',()=>{

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
