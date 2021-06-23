// Create dummy flashcards
<<<<<<< HEAD
// interface FlashCard {
//   id: number;
//   subject_id: number;
//   account_id: number;
//   question: string;
//   answer: string;
//   reviewable: boolean;
//   public: boolean;
// };

import { Flashcard } from "../Models/Flashcard";
=======
interface FlashCard {
  id: number;
  subject_id: number;
  account_id: number;
  question: string;
  answer: string;
  reviewable: boolean;
  isPublic: boolean;
};
>>>>>>> createQuiz/everett-ej

let flashCard1: Flashcard = {
  question: "Who am I?",
  answer: "The best",
  subjectId: "",
  reviewable: true,
  isPublic: true
};
let flashCard2: Flashcard = {
  question: "what is for lunch?",
  answer: "burgers",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard3: Flashcard = {
  question: "Which color?",
  answer: "green",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard4: Flashcard = {
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard5: Flashcard = {
  question: "What is Java?",
  answer: "Programming Language",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard6: Flashcard = {
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard7: Flashcard = {
  question: "What is Python?",
  answer: "It is a snake",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard8: Flashcard = {
  question: "Where are your parents?",
  answer: "Right behind you",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard9: Flashcard = {
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard10: Flashcard = {
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
  subjectId: "",
  reviewable: true,
  isPublic: true,
};
let flashCard11: FlashCard = {
  id: 11,
  question: "What's 5 + 10?",
  answer: "21",
  subject_id: 5,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard12: FlashCard = {
  id: 12,
  question: "What should you apply directly to your forehead?",
  answer: "Head on!",
  subject_id: 5,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard13: FlashCard = {
  id: 13,
  question: "Fanta fanta, dont you wanta?",
  answer: "No...I actually dont wanta..",
  subject_id: 5,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard14: FlashCard = {
  id: 14,
  question: "How many licks does it take to get to the center of a Tootsie Pop?",
  answer: "*licks* One...*licks* Two...",
  subject_id: 5,
  account_id: 1,
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
export const studySet2 = [ flashCard11, flashCard12, flashCard13, flashCard14];

export const setOfSets: Array<Array<Flashcard>> = [studySet, studySet2];
