import { Form, Button, Alert } from "react-bootstrap";
import { useState } from 'react';
import { register } from "../../remote/login-register-service";
import { RegisterModel } from "../../models/register-model";
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginUserReducer } from "../../state-slices/auth/auth-slice";
import {
  showErrorMessage,
  hideErrorMessage,
  errorState,
} from "../../state-slices/error/errorSlice";
import {getSubs} from "../../remote/subject-service";
import {setSubjects} from "../../state-slices/subject/subject-slice";

const Register = () => {
  const [newUser, setNewUser] = useState({username: "", password: "", email: "", firstName: "", lastName: ""} as RegisterModel)
  const dispatch = useDispatch();
  const history = useHistory();

 const error = useSelector(errorState);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    setNewUser({
      ...newUser, [name]: value
    });
  }
  const getSubjects = async () => {
    let subjects = await getSubs();
    dispatch(setSubjects(subjects));
  }

  let registerNewUser = async (e:any) => {
    e.preventDefault();
    await register(newUser).then(response => {
      localStorage.setItem("Authorization", response.headers.authorization);
      setNewUser({username: "", password: "", email: "", firstName: "", lastName: ""} as RegisterModel);
      dispatch(loginUserReducer({username: response.data.username, token: response.headers.authorization}));
      getSubjects();
      history.push("/study");
    }).catch(error => {
      if (error.response.status === 409) {
        dispatch(showErrorMessage("Invalid inputs"));
        setTimeout(() => {
          dispatch(hideErrorMessage());
        }, 5000);
      }
    });
  }


  return (
    <>
      <Form className="auth-form">
        <h2>Registration</h2>
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
        {error.showError && <Alert variant="danger">{error.errorMsg}</Alert>}
      </Form>
    </>
  );
};

export default Register;
