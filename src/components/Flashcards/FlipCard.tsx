import { Button, Card, Col, Container, Row } from "react-bootstrap";
import ReactCardFlip from "react-card-flip";
import {
  flashcardsState,
  prevCard,
  nextCard,
  resetCount,
  setFlashcards,
  isLoaded,
} from "../../state-slices/flashcard/flashcard-slice";
import {
  subjectsState,
  setSubjects,
} from "../../state-slices/subject/subject-slice";
import { useDispatch, useSelector } from "react-redux";
import { getSubs } from "../../remote/subject-service";
import { getCards } from "../../remote/card-service";
import { useState, useEffect } from "react";

/**
 * FlipCard component renders a flippable card and two arrows that allow you to navigate existing cards
 * @returns FlipCard
 * @author 'Kevin Chang'
 * @author 'Giancarlo Tomasello'
 */
export const FlipCard = () => {
  const [isEnd, setIsEnd] = useState(false);
  const [isCardFlipped, setIsCardFlipped] = useState(false);

  const dispatch = useDispatch();
  const flashcards = useSelector(flashcardsState);

  /**
   * Acquires the current cards and subejcts that already exist in the database.
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  useEffect(() => {
    console.log("populate flashcards");

    // const getFlashcards = async () => {
    //   let cards = await getCards();
    //   dispatch(setFlashcards(cards));
    // };
    // getFlashcards();

    const getSubjects = async () => {
      let subjects = await getSubs();
      dispatch(setSubjects(subjects));
    };
    getSubjects();
    dispatch(isLoaded());
  }, []);

  /**
   * Dispatches prevCard reducer to decrease count by 1, resets setIsEnd and setIsCardFlipped to false
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handlePrev = () => {
    if (flashcards.count > 0) {
      dispatch(prevCard());
      setIsCardFlipped(false);
      setIsEnd(false);
    }
  };

  /**
   * Dispatches nextCard reducer to increase count by 1 and handles isCardFlipped and calls handleEnd if at the end of the array
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleNext = () => {
    if (flashcards.count < flashcards.flashCards.length - 1) {
      //   dispatch(setTotal(quizState.quiz.length));
      setIsCardFlipped(false);
      console.log(flashcards.count);
      console.log(flashcards.flashCards.length);
      dispatch(nextCard());
    } else if (flashcards.count === flashcards.flashCards.length - 1) {
      dispatch(nextCard());
      setIsCardFlipped(false);
      handleEnd();
    }
  };

  /**
   * Sets isEnd to true
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleEnd = () => {
    setIsEnd(true);
  };

  /**
   * Resets count to 0 and makes sure the isEnd state is set to false
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleReset = () => {
    dispatch(resetCount());
    setIsEnd(false);
  };

  /**
   * Toggles isCardFlipped state
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleClick = () => {
    setIsCardFlipped(!isCardFlipped);
  };

  const handleStart = () => {
    dispatch(isLoaded());
  };

  /**
   * Creates a renderable card that signifies the end of the array of Flashcards
   * @returns The end of the card
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const renderEnd = () => {
    return (
      <>
        <Card className="end-card">
          <Card.Body>
            <Card.Subtitle>End of Flashcards</Card.Subtitle>
          </Card.Body>
          <Card.Footer className="text-center">
            <Button onClick={handleReset}> Back to Start </Button>
          </Card.Footer>
        </Card>
      </>
    );
  };

  /**
   * Renders a flippable card based on the current flashcard based on its count state
   * @returns The current card
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const renderFlipCard = () => {
    return (
      <>
        {flashcards.isLoaded ? (
          <Container className="flip-card">
            <ReactCardFlip isFlipped={isCardFlipped} flipDirection="horizontal">
              <Card className="question-card">
                <Card.Body className="text-center">
                  {flashcards.flashCards[flashcards.count].question}
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button onClick={handleClick} block>
                    Check Answer
                  </Button>
                </Card.Footer>
              </Card>

              <Card className="answer-card">
                <Card.Body className="text-center">
                  {flashcards.flashCards[flashcards.count].answer}
                </Card.Body>
                <Card.Footer className="text-center">
                  <Button onClick={handleClick} block>
                    Back
                  </Button>
                </Card.Footer>
              </Card>
            </ReactCardFlip>
          </Container>
        ) : (
          <Button className="start-button" onClick={handleStart}>
            Start Studying
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Container className="justify-content-center">
        <Row>
          <Col className="d-flex justify-content-center question" style={{}}>
            {!isEnd ? <Row>{renderFlipCard()}</Row> : <Row>{renderEnd()}</Row>}
          </Col>
        </Row>

        <Row className="d-flex justify-content-center question text-center">
          {
            <Row className="bottomRow">
              <Col xs={6} md={6} lg={6}>
                <div onClick={handlePrev} className="btn-prev">
                  &lt; Prev
                </div>
              </Col>
              <Col xs={6} md={6} lg={6}>
                <div onClick={handleNext} className="btn-next">
                  Next &gt;
                </div>
              </Col>
            </Row>
          }
        </Row>
      </Container>
    </>
  );
};
