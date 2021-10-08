import {Form, Button} from "react-bootstrap";
import {useState} from 'react';
import {registerUserAccount} from "../../remote/login-register-service";
import {RegisterModel} from "../../models/register-model";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import {setErrorSeverity, showSnackbar} from "../../state-slices/error/errorSlice";
import { Container } from "@mui/material";


const Register = () => {
    const [newUser, setNewUser] = useState({
        username: "",
        password: "",
        email: "",
        firstName: "",
        lastName: ""
    } as RegisterModel)
    const dispatch = useDispatch();
    const history = useHistory();


    const handleChange = (e: any) => {
        const {name, value} = e.target;
        setNewUser({
            ...newUser, [name]: value
        });
    }

    let registerNewUser = async (e: any) => {
        e.preventDefault();
        registerUserAccount(newUser).then(() => {
            history.push("/confirmation");
        }).catch(error => {
            console.log(error);
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar(error.message));
        });
    }


    return (
        <>
        <Container style={{width:'30em' ,justifyContent: 'center' }}>
            <Form >
         
            <br/>     
            <br/>    
             <h1  style={{color: '#4E3E61 ' ,  textAlign: 'center' ,fontFamily:"Emilys Candy"}}><b> <span  >REGiSTRATION</span> </b></h1> 
             <hr/>
      <br/>    
     
                <h1><b></b></h1>
                <Form.Group>
                    <Form.Label>Username: </Form.Label>
                    <Form.Control
                        name="username"
                        value={newUser.username}
                        onChange={handleChange}
                        type="text"
                        placeholder="username"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Password: </Form.Label>
                    <Form.Control
                        name="password"
                        value={newUser.password}
                        onChange={handleChange}
                        type="password"
                        placeholder="*******"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Email: </Form.Label>
                    <Form.Control
                        name="email"
                        value={newUser.email}
                        onChange={handleChange}
                        type="text"
                        placeholder="email@email.com"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>First Name: </Form.Label>
                    <Form.Control
                        name="firstName"
                        value={newUser.firstName}
                        onChange={handleChange}
                        type="text"
                        placeholder="John"
                    />
                </Form.Group>
                <Form.Group>
                    <Form.Label>Last Name: </Form.Label>
                    <Form.Control
                        name="lastName"
                        value={newUser.lastName}
                        onChange={handleChange}
                        type="text"
                        placeholder="Bond"
                    />
                </Form.Group>
                <Form.Group className="text-center">
                    <Button onClick={registerNewUser} type="submit">
                        Register
                    </Button>
                </Form.Group>
            </Form>
            </Container>
        </>
    );
};

export default Register;
