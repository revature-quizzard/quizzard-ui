/**
 * @Author: Sean Taba
 */
import {Button, Col, Form, Modal, ModalBody, ModalFooter, ModalTitle, Row} from "react-bootstrap";
import ModalHeader from "react-bootstrap/ModalHeader";
import {useAppDispatch} from "../../store/hooks";
import {saveFlashcard, showAddFlashcardModal} from "../../StateSlices/StudySet/studysetSlice";


const AddFlashcardModal = () => {
    let question = '';
    let answer = '';
    let isReviewable = true;
    let isPublic = true;

    const dispatch = useAppDispatch();
    const handleClose = () => {
        dispatch(showAddFlashcardModal(false));
    }
    const handleSubmit = () => {
        dispatch(saveFlashcard({id: -1, public: isPublic, reviewable: isReviewable, answer: answer,
                                    question: question, account_id: -1, subject_id: -1}))
        dispatch(showAddFlashcardModal(false));
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

    return <Modal show={true} onHide={handleClose}>
        <ModalHeader closeButton>
            <ModalTitle>Add New Flashcard</ModalTitle>
        </ModalHeader>
        <ModalBody>
            <Form>
                <Form.Group>
                    <Form.Label>Question</Form.Label>
                    <Form.Control id="question" type="input" placeholder="Enter New Question" onChange={handleChange} />
                    <Form.Text className="text-muted">
                        Please enter a clear question to make this flashcard more useful.
                    </Form.Text>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Answer</Form.Label>
                    <Form.Control id="answer" type="input" placeholder="Enter New Answer" onChange={handleChange}/>
                </Form.Group>
                <Form.Group>
                    <Form.Check id="reviewable" type="checkbox" label="Reviewable" defaultChecked={true} onChange={handleChange}/>
                    <Form.Check id="public" type="checkbox" label="Public" defaultChecked={true} onChange={handleChange}/>
                </Form.Group>
                <Row>
                    <Col className="d-flex justify-content-center">
                        <Button className="d-flex m-1" variant="primary" type="submit" onClick={handleSubmit}>
                            Submit
                        </Button>
                    </Col>
                    <Col className="d-flex justify-content-center">
                        <Button className="d-flex m-1" variant="primary" type="reset" onClick={handleClose}>
                            Cancel
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