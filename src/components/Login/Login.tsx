import { Form, Button } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../remote/login-register-service";
import { LoginModel } from "../../Models/login-model";
//import { LoginModel } from "../../models/login-model";
import { useDispatch } from 'react-redux';
import { useHistory } from "react-router-dom";
import { loginUserReducer } from "../../StateSlices/Auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [loginUser, setLoginUser] = useState({username: "", password: ""} as LoginModel)

  let onChange = (e: any) => {
    const {name, value} = e.target;
    setLoginUser({
      ...loginUser, [name]: value
    });
  }

  let logUserIn = async (e: any) => {
    e.preventDefault();
    let response = await login(loginUser);
    localStorage.setItem("Authorization", response.headers.authorization);
    setLoginUser({username: "", password: ""} as LoginModel);
    dispatch(loginUserReducer({username: response.data.username, token: response.headers.authorization}));
    history.push("/");
  }

    // 

    return (
        <>
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control name="username" value={loginUser.username} onChange={onChange} type="text" placeholder="username"  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control name="password" value={loginUser.password} onChange={onChange} type="password" placeholder="*******"/>
          </Form.Group>
          <Form.Group className="text-center">
            <Button onClick={logUserIn}>Login</Button>
          </Form.Group>
        </Form>
      </>
    )
}

export default Login;