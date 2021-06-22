import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import ReactCardFlip from 'react-card-flip';
import { flashcardsState, prevCard, nextCard, resetCount, setFlashcards} from "../../StateSlices/Flashcard/flashcardsSlice"
import { setSubjects, subjectsState } from "../../StateSlices/Subject/subjectsSlice"
import { useDispatch, useSelector } from "react-redux";
import {useEffect, useState} from "react";
import { getSubs } from "../../remote/subjectService";
import { createCard, getCards } from "../../remote/cardService";


export const FlipCard = () =>{
    // useEffect(()=> {
    //     console.log("FLIPCARD populate flashcards")
       
    //     const getFlashcards = async () => {
    //       let cards = await getCards();
    //       dispatch(setFlashcards(cards))
    //     };
    //     getFlashcards();
    
    //     const getSubjects = async () => {
    //       let subjects = await getSubs();
    //       dispatch(setSubjects(subjects));
    //     }
    //     getSubjects();
    
    //   }, [])
      
    const [isEnd, setIsEnd] = useState(false);
    const [isCardFlipped, setIsCardFlipped] = useState(false);

    const dispatch = useDispatch();
    const flashcards = useSelector(flashcardsState);
    const subjects = useSelector(subjectsState);


    const handlePrev = () => {
        if (flashcards.count > 0) {
          dispatch(prevCard());
          setIsCardFlipped(false);
          setIsEnd(false);
        }
    };

      
  const handleNext = () => {
    if (flashcards.count < flashcards.flashCards.length - 1) {
    //   dispatch(setTotal(quizState.quiz.length));
      setIsCardFlipped(false);
      console.log(flashcards.count);
      console.log(flashcards.flashCards.length);
      dispatch(nextCard());
    } else if (flashcards.count === flashcards.flashCards.length - 1){
      dispatch(nextCard());
      setIsCardFlipped(false);
      handleEnd();
    }
  };

  const handleEnd = () =>{
      setIsEnd(true);
  }

  const handleReset = () =>{
    dispatch(resetCount());
    setIsEnd(false);
  }

  const renderEnd = () =>{
      return(
          <>
          <Card>
              <Card.Header>
                  
              </Card.Header>
              <Card.Body>
                  <Card.Subtitle>
                    End of Flashcards
                  </Card.Subtitle>
              </Card.Body>
              <Card.Footer>
                <Button onClick={handleReset}> Start from beginning! </Button>
              </Card.Footer>
          </Card>
          </>
      )
  }

  const renderFlipCard = () => {
      return(
          <>
            <ReactCardFlip isFlipped={isCardFlipped} flipDirection="horizontal">
                <Card>
                    <Card.Header className="text-center">Question</Card.Header>
                    {flashcards.flashCards[flashcards.count].question}
                    <Card.Footer className="text-center"><button onClick={handleClick}>Click to flip</button></Card.Footer>
                    
                </Card>

                <Card >
                    <Card.Header className="text-center">
                        Answer
                    </Card.Header>
                    <Card.Body className="text-center">
                        {flashcards.flashCards[flashcards.count].answer}
                    </Card.Body>
                    
                    <Card.Footer className="text-center"><button onClick={handleClick}>Click to flip</button></Card.Footer>                    
                </Card>
                        
            </ReactCardFlip>
        </>
      )
  }
       
    const handleClick = () =>{
        setIsCardFlipped(!isCardFlipped);
    }

    return(
        <>
            <Container className="justify-content-center">
                <Row>
                <Col className="d-flex justify-content-center question" style={{}}>
                    {!isEnd ? <Row>{renderFlipCard()}</Row> : <Row>{renderEnd()}</Row>}
                </Col>
                </Row>

                <Row className="d-flex justify-content-center question text-center">
                    
                    {(
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
                    )}
                    
                </Row>
            </Container>
        </>
    )
};
