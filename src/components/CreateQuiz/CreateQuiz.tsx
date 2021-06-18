import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isLoaded,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";

const CreateQuiz = () => {
  // Create dummy flashcards
    interface FlashCard{

        id: number,
        question: string,
        answer: string,
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
    id:4,
    question: "What are you wearing, Jake from statefarm?",
    answer: "Khakis",
    };
    

    // Create dummy flashcardSet
    const studySet = [flashCard1, flashCard2, flashCard3, flashCard4];
    const studySet2 = [flashCard1, flashCard2, flashCard3, flashCard4];
    
    // Q: Which Color?
    // A. Burgers
    // B. The Best
    // C. Green
    // Correct answer: C

    const createQuiz = (studySet:any) => {
        //for each card in study set //create quiz questions
        //callcreateQuizQuestion(flashcard)

        //Generate WRONG ANSWERS BLOCK
         //string wrongAnswer1 = flashcard[randomnUMgENRATOR].getAnswer()
         //quizWrongAnswer1. flashcard[randomnUMgENRATOR].answer()
         //quizWrongAnswer1. flashcard[randomnUMgENRATOR].answer()
        //createQuizQuestions (currFlashcard,wrongAns1, wrongAns2,wrongAns3)

        let wrong1: string = studySet[Math.floor(Math.random() * studySet.length)].answer;
        let wrong2: string = studySet[Math.floor(Math.random() * studySet.length)].answer;
        let wrong3: string = studySet[Math.floor(Math.random() * studySet.length)].answer;

        studySet.forEach((flashCard:FlashCard) => {
            createQuizQuestion(flashCard, wrong1, wrong2,wrong3);
        })
       
        
    }
    const createQuizQuestion = (flashCard:FlashCard, wrong1:string,wrong2:string, wrong3:string) => {
        let question = {
            question: flashCard.question,
            answer: flashCard.answer,
            wrong1,
            wrong2,
            wrong3
        }
        
      }
    //QuizQuestion: currentFlashcardid.question
        //quizCorrectAnswer: currentFlashcardid
        //return quiz questions
       

    }
    const randomNumGenerator = (flashcardId) => {
        //JSRandom generatorF = 0
        //JSRandom generatorC = studyset.length;
        //extra logic to exclude currentFLASHCardId
        
    }

    

    

    const createdQuiz = [[studySet], [studySet2]];

  return (
    <Container>
      <Row>
        <Col>
          <h1>TEST</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;
