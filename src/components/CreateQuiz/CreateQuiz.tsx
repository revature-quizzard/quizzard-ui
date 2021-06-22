import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  showQuiz,
  loadQuiz,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";
import { setOfSets } from "../../Utilities/dummyData";
import { createQuiz } from "../../Utilities/quizUtility";
import Quiz from "./Quiz";
import { Flashcard } from "../../Models/Flashcard";

const CreateQuiz = () => {
 

  const dispatch = useDispatch();

  const quizState = useSelector(createQuizState);

  const goToQuiz = (e: any) => {
    dispatch(loadQuiz(createQuiz(setOfSets[e.target.id])));
    dispatch(showQuiz());
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-content-center mt-4">
        <Col style={{ height: "80vh" }} className="bg-light" lg={10}>
          {quizState.showQuiz ? (
            <Quiz />
          ) : (
            <>
              <Row>
                <Col
                  style={{ height: "50px" }}
                  className="d-block bg-dark text-light"
                >
                  <h4 className="mt-2">Available Quizzes</h4>{" "}
                </Col>
              </Row>
              <Row className="p-4">
                {setOfSets.map((set: Array<Flashcard>, index: any) => {
                  return (
                    <Col
                      onClick={goToQuiz}
                      key={index}
                      id={index}
                      className="col-2 bg-dark text-light m-4"
                    >
                      Set
                    </Col>
                  );
                })}
              </Row>
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;
