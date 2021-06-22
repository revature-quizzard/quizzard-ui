import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {
  resetAll,
  hideResults,
  resultState,
} from "../../StateSlices/CreateQuiz/resultSlice";
import {
  hideQuiz,
  clearQuiz,
} from "../../StateSlices/CreateQuiz/createQuizSlice";

const Results = () => {
  const dispatch = useDispatch();
  const results = useSelector(resultState);
  const history = useHistory();

  const handleClick = () => {
    dispatch(resetAll());
    dispatch(clearQuiz());
    dispatch(hideResults());
    dispatch(hideQuiz());
    history.push("/createQuiz");
  };

  return (
    <Row>
      <Col>
        <Row>
          <Col>
            <h1>Congratulations! You have completed this quiz!</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h3> You answered {results.answered.length} questions.</h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>
              You got {results.correct.length} right!{" "}
              {(results.correct.length / results.total) * 100}%
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <h4>
              You got {results.incorrect.length} wrong...{" "}
              {(results.incorrect.length / results.total) * 100}%
            </h4>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button onClick={handleClick}>Take a Different Quiz!</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default Results;
