import { Container, Row, Col, Form, Button } from "react-bootstrap"
import { isLoading, isLoaded, addFlashcard, flashcardsState } from "../../StateSlices/Flashcard/flashcardsSlice"
import { useDispatch, useSelector } from "react-redux";
import {useState} from "react"

interface Card {
  question: string;
  answer: string;
  reviewable: boolean;
  isPublic: boolean;
  subject: string;

}

const FlashCard = () => {
  const dispatch = useDispatch();
  const flashcards = useSelector(flashcardsState);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [reviewable, setReviewable] = useState(true);
  const [isPublic, setIsPublic] = useState(false);
  const [subject, setSubject] = useState("");


  const handleAddCard = () =>{
    let cardObj: Card = {
      question,
      answer,
      reviewable,
      isPublic,
      subject
    };
    dispatch(addFlashcard(cardObj));

    setQuestion("");
    setAnswer("");
  }


  return (
    <Container>
      <Row>
        <Col>
          <h1>FlashCard COMPONENT</h1>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group>
              <Form.Label>Question: </Form.Label>
              <Form.Control
                type="text"
                id="card-question"
                name="card-question"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
              ></Form.Control>
              <Form.Label>Answer: </Form.Label>
              <Form.Control
                type="text"
                id="card-answer"
                name="card-answer"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Label>Subject: </Form.Label>
              <Form.Control as="select" onChange={(e) => setSubject(e.target.value)}>
              <option value="">Select a subject...</option>
                <option value="Java">Java</option>
                <option value="Spring">Spring</option>
                <option value="Javascript">Javascript</option>
                <option value="React">React</option>
                <option value="DevOps">DevOps</option>
              </Form.Control>
              
            <Form.Check
              type="checkbox"
              label="Would you like to make this card public?"
              checked={isPublic}
              onChange={e => setIsPublic(e.target.checked)}
            ></Form.Check>
            <Button onClick={handleAddCard}>Create New Flashcard</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default FlashCard;
