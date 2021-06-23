import axios from "axios";
import { useState } from "react";
import { Form, Button, Container,Row, Col, Card, Modal, ListGroup } from "react-bootstrap";
import { updateAccInfo } from "../../remote/updateInfo-service";
import {UpdateAccModel, ResUpdateAccModel } from "../../models/UpdateAccountInfo-model";
import { useHistory } from "react-router-dom";
interface IUpdateProps{

}

/**
 * This function component is where the user will be able to update their username, password, or email. We leverage
 * the redux store to get the account id for inputting that value as a path variable for our axios call. We expect
 * a DTO to contain {username,password, email}
 * @param props Nothing at the moment
 * @constructor
 */
const UpdateAccontInfo = (props:IUpdateProps)=>{

    //useState hook for new username input, next two states are similar to this but for password, and email.
    const [username, setUsername] = useState("");
    
    const [password, setPassword] = useState("");
    
    const [email, setEmail] = useState("");
    //this useState hook will hold the reponse from our request
    //the fields we can get back are Email, Password, Username.
    //These will be used in the Modal for notification purposes
    const [result, setResult] = useState({
                            email:"",
                            password:"",
                            username:"",
                            conflict:""
    })

    //hook for displaying modal from react-boostrap
    const [show,setShow] = useState(false);

    //function that is invoked, we make put request and sent over the new information(username,email,password).

    let history = useHistory();

    /**
     * This function will be invoked when user clicks on the submit button. We use our hooks to get the value
     * username, password, and email from the input Form, and persist it to the data base. Then we use one last hook
     * that is an object with username, password and email and set the response from our axios DTO to that hook object.
     * @param e The event "click" being fired off.
     */
    let updateInfo =async (e:any)=>{
        e.preventDefault();

        let resultUser = await updateAccInfo({username,email, password})
        setResult( prevState => resultUser);

        if(!result.conflict){
            setTimeout(()=>{
            localStorage.clear();
            history.push("/login")
            },2000)
        };

        setShow(true);
        // Object.entries(result).map(([key,value])=>{
        //     console.log(value)
        // })
    }

    //Handles the state for show, toggles it back to false. In order to stop rendering
    //the Modal from react-bootstrap.
    const handleClose = ()=>setShow(false);

    return(
        <>
        <Container >
            <Row >
                <Col></Col>
                <Col style={{marginTop:"150px"}} className="col-sm-9">
                    <Card>
                        <Card.Header style={{textAlign:"center"}}>Update Account Information</Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group>
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" id="username" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="text" id="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control type="text" id="email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)}>
                                    </Form.Control>
                                </Form.Group>
                                <Col sm={{ span: 6, offset: 3 }} >
                                <Form.Group>
                                    <Button variant="danger" id="submit-btn"type="submit" onClick={updateInfo} block>Submit</Button>
                                </Form.Group>
                                
                                </Col>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col></Col>
            </Row>
        </Container>

        <Modal id="modalContainer" show={show} onHide={handleClose}>
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

export default UpdateAccontInfo;

