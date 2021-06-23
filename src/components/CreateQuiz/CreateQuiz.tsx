import { Row, Col, Container, Card,Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  showQuiz,
  loadQuiz,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";
import { setOfSets } from "../../Utilities/dummyData";
import { createQuiz } from "../../Utilities/quizUtility";
import Quiz from "./Quiz";
import {Image} from "react-bootstrap";

let image = "https://i.imgur.com/XoL4zEI.png";

const CreateQuiz = () => { 
  interface FlashCard {
    id: number;
    question: string;
    answer: string;
  }

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
                {setOfSets.map((set: Array<FlashCard>, index: any) => {

                  return (
                    <Card style={{ width: '18rem' ,margin:'.4em' }}>
                    <Card.Img variant="top" as={Image} fluid={true} src={image} alt="Quiz Image" />
                    <Card.Body>
                      <Card.Title>Quiz {index + 1}</Card.Title>
                      <Card.Text>
                       
                       Subject {setOfSets[index][index].subject_id}
                      </Card.Text>
                      <Button onClick={goToQuiz}
                        key={index}
                        id={index}
                       > Go To Quiz</Button>
                    </Card.Body>
                  </Card>
                    // <Col
                    //   onClick={goToQuiz}
                    //   key={index}
                    //   id={index}
                    //   className="col-2 bg-dark text-light m-4"
                    // >
                    //   Set
                    // </Col>
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
