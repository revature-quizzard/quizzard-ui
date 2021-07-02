import { Row, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  createQuizState,
  nextCard,
  prevCard,
} from "../../state-slices/create-quiz/create-quiz-slice";
import {
  setTotal,
  addAnswered,
  addCorrect,
  addIncorrect,
  resultState,
  showResults,
  resetAnswered,
} from "../../state-slices/create-quiz/result-slice";
import Results from "./Results";

const Quiz = () => {
  const dispatch = useDispatch();
  const quizState = useSelector(createQuizState);
  const results = useSelector(resultState);

  const handlePrev = () => {
    if (quizState.count > 0) {
      resetColors();
      dispatch(resetAnswered());
      dispatch(prevCard());
    }
  };
  const handleNext = () => {
    if (quizState.count < quizState.quiz.length - 1) {
      dispatch(setTotal(quizState.quiz.length));
      resetColors();
      dispatch(nextCard());
      dispatch(resetAnswered());
    } else if (quizState.count === quizState.quiz.length - 1) {
      dispatch(resetAnswered());
      dispatch(showResults());
    }
  };

  const resetColors = () => {
    let answer = document.getElementById("answer");
    let wrong1 = document.getElementById("wrong1");
    let wrong2 = document.getElementById("wrong2");
    let wrong3 = document.getElementById("wrong3");
    answer.style.color = "black";
    answer.style.fontWeight = "400";
    wrong1.style.color = "black";
    wrong1.style.fontWeight = "400";
    wrong2.style.color = "black";
    wrong2.style.fontWeight = "400";
    wrong3.style.color = "black";
    wrong3.style.fontWeight = "400";

  };

  const checkAnswer = (e: any) => {
    if (e.currentTarget.id === "answer") {
      let answerDiv: HTMLElement = document.getElementById(
        `${e.currentTarget.id}`
      );

      if (
        !results.answered.includes(quizState.count) &&
        !results.correct.includes(quizState.count)
      ) {
        dispatch(addAnswered(quizState.count));
        dispatch(addCorrect(quizState.count));
      }

      answerDiv.style.color = "green";
      answerDiv.style.fontWeight = "700";
      //answerDiv.style.fontSize = "30px";
    }
    if (
      e.currentTarget.id === "wrong1" ||
      e.currentTarget.id === "wrong2" ||
      e.currentTarget.id === "wrong3"
    ) {
      let wrongChoice: HTMLElement = document.getElementById(
        `${e.currentTarget.id}`
      );

      if (
        !results.answered.includes(quizState.count) &&
        !results.incorrect.includes(quizState.count)
      ) {
        dispatch(addAnswered(quizState.count));
        dispatch(addIncorrect(quizState.count));
      }

      wrongChoice.style.color = "red";
      wrongChoice.style.fontWeight = "700";
    }
  };
  return (
    <>
      {results.showResults ? (
        <Results />
      ) : (
        <Row className="d-flex justify-content-center align-items-center p-4">
          <Col className="">
            <Row>
              <Col className="d-flex justify-content-center question">
                {quizState.quiz[quizState.count].question}
              </Col>
            </Row>
            {quizState.quiz[quizState.count].answers.map((key, value) => {
              let id = Object.keys(key).toString();
              return (
                <Row
                  id={id}
                  className="answer"
                  onClick={!results.isAnswered ? checkAnswer : null}
                  key={value}
                >
                  <Col>{String.fromCharCode(65+value)})   {Object.values(key).toString()}</Col>
                </Row>
              );
            })}
          </Col>
        </Row>
      )}

      {!results.showResults && (
        <div className="bottomRow">
          <div onClick={handlePrev} className="btn-prev">
            &lt;
          </div>
          <div onClick={handleNext} className="btn-next">
            &gt;
          </div>
        </div>
      )}
    </>
  );
};

export default Quiz;
