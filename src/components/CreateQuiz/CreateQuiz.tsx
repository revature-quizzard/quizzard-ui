import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isLoaded,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";

const CreateQuiz = () => {
  // Create dummy flashcards
  const flashCard1 = {
    question: "Who am I?",
    answer: "The best",
  };
  const flashCard2 = {
    question: "what is for lunch?",
    answer: "burgers",
  };
  const flashCard3 = {
    question: "Which color?",
    answer: "green",
  };

    // Create dummy flashcardSet
  const studySet = [flashCard1, flashCard2, flashCard3];

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
