
import { Button, Col, Row, Table } from "react-bootstrap";
import AddFlashcardModal from "./AddFlashcardModal";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { clearStudySet, currentlyLoading, studySetState } from "../../state-slices/study-set/study-set-slice";
import { authState } from "../../state-slices/auth/auth-slice";
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
    const [useList, setUseList] = useState(false);//true = public, false = owned

    const state = useAppSelector(studySetState);
    const auState = useAppSelector(authState);
    const history = useHistory();

    useEffect(() => {
      if (showCards) {
        document.getElementById("selected-study-set-title").scrollIntoView();
      }
    });

    const renderFlashcardTable = () => {
        setShowCards(true);
    }

    const modalHandler = () => {
        setShowModal(prevState => !prevState);
    }

    // /**
    //  * When "Your Sets" button is clicked, request to retrieve all created sets for account will be sent.
    //  * Will display a list of the results.
    //  * @param e event when button is clicked
    //  * @author Austin Knauer
    //  * @author Vinson Chin
    //  */
    // let createdSetsSearch = async (e: any) => {
    //     e.preventDefault();
    //
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': localStorage.getItem("Authorization")
    //     }
    //
    //     let response = await createdSetSearch(headers);
    //     dispatch(setSetList(response));
    //
    //     // needs to be updated eventually to actually check whether results were successfully fetched from the api
    //     setShowList(true);
    // }


    // These functions set which list is displayed below based on button presses.
    const publicSetMode = (e: any) => {
      setShowCards(false);
      dispatch(currentlyLoading());
      dispatch(clearStudySet());
      setUseList(true);
    }

    const ownedSetMode = (e: any) => {
      setShowCards(false);
      dispatch(currentlyLoading());
      dispatch(clearStudySet());
      setUseList(false);
    }

    const goToStudy = (e: any) => {
        e.preventDefault();
        console.log('Button: Go to study...')
        dispatch(isLoading());
        history.push("/card")
    }

    const goToQuiz = (e: any) => {
        e.preventDefault();
        if(state.selectedStudySet.cards.length < 4) {
            alert("Quizzes need at least 4 questions. SORRY!!");
        } else {
            console.log('Button: Go to quiz...');
            history.push("/quiz");
        }

    }

    const createSet = (e: any) => {
        history.push("/sets");
    }

    //
    // let publicSetsSearch = async (e: any) => {
    //     e.preventDefault();
    //     const headers = {
    //         'Content-Type': 'application/json',
    //         'Authorization': localStorage.getItem("Authorization")
    //     }
    // }


    return (
      <Row>
        <Col>
          {showModal && <AddFlashcardModal onCloseModal={modalHandler} />}
          <Row
            className="justify-content-center"
            style={{ alignContent: "center" }}
          >
            <Button
              type="submit"
              style={{ padding: "5px", width: "100px", margin: "10px" }}
              onClick={ownedSetMode}
            >
              Your Sets
            </Button>
            <Button
              type="submit"
              style={{ padding: "5px", width: "100px", margin: "10px" }}
              onClick={publicSetMode}
            >
              Public Sets
            </Button>
            <Button
              type="submit"
              style={{ padding: "5px", width: "100px", margin: "10px" }}
              onClick={createSet}
            >
              Create a Set
            </Button>
          </Row>
          <Row>
            <Col className="justify-content-center">
              <Row>
                <Col>
                  <h2 className="justify-content-center">Study Sets</h2>
                </Col>
                {/*Removed this stuff until points are actually used.*/}
                {/*<Col>*/}
                {/*    <h3 className="justify-content-end">User: {auState.username} points: {}</h3>*/}
                {/*</Col>*/}
              </Row>

              <StudyListTable
                content={useList ? "public-sets" : "owned-sets"}
                type="sets"
                columns={["ID", "Owner", "Name", "Public"]}
                onStudySetChange={renderFlashcardTable}
              />
            </Col>
          </Row>
          {showCards && (
            <Row>
              <Col >
                <Row>
                  <Col>
                    <h2 className="justify-content-center" id="selected-study-set-title">
                      Flashcards in Study Set: #{state.selectedStudySet.id} -{" "}
                      {state.selectedStudySet.name}
                    </h2>
                  </Col>
                  <Col>
                    <Button type="submit" onClick={goToStudy}>
                      Study This
                    </Button>
                  </Col>
                  <Col>
                    <Button type="submit" onClick={goToQuiz}>
                      Quiz Me!
                    </Button>
                  </Col>
                </Row>
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
                  as="input"
                  onClick={modalHandler}
                  type="button"
                  value="Add a New Flashcard to StudySet"
                />
              </Col>
            </Row>
          )}
        </Col>
      </Row>
    );
};

export default StudyHub;
