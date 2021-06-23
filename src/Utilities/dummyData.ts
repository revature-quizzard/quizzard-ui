// Create dummy flashcards
interface FlashCard {
  id: number;
  subject_id: number;
  account_id: number;
  question: string;
  answer: string;
  reviewable: boolean;
  isPublic: boolean;
};

let flashCard1: FlashCard = {
  id: 1,
  question: "Who am I?",
  answer: "The best",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true
};
let flashCard2: FlashCard = {
  id: 2,
  question: "what is for lunch?",
  answer: "burgers",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard3: FlashCard = {
  id: 3,
  question: "Which color?",
  answer: "green",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard4: FlashCard = {
  id: 4,
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard5: FlashCard = {
  id: 5,
  question: "What is Java?",
  answer: "Programming Language",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard6: FlashCard = {
  id: 6,
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard7: FlashCard = {
  id: 7,
  question: "What is Python?",
  answer: "It is a snake",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard8: FlashCard = {
  id: 8,
  question: "Where are your parents?",
  answer: "Right behind you",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard9: FlashCard = {
  id: 9,
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  isPublic: true,
};
let flashCard10: FlashCard = {
  id: 10,
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
  subject_id: 1,
  account_id: 1,
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

export const setOfSets: Array<Array<FlashCard>> = [studySet, studySet2];
