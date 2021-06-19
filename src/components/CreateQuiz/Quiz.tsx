import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createQuizState,
  isLoading,
  isLoaded,
  nextCard,
  prevCard,
} from "../../StateSlices/CreateQuiz/createQuizSlice";

const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector(createQuizState);

  const handlePrev = () => {
    if (quizState.count >= 0) {
      dispatch(prevCard());
    }
  };
  const handleNext = () => {
    if (quizState.count <= quizState.quiz.length) {
      dispatch(nextCard());
    }
  };
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>{quizState.quiz[quizState.count].question}</Col>
          </Row>
          <Row>
            <Col>{quizState.quiz[quizState.count].wrong1}</Col>
          </Row>
          <Row>
            <Col>{quizState.quiz[quizState.count].wrong2}</Col>
          </Row>
          <Row>
            <Col>{quizState.quiz[quizState.count].wrong3}</Col>
          </Row>
          <Row>
            <Col>{quizState.quiz[quizState.count].answer}</Col>
          </Row>
        </Col>
      </Row>

      <div className="bottomRow">
        <div onClick={handlePrev} className="btn-prev">
          &lt;
        </div>
        <div onClick={handleNext} className="btn-next">
          &gt;
        </div>
      </div>
    </>
  );
};

export default Quiz;
