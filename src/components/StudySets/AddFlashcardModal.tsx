
import {Button, Col, Form, Modal, ModalBody, ModalFooter, ModalTitle, Row} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import SubjectDropDown from "./SubjectDropDown";
import {Flashcard, FlashcardDTO, SetFlashcardDTO} from "../../models/flashcard";
import {flashcardSaver} from "../../remote/flashcard-saver";
import {Subject} from "../../models/subject";
import {useAppDispatch, useAppSelector} from "../../store/hooks";
import {appendCardToStudySet, studySetState} from "../../state-slices/study-set/study-set-slice";
import {Account} from "../../models/account";
import {authSlice, authState} from "../../state-slices/auth/auth-slice";
import {Role} from "../../models/role";
import { useEffect, useState } from "react";

/**
 * @author Sean Taba
 * @param props: Callback function to close the modal
 * @returns {JSX.Element}
 * renders the modal
 */
const AddFlashcardModal = (props: any) => {
    let question = '';
    let answer = '';
    let isReviewable = true;
    let isPublic = true;
    let subject = {id: 1, name: 'OOP'} as Subject;
    const stState = useAppSelector(studySetState);
    const dispatch = useAppDispatch();
    const auState = useAppSelector(authState)

// const [topic, setTopic] = useState({ id: 1, name: "OOP"});
    
    const handleClose = () => {
        props.onCloseModal();
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();

        let newCard: SetFlashcardDTO = {
            id: 0,
            subject: subject,
            creator: {username: auState.username, password: '', id: 0, points: 0, roles: {} as Role[]},
            question: question,
            answer: answer,
            reviewable: isReviewable,
            public: isPublic,
            studySetId: stState.selectedStudySet.id
        }

        console.log(newCard);

        flashcardSaver(newCard,auState.token).then(card => {
            console.log('promise returning', card)
            dispatch(appendCardToStudySet(card));
        });
       

        props.onCloseModal();
    }
    const handleChange = (e: any) => {
        switch (e.target.id) {
            case 'question':
                question = e.target.value;
                break;
            case 'answer':
                answer = e.target.value;
                break;
            case 'reviewable':
                isReviewable = e.target.checked;
                break;
            case 'public':
                isPublic = e.target.checked;
                break;
        }
    }
    const handleDropdown = (e: Subject) => {
        console.log('subject:',e);
        subject = e;
    }

    return <Modal show={true} onHide={handleClose}>
        <ModalHeader closeButton>
            <ModalTitle>Add New Flashcard</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Form>
                <Form.Group>
                    <Form.Label column='lg' lg={2}>Question</Form.Label>
                    <Form.Control id="question" type="input" placeholder="Enter New Question" onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        Please enter a clear question to make this flashcard more useful.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Form.Label column='lg' lg={2}>Answer</Form.Label>
                    <Form.Control as="textarea" rows={5} id="answer" type="input" placeholder="Enter New Answer"
                                  onChange={handleChange}/>
                    <Form.Text className="text-muted">
                        Please keep answers as short and concise as possible.
                    </Form.Text>
                </Form.Group>
                <Form.Group>
                    <Row>
                        <Col>
                            <Form.Check id="reviewable" type="checkbox" label="Reviewable" defaultChecked={true}
                                        onChange={handleChange}/>
                            <Form.Check id="public" type="checkbox" label="Public" defaultChecked={true}
                                        onChange={handleChange}/>
                        </Col>
                        <Col className="d-flex w-100% justify-content-end m-1">
                            <SubjectDropDown onChangeCallback={handleDropdown}/>
                        </Col>
                    </Row>
                </Form.Group>
                <Row>
                    <Col className="d-flex justify-content-end justify-content-end">
                        <Button className="d-flex m-1 w-25 justify-content-center" variant="primary" type="submit"
                                onClick={handleSubmit}>
                            Submit
                        </Button>
                        <Button className="d-flex m-1 w-25 justify-content-center" variant="primary" type="reset"
                                onClick={handleClose}>
                            Close
                        </Button>
                    </Col>
                </Row>
            </Form>
        </ModalBody>
        <ModalFooter>

        </ModalFooter>
    </Modal>
}

export default AddFlashcardModal;