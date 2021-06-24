import { Flashcard } from "../Models/Flashcard";

let flashCard1: Flashcard = {
  question: "Who am I?",
  answer: "The best",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true
};
let flashCard2: Flashcard = {
  question: "what is for lunch?",
  answer: "burgers",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard3: Flashcard = {
  question: "Which color?",
  answer: "green",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard4: Flashcard = {
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard5: Flashcard = {
  question: "What is Java?",
  answer: "Programming Language",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard6: Flashcard = {
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard7: Flashcard = {
  question: "What is Python?",
  answer: "It is a snake",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard8: Flashcard = {
  question: "Where are your parents?",
  answer: "Right behind you",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard9: Flashcard = {
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard10: Flashcard = {
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
  subjectId: "Random Trivia",
  reviewable: true,
  isPublic: true,
};
let flashCard11: Flashcard = {
 
  question: "What's 5 + 10?",
  answer: "21",
  subjectId: "Tiktok + Commercials",
  reviewable: true,
  isPublic: true,
};
let flashCard12: Flashcard = {

  question: "What should you apply directly to your forehead?",
  answer: "Head on!",
  subjectId: "Tiktok + Commercials",
  reviewable: true,
  isPublic: true,
};
let flashCard13: Flashcard = {

  question: "Fanta fanta, dont you wanta?",
  answer: "No...I actually dont wanta..",
  subjectId: "Tiktok + Commercials",
  reviewable: true,
  isPublic: true,
};
let flashCard14: Flashcard = {
 
  question: "How many licks does it take to get to the center of a Tootsie Pop?",
  answer: "*licks* One...*licks* Two...",
  subjectId: "Tiktok + Commercials",
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

export const setOfSets: Array<Array<Flashcard>> = [studySet, studySet2];
