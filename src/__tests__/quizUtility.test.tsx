import {
  createQuiz,
  generateRandom
} from "../Utilities/quizUtility";

import { studySet } from "../Utilities/dummyData";

test("Generates random number between 0 and number passed in as argument", () => {
    const num = 4;
    const argArray = [0, 1, 2, 3];
    let ranNum: number = generateRandom(num);
  expect(argArray.includes(ranNum)).toBeTruthy();
});

test("creates 3 questions from study set containing 3 questions", () => {
    let createdQuiz = createQuiz(studySet);
    expect(createdQuiz.length).toBe(10);
});



