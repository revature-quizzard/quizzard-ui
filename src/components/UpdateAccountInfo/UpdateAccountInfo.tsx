import { useState } from "react";
import { Form, Button, Container,Row, Col, Card, Modal } from "react-bootstrap";
import {updateAccInfo}  from "../../remote/update-info-service";
import { useHistory } from "react-router-dom";
import {useAppDispatch} from "../../store/hooks";
import { logoutUserReducer} from "../../state-slices/auth/auth-slice";
import {ResUpdateAccModel} from "../../models/update-account-info-model";

/**
 * This function component is where the user will be able to update their username, password, or email. We leverage
 * the redux store to get the account id for inputting that value as a path variable for our axios call. We expect
 * a DTO to contain {username,password, email}
 * @param props Nothing at the moment
 * @constructor
 */
const UpdateAccountInfo =  ()=>{

    //useState hook for new username input, next two states are similar to this but for password, and email.
    const [username, setUsername] = useState("");

    const [password, setPassword] = useState("");
    
    const dispatch = useAppDispatch();
    
    const [email, setEmail] = useState("");
    //this useState hook will hold the response from our request
    //the fields we can get back are Email, Password, Username.
    //These will be used in the Modal for notification purposes
    const [result, setResult] = useState({
                            email:"",
                            password:"",
                            username:"",
                            conflict:""
    } as ResUpdateAccModel);

    //hook for displaying modal from react-boostrap
    const [show,setShow] = useState(false);


    let history = useHistory();

    /**
     * This function will be invoked when user clicks on the submit button. We use our hooks to get the value
     * username, password, and email from the input Form, and persist it to the data base. Then we use one last hook
     * that is an object with username, password and email and set the response from our axios DTO to that hook object.
     * @param e The event "click" being fired off.
     */
    let updateInfo =async (e:any)=>{
        e.preventDefault();

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': localStorage.getItem("Authorization")
        }

        let resultUser:ResUpdateAccModel = await updateAccInfo({username,email, password}, headers)
        setResult( resultUser);
        if(!resultUser.conflict){
            dispatch(logoutUserReducer());
            setTimeout(()=>{
            localStorage.clear();
            history.push("/login")
            },2000)
        };

        setShow(true);
    }

    //Handles the state for show, toggles it back to false. In order to stop rendering
    //the Modal from react-bootstrap.
    const handleClose = ()=>
        setShow(false);

    return(
        <>
        <Container >
            <Row >
                <Col></Col>
                <Col style={{padding:"3rem"}} xs={12} md={9}>
                    <Card id="CardUAI">
                        <Card.Header id="header-title" style={{textAlign:"center"}}>Update Account Information</Card.Header>
                        <Card.Body>
                            <Form id="FormUAI">
                                <Form.Group>
                                    <Form.Label id="label-username">Username:</Form.Label>
                                    <Form.Control type="text" id="username"  placeholder="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label id="label-pass">Password:</Form.Label>
                                    <Form.Control type="password" id="password" name="password" placeholder="password" value={password} onChange={(e)=>setPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label id="label-email">Email:</Form.Label>
                                    <Form.Control type="text" id="email" name="email" placeholder="email" value={email} onChange={(e)=>setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Col sm={{ span: 6, offset: 3 }} >
                                <Form.Group>
                                    <Button variant="danger" data-testid="submit-btn" id="submit-btn"type="submit" onClick={updateInfo}  block>Submit</Button>
                                </Form.Group>

                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>

        <Modal data-testid="containerModal" id="modalContainer" show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Your Updated Information!</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                    <ul key="Unordered-list">
                        {Object.values(result).map((value,index)=>{
                            return(
                            value
                            &&
                             <li key={index}>{value}</li>

                            )
                        })}
                    </ul>
            </Modal.Body>
        </Modal>
        </>
    )
}

export default UpdateAccountInfo;
