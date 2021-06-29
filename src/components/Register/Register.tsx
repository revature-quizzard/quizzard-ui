import { Form, Button } from "react-bootstrap";
import { useState } from 'react';
import { register } from "../../remote/login-register-service";
import { RegisterModel } from "../../models/register-model";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginUserReducer } from "../../state-slices/auth/auth-slice";

const Register = () => {
  const [newUser, setNewUser] = useState({username: "", password: "", email: "", firstName: "", lastName: ""} as RegisterModel)
  const dispatch = useDispatch();
  const history = useHistory();

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setNewUser({
      ...newUser, [name]: value
    });
  }


  let registerNewUser = async () => {
    let response = await register(newUser);
    localStorage.setItem("Authorization", response.headers.authorization);
    setNewUser({username: "", password: "", email: "", firstName: "", lastName: ""} as RegisterModel);
    dispatch(loginUserReducer({username: response.data.username, token: response.headers.authorization}));
    history.push("/study");
  }


  return (
    <>
      <Form className="auth-form">
        <h2>Registration</h2>
        <Form.Group>
          <Form.Label>Username: </Form.Label>
          <Form.Control name="username" value={newUser.username} onChange={handleChange} type="text" placeholder="username"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password: </Form.Label>
          <Form.Control name="password" value={newUser.password} onChange={handleChange} type="password" placeholder="*******"/>
        </Form.Group>
        <Form.Group>
          <Form.Label>Email: </Form.Label>
          <Form.Control name="email" value={newUser.email} onChange={handleChange} type="text" placeholder="email@email.com"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>First Name: </Form.Label>
          <Form.Control name="firstName" value={newUser.firstName} onChange={handleChange} type="text" placeholder="John"  />
        </Form.Group>
        <Form.Group>
          <Form.Label>Last Name: </Form.Label>
          <Form.Control name="lastName" value={newUser.lastName} onChange={handleChange} type="text" placeholder="Bond"  />
        </Form.Group>
        <Form.Group className="text-center">
          <Button onClick={registerNewUser} /*onKeyPress={handleKeyPress}*/>Register</Button>
        </Form.Group>
      </Form>
    </>
  );
};

export default Register;
