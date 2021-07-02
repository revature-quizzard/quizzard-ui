
import { Button, Col, Row } from "react-bootstrap";
import AddFlashcardModal from "./AddFlashcardModal";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { clearStudySet, currentlyLoading, studySetState } from "../../state-slices/study-set/study-set-slice";
import { useDispatch } from "react-redux";
import StudyListTable from "./StudyListTable";
import { isLoading } from "../../state-slices/flashcard/flashcard-slice";
import { useHistory } from "react-router-dom";

/**
 * @author Sean Taba
 * @returns {JSX.Element}
 * renders the studySets page
 */
const StudyHub = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [useList, setUseList] = useState(false); //true = public, false = owned

  const state = useAppSelector(studySetState);
  const history = useHistory();

  useEffect(() => {
    if (showCards) {
      document.getElementById("selected-study-set-title").scrollIntoView();
    }
  });

  const renderFlashcardTable = () => {
    setShowCards(true);
  };

  const modalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  // These functions set which list is displayed below based on button presses.
  const publicSetMode = (e: any) => {
    setShowCards(false);
    dispatch(currentlyLoading());
    dispatch(clearStudySet());
    setUseList(true);
  };

  const ownedSetMode = (e: any) => {
    setShowCards(false);
    dispatch(currentlyLoading());
    dispatch(clearStudySet());
    setUseList(false);
  };

  const goToStudy = (e: any) => {
    e.preventDefault();
    dispatch(isLoading());
    history.push("/card");
  };

  const goToQuiz = (e: any) => {
    e.preventDefault();
    if (state.selectedStudySet.cards.length < 4) {
      alert("Quizzes need at least 4 questions. SORRY!!");
    } else {
      history.push("/quiz");
    }
  };

  const createSet = (e: any) => {
    e.preventDefault();
    history.push("/sets");
  };

  return (
    <Row>
      <Col>
        {showModal && <AddFlashcardModal onCloseModal={modalHandler} />}
        <Row className="d-flex justify-content-between align-items-center">
          <Col className="d-flex flex-column justify-content-center col-md-3">
            <Row>
              <Col>
                <h2 className="justify-content-center d-flex">Study Sets</h2>
              </Col>
              {/*Removed this stuff until points are actually used.*/}
              {/*<Col>*/}
              {/*    <h3 className="justify-content-end">User: {auState.username} points: {}</h3>*/}
              {/*</Col>*/}
            </Row>
          </Col>
          <Col className="col-md-6">
            <Row
              className="d-flex justify-content-center flex-nowrap"
              style={{ alignContent: "center" }}
            >
              <Button
                type="submit"
                style={{ padding: "5px", width: "100px", margin: "10px" }}
                onClick={ownedSetMode}
                className="study-button"
              >
                Your Sets
              </Button>
              <Button
                type="submit"
                style={{ padding: "5px", width: "100px", margin: "10px" }}
                onClick={publicSetMode}
                className="study-button"
              >
                Public Sets
              </Button>
              <Button
                type="submit"
                style={{ padding: "5px", width: "100px", margin: "10px" }}
                onClick={createSet}
                className="study-button"
              >
                Create a Set
              </Button>
            </Row>
          </Col>
        </Row>

        <Row>
          <Col className="justify-content-center">
            <StudyListTable
              content={useList ? "public-sets" : "owned-sets"}
              type="sets"
              columns={["ID", "Owner", "Name", "Public"]}
              onStudySetChange={renderFlashcardTable}
            />
          </Col>
        </Row>

        {showCards && (
          <>
            <Row className="d-flex justify-content-between flashcard-study-label-row">
              <Col className="col-md-7">
                <h2
                  className="justify-content-center"
                  id="selected-study-set-title"
                >
                  Flashcards in Study Set: #{state.selectedStudySet.id} -{" "}
                  {state.selectedStudySet.name}
                </h2>
              </Col>
              <Col className="col-md-5">
                <Row
                  className="d-flex justify-content-center flex-nowrap"
                  style={{ alignContent: "center" }}
                >
                  <Button
                    type="submit"
                    onClick={goToStudy}
                    className="study-button"
                    style={{ padding: "5px", width: "100px", margin: "10px" }}
                  >
                    Study This
                  </Button>
                  <Button
                    type="submit"
                    onClick={goToQuiz}
                    className="study-button"
                    style={{ padding: "5px", width: "100px", margin: "10px" }}
                  >
                    Quiz Me!
                  </Button>
                </Row>
              </Col>
            </Row>
            <Row>
              <StudyListTable
                content="flashcards"
                type="flashcards"
                columns={[
                  "ID",
                  "Subject",
                  "Creator",
                  "Question",
                  "Answer",
                  "Reviewable",
                  "Public",
                ]}
              />
              <Button
                id="add-flashcard-button"
                as="input"
                onClick={modalHandler}
                type="button"
                value="Add a New Flashcard to StudySet"
              />
            </Row>
          </>
        )}
      </Col>
    </Row>
  );
};

export default StudyHub;
