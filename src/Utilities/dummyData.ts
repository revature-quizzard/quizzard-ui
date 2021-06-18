// Create dummy flashcards
interface FlashCard {
  id: number;
  question: string;
  answer: string;
}

let flashCard1: FlashCard = {
  id: 1,
  question: "Who am I?",
  answer: "The best",
};
let flashCard2: FlashCard = {
  id: 2,
  question: "what is for lunch?",
  answer: "burgers",
};
let flashCard3: FlashCard = {
  id: 3,
  question: "Which color?",
  answer: "green",
};
let flashCard4: FlashCard = {
  id: 4,
  question: "What are you wearing, Jake from statefarm?",
  answer: "Khakis",
};
let flashCard5: FlashCard = {
  id: 5,
  question: "What is Java?",
  answer: "Programming Language",
};
let flashCard6: FlashCard = {
  id: 6,
  question: "What is JavaScript?",
  answer: "Really Cool Programming Language",
};
let flashCard7: FlashCard = {
  id: 7,
  question: "What is Python?",
  answer: "It is a snake",
};
let flashCard8: FlashCard = {
  id: 8,
  question: "Where are your parents?",
  answer: "Right behind you",
};
let flashCard9: FlashCard = {
  id: 9,
  question: "How Many Tacos, Sir?",
  answer: "I would like none, bring me a burrito",
};
let flashCard10: FlashCard = {
  id: 10,
  question: "Have you eaten any apples today?",
  answer: "No, I have not",
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
