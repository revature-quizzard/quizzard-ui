import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isLoaded,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";
import { studySet } from "../../Utilities/dummyData";
import { createQuiz } from "../../Utilities/createQuiz";

const CreateQuiz = () => {

    const handleClick = () => {
        
        console.log("clicked");
        createQuiz(studySet);
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button onClick={handleClick}>Click me</Button>
          <h1>TEST</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;
