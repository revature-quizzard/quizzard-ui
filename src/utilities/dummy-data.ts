import { FlashcardDTO } from "../models/flashcard";

let flashCard1: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "Who am I?",
  answer: "The best",
  subjectId: 0,
  reviewable: true,
  isPublic: true
};
let flashCard2: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "what is for lunch?",
  answer: "burgers",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard3: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "Which color?",
  answer: "green",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard4: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard5: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What is Java?",
  answer: "Programming Language",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard6: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard7: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What is Python?",
  answer: "It is a snake",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard8: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "Where are your parents?",
  answer: "Right behind you",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard9: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard10: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard11: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What's 5 + 10?",
  answer: "21",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard12: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "What should you apply directly to your forehead?",
  answer: "Head on!",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard13: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "Fanta fanta, dont you wanta?",
  answer: "No...I actually dont wanta..",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};
let flashCard14: FlashcardDTO = {
  id: 0,
  accountId: 0,
  question: "How many licks does it take to get to the center of a Tootsie Pop?",
  answer: "*licks* One...*licks* Two...",
  subjectId: 0,
  reviewable: true,
  isPublic: true,
};

// Create dummy flashcardSet
export const studySet = [
  flashCard1,
  flashCard2,
  flashCard3,
  flashCard4,
  flashCard5,
  flashCard6,
  flashCard7,
  flashCard8,
  flashCard9,
  flashCard10,
];
export const studySet2 = [flashCard11, flashCard12, flashCard13, flashCard14];

export const setOfSets: Array<Array<FlashcardDTO>> = [studySet, studySet2];
