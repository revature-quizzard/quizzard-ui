// Create dummy flashcards
interface FlashCard {
  id: number;
  subject_id: number;
  account_id: number;
  question: string;
  answer: string;
  reviewable: boolean;
  public: boolean;
};

let flashCard1: FlashCard = {
  id: 1,
  question: "Who am I?",
  answer: "The best",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true
};
let flashCard2: FlashCard = {
  id: 2,
  question: "what is for lunch?",
  answer: "burgers",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard3: FlashCard = {
  id: 3,
  question: "Which color?",
  answer: "green",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard4: FlashCard = {
  id: 4,
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard5: FlashCard = {
  id: 5,
  question: "What is Java?",
  answer: "Programming Language",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard6: FlashCard = {
  id: 6,
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard7: FlashCard = {
  id: 7,
  question: "What is Python?",
  answer: "It is a snake",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard8: FlashCard = {
  id: 8,
  question: "Where are your parents?",
  answer: "Right behind you",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard9: FlashCard = {
  id: 9,
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
};
let flashCard10: FlashCard = {
  id: 10,
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
  subject_id: 1,
  account_id: 1,
  reviewable: true,
  public: true,
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
export const studySet2 = [flashCard1, flashCard2, flashCard3, flashCard4];

export const setOfSets: Array<Array<FlashCard>> = [studySet, studySet2];
