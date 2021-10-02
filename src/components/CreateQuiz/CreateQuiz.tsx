import { Row, Col, Container, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  showQuiz,
  loadQuiz,
  createQuizState,
} from "../../state-slices/create-quiz/create-quiz-slice";
import { createQuiz } from "../../utilities/quiz-utility";
import Quiz from "./Quiz";
import { studySetState } from "../../state-slices/study-set/study-set-slice";

const CreateQuiz = () => {
  const studySet = useSelector(studySetState);
  const dispatch = useDispatch();
  const quizState = useSelector(createQuizState);
  const goToQuiz = (e: any) => { 
    //dispatch(loadQuiz(createQuiz(studySet.availablePublicStudySets[e.target.name].cards)));
   // dispatch(loadQuiz(createQuiz(studySet.selectedStudySet.cards)));
    dispatch(showQuiz());
  };

  return (
    <Container>
      <Row className="d-flex justify-content-center align-content-center mt-4">
        <Col style={{ height: "80vh", marginBottom: "2rem" }} className="bg-light d-flex flex-column justify-content-start align-items-center" lg={10}>
          {quizState.showQuiz ? (
            <Quiz />
          ) : (
              <>
                <Button type="submit" onClick={goToQuiz} >Start!</Button>
              </>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default CreateQuiz;


// <>
//   <Row>
//     <Col
//         style={{ height: "50px" }}
//         className="d-block bg-dark text-light"
//     >
//       <h4 className="mt-2">Available Quizzes</h4>{" "}
//     </Col>
//   </Row>
//   <Row className="p-4">
//     {studySet.availablePublicStudySets.map((set: any, index: any) => {
//       let id = "go-to-quiz-" + {index};
//       return (
//           <Card style={{ width: '18rem' ,margin:'.4em' }}>
//             <Card.Img variant="top" as={Image} fluid={true} src="https://i.imgur.com/XoL4zEI.png" alt="Quiz Image" />
//             <Card.Body>
//               <Card.Title>Quiz {index + 1}</Card.Title>
//               <Card.Text>
//
//                 Subject: {studySet.availablePublicStudySets[index].name}
//               </Card.Text>
//
//               <Button name = {index} onClick={goToQuiz}
//                       key={index}
//
//                       id={id}
//
//               > Go To Quiz</Button>
//             </Card.Body>
//           </Card>
//       );
//     })}
//   </Row>
// </>