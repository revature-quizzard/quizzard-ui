
import {Button, Col, Row, Table} from "react-bootstrap";
import PublicStudySetData from "./PublicStudySetData";
import FlashcardData from "./FlashcardData";
import AddFlashcardModal from "./AddFlashcardModal";
import {useState} from "react";
import {useAppSelector} from "../../store/hooks";
import {currentlyLoading, savePublicStudySets, studySetState} from "../../state-slices/study-set/study-set-slice";
import {authState} from "../../state-slices/auth/auth-slice";
import {createdSetSearch} from "../../remote/set-service";
import {setSetList} from "../../state-slices/sets/set-list-slice";
import {useDispatch} from "react-redux";
import OwnedStudySetData from "./OwnedStudySetData";




/**
 * @author Sean Taba
 * @returns {JSX.Element}
 * renders the studySets page
 */
const AvailableStudySets = () => {
    console.log('ASS');
    const dispatch = useDispatch();
    const [showList, setShowList] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [useList, setUseList] = useState(true);//true = public, false = owned
    const state = useAppSelector(studySetState);
    const auState = useAppSelector(authState);
    const renderFlashcardTable = () => {
        setShowCards(true);
    }
    const modalHandler = () => {
        if (showModal) setShowModal(false);
        else setShowModal(true);
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

    /*
    These functions set which list is displayed below based on button presses.
     */
    const publicSetMode = (e: any) => {
        dispatch(currentlyLoading());
        setUseList(true);
    }
    const ownedSetMode = (e: any) => {
        dispatch(currentlyLoading());
        setUseList(false);
    }

    let publicSetsSearch = async (e: any) => {
        e.preventDefault();
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("Authorization")
        }
    }


    return (
        <Row>
            <Col>
                {showModal &&
                <AddFlashcardModal onCloseModal={modalHandler} />
                }
                <Row className="justify-content-center">
                    <Col className="col-1" style={{ padding: "2px" }}>
                        <Button type="submit" onClick={ownedSetMode} >Your Sets (Not used yet)</Button>
                    </Col>
                    <Col className="col-1" style={{ padding: "2px" }}>
                        <Button type="submit" onClick={publicSetMode} >All Public Sets (Not used yet)</Button>
                    </Col>
                </Row>
                <Row>
                    <Col className="justify-content-center">
                        <Row>
                            <Col>
                                <h2 className="justify-content-center">Public Study Sets</h2>
                            </Col>
                            <Col>
                                <h3 className="justify-content-end">User: {auState.username} points: {}</h3>
                            </Col>
                        </Row>

                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Owner</th>
                                <th>Name</th>
                                <th>Public</th>
                            </tr>
                            </thead>
                            {useList
                                ? <PublicStudySetData onStudySetChange={renderFlashcardTable}/>
                                : <OwnedStudySetData onStudySetChange={renderFlashcardTable}/>}
                        </Table>
                    </Col>
                </Row>
                {showCards &&
                <Row>
                    <Col>
                        <h2 className="justify-content-center">Flashcards in Study Set: #{state.selectedStudySet.id} - {state.selectedStudySet.name}</h2>
                            <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                            <td>ID</td>
                            <td>Subject</td>
                            <td>Creator</td>
                            <td>Question</td>
                            <td>Answer</td>
                            <td>Reviewable</td>
                            <td>Public</td>
                            </tr>
                            </thead>
                            <FlashcardData />
                            </Table>
                        <Button as="input" onClick={modalHandler} type="button" value="Add a New Flashcard to StudySet" />
                    </Col>
                </Row>
                }
            </Col>
        </Row>
    )
};

export default AvailableStudySets;