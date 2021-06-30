import { Row, Col, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import {addPointsToUser} from "../../remote/update-info-service";
import {
  resetAll,
  hideResults,
  resultState, takeAnotherQuizResult,
} from "../../state-slices/create-quiz/result-slice";
import {
  hideQuiz,
  clearQuiz, takeAnotherQuizCreate,
} from "../../state-slices/create-quiz/create-quiz-slice";
import {useEffect} from "react";

const Results = () => {
  const dispatch = useDispatch();
  const results = useSelector(resultState);
  const history = useHistory();

  const handleClick = () => {
    dispatch(takeAnotherQuizCreate());
    dispatch(takeAnotherQuizResult());
    history.push("/study");
  };

  useEffect(() => {
    addPointsToUser({points: results.correct.length * 10})
  }, []);

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
              {((results.correct.length / results.total) * 100).toFixed(2)}%
            </h4>
          </Col>
        </Row>
        {/*<Row>*/}
        {/*  <Col>*/}
        {/*    <h4>*/}
        {/*      You got {results.incorrect.length} wrong...{" "}*/}
        {/*      {(((results.total - results.correct.length) / results.total) * 100).toFixed(2)}%*/}
        {/*    </h4>*/}
        {/*  </Col>*/}
        {/*</Row>*/}
        <Row>
          <Col>
            <h4>
              You have been awarded {results.correct.length * 10} points!
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
