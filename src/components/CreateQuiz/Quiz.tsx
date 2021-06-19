import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createQuizState,
  nextCard,
  prevCard,
} from "../../StateSlices/CreateQuiz/createQuizSlice";

const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector(createQuizState);

  const handlePrev = () => {
    if (quizState.count > 0) {
      dispatch(prevCard());
    }
  };
  const handleNext = () => {
    if (quizState.count < quizState.quiz.length) {
      dispatch(nextCard());
    }
  };

  const checkAnswer = (e: any) => {
    if (e.currentTarget.id === "answer") {
      console.log("CORRECT!");
    } else {
      console.log("WRONG!");
    }
  };
  return (
    <>
      <Row>
        <Col>
          <Row>
            <Col>{quizState.quiz[quizState.count].question}</Col>
          </Row>
          {quizState.quiz[quizState.count].answers.map((key, value) => {
            let id = Object.keys(key).toString();
            return (
              <Row id={id} className="answer" onClick={checkAnswer} key={value}>
                <Col>{Object.values(key).toString()}</Col>
              </Row>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col></Col>
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
