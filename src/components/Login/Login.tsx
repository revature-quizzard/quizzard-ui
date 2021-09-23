import { Form, Button, Alert } from "react-bootstrap";
import { useState } from "react";
import { authenticate } from "../../remote/login-register-service";
import { LoginModel } from "../../models/login-model";
import {  useDispatch, useSelector } from 'react-redux';
import { showErrorMessage, hideErrorMessage, errorState } from "../../state-slices/error/errorSlice";
import { useHistory } from "react-router-dom";
import { loginUserReducer } from "../../state-slices/auth/auth-slice";
import {getSubs} from "../../remote/subject-service";
import {setSubjects} from "../../state-slices/subject/subject-slice";
import {Redirect} from "react-router-dom";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginUser, setLoginUser] = useState({ username: "", password: "" } as LoginModel)
  
  const error = useSelector(errorState);

  const getSubjects = async () => {
    let subjects = await getSubs();
    dispatch(setSubjects(subjects));
  }

  let onChange = (e: any) => {
    const {name, value} = e.target;
    setLoginUser({
      ...loginUser, [name]: value
    });
  }

/*
  Perfection looks like this (what all axios calls should look like):
*/
  let logUserIn = async (e: any) => {
    e.preventDefault();
    let response = authenticate(loginUser);

    //localStorage.setItem("Authorization", response.signInUserSession);
    //setLoginUser({username: "", password: ""} as LoginModel);
    //dispatch(loginUserReducer({username: response.signInUserSession.accessToken.payload.username, token: response.signInUserSession.accessToken.jwtToken}));
   // getSubjects();
    //history.push("/study");

  }

    return (
        loginUser ? <Redirect to="/study"/> :
        <>
        <Form>
        <h2>Login</h2>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control name="username" value={loginUser.username} onChange={onChange} type="text" placeholder="username"  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control name="password" value={loginUser.password} onChange={onChange} type="password" placeholder="*******"/>
          </Form.Group>
          <Form.Group className="text-center">
            <Button onClick={logUserIn} type="submit" >Login</Button>
          </Form.Group>
          {error.showError && 
          <Alert variant="danger">{error.errorMsg}</Alert>
          }
        </Form>
      </>
    )
}

export default Login;
