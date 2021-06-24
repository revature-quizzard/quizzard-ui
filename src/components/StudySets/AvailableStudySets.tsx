/**
 * @Author: Sean Taba
 */

import {Button, Col, Row, Table} from "react-bootstrap";
import StudySetData from "./StudySetData";
import FlashcardData from "./FlashcardData";
import AddFlashcardModal from "./AddFlashcardModal";
import {useState} from "react";
import {StudySet} from "../../Models/StudySet";
import {Account} from "../../Models/Account";
import {Flashcard} from "../../Models/Flashcard";
import {useAppSelector} from "../../store/hooks";
import {studySetState} from "../../StateSlices/StudySet/studysetSlice";

const AvailableStudySets = () => {
    console.log('AvailableStudySets Rendering: ');
    const [showModal, setShowModal] = useState(false);
    const [showCards, setShowCards] = useState(false);
    const [studySet, setStudySet] = useState({id: 0, creator: {} as Account, cards: [] as Flashcard[], name: '', isPublic: false});
    const state = useAppSelector(studySetState);
    const renderFlashcardTable = (ss: StudySet) => {
        setStudySet(ss);
        setShowCards(true);
    }
    const modalHandler = () => {
        if (showModal) setShowModal(false);
        else setShowModal(true);
    }
    return (
        <Row>
            <Col>
                {showModal &&
                <AddFlashcardModal onCloseModal={modalHandler} />
                }
                <Row>
                    <Col className="justify-content-center">
                        <h2 className="justify-content-center">Public Study Sets</h2>
                        <Table striped bordered hover variant="dark">
                            <thead>
                            <tr>
                                <th>ID</th>
                                <th>Owner</th>
                                <th>Name</th>
                                <th>Public</th>
                            </tr>
                            </thead>
                                <StudySetData onStudySetChange={renderFlashcardTable}/>
                        </Table>
                    </Col>
                </Row>
                {showCards &&
                <Row>
                    <Col>
                        <h2 className="justify-content-center">Flashcards in Study Set: #{studySet.id} - {studySet.name}</h2>
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
                            <FlashcardData data={studySet}/>
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