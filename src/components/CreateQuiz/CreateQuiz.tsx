import { Row, Col, Container } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  isLoading,
  isLoaded,
  createQuizState,
} from "../../StateSlices/CreateQuiz/createQuizSlice";
import { studySet, studySet2 } from "../../Utilities/dummyData";
import { createQuiz } from "../../Utilities/createQuiz";

const CreateQuiz = () => {

    
  
  return (
    <Container>
      <Row>
        <Col>
          <h1>TEST</h1>
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;
