import { Container, Row, Col, Form, Button, CardDeck, Card} from "react-bootstrap"
import { isLoading, isLoaded, addFlashcard, setFlashcards, flashcardsState } from "../../StateSlices/Flashcard/flashcardsSlice"
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react"
import { createCard, getCards } from "../../remote/cardService";

interface Flashcard {
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

  //This will call the axios function every frame. Might need to find a different way
  useEffect(()=> {
    console.log("populate flashcards")
   
    const getData = async () => {
      let cards = await getCards();
      dispatch(setFlashcards(cards))
    };
    getData();

  }, [])


  const handleAddCard = async () =>{
    let cardObj: Flashcard = {
      question,
      answer,
      reviewable,
      isPublic,
      subject
    };

    console.log("Subject: " + cardObj.subject)
    let test = await createCard(cardObj.question, cardObj.answer, cardObj.reviewable, cardObj.isPublic, cardObj.subject);
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
                <option value= "1">Java</option>
                {/* <option value="Spring">Spring</option>
                <option value="Javascript">Javascript</option>
                <option value="React">React</option>
                <option value="DevOps">DevOps</option> */}
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
      <Row>

          <CardDeck>
            {flashcards.flashCards.map((card) => {
              return (
                <Card className = " ">
                    <Card.Header>card.question</Card.Header>
                </Card>
              )
            })}
          </CardDeck>

      </Row>
    </Container>
  );
};

export default FlashCard;
