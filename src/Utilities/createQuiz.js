var flashCard1 = {
    id: 1,
    question: "Who am I?",
    answer: "The best"
};
var flashCard2 = {
    id: 2,
    question: "what is for lunch?",
    answer: "burgers"
};
var flashCard3 = {
    id: 3,
    question: "Which color?",
    answer: "green"
};
var flashCard4 = {
    id: 4,
    question: "What are you wearing, Jake from statefarm?",
    answer: "Khakis"
};
var flashCard5 = {
    id: 5,
    question: "What is Java?",
    answer: "Programming Language"
};
var flashCard6 = {
    id: 6,
    question: "What is JavaScript?",
    answer: "Really Cool Programming Language"
};
var flashCard7 = {
    id: 7,
    question: "What is Python?",
    answer: "It is a snake"
};
var flashCard8 = {
    id: 8,
    question: "Where are your parents?",
    answer: "Right behind you"
};
var flashCard9 = {
    id: 9,
    question: "How Many Tacos, Sir?",
    answer: "I would like none, bring me a burrito"
};
var flashCard10 = {
    id: 10,
    question: "Have you eaten any apples today?",
    answer: "No, I have not"
};
// Create dummy flashcardSet
var studySet = [flashCard1, flashCard2, flashCard3, flashCard4, flashCard5, flashCard6, flashCard7, flashCard8, flashCard9, flashCard10];
var studySet2 = [flashCard1, flashCard2, flashCard3, flashCard4];
// Q: Which Color?
// A. Burgers
// B. The Best
// C. Green
// Correct answer: C
var createQuiz = function (studySet) {
    studySet.forEach(function (flashCard) {
        var newStudySet = studySet.filter(function (card) {
            if (card.question !== flashCard.question) {
                return card;
            }
            return null;
        });
        var wrongAnswerArray = [];
        var ranNum = generateRandom(newStudySet.length);
        while (wrongAnswerArray.length < 3) {
            if (!wrongAnswerArray.includes(newStudySet[ranNum].answer)) {
                wrongAnswerArray.push(newStudySet[ranNum].answer);
            }
            else {
                ranNum = generateRandom(newStudySet.length);
            }
        }
        var wrong1 = wrongAnswerArray[0];
        var wrong2 = wrongAnswerArray[1];
        var wrong3 = wrongAnswerArray[2];
        createQuizQuestion(flashCard, wrong1, wrong2, wrong3);
    });
};
var generateRandom = function (num) {
    return Math.floor(Math.random() * num);
};
var createQuizQuestion = function (flashCard, wrong1, wrong2, wrong3) {
    var question = {
        question: flashCard.question,
        answer: flashCard.answer,
        wrong1: wrong1,
        wrong2: wrong2,
        wrong3: wrong3
    };
    console.log("Generated Question: ", question);
};
createQuiz(studySet);
