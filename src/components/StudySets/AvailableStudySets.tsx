/**
 * @Author: Sean Taba
 */

import {Button, Col, Row, Table} from "react-bootstrap";
import StudySetData from "./StudySetData";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import FlashcardData from "./FlashcardData";
import {showAddFlashcardModal} from "../../StateSlices/StudySet/studysetSlice";
import AddFlashcardModal from "./AddFlashcardModal";

const AvailableStudySets = () => {
    const state = useAppSelector(state => state.studySets);
    const dispatch = useAppDispatch();
    const modalHandler = () => {
       dispatch(showAddFlashcardModal(true));
    }
    return (
        <Row>
            <Col>
                {state.showModal &&
                <AddFlashcardModal />
                }
                <Row>
                    <Col>
                        <h2>Available StudySets</h2>
                        <Table hover>
                            <thead>
                            <tr>
                                <th>StudySet ID</th>
                                <th>Owner Account ID</th>
                                <th>StudySet Name</th>
                                <th>Public</th>
                            </tr>
                            </thead>
                            <StudySetData/>
                        </Table>
                    </Col>
                </Row>
                {state.isStudySetSelected &&
                <Row>
                    <Col>
                        <h2>Available Flashcards in Selected StudySet ID: {state.studySet.id}</h2>
                            <Table hover>
                            <thead>
                            <tr>
                            <td>Flashcard ID</td>
                            <td>Subject ID</td>
                            <td>Account ID</td>
                            <td>Question</td>
                            <td>Answer</td>
                            <td>Reviewable</td>
                            <td>Public</td>
                            </tr>
                            </thead>
                            <FlashcardData/>
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