import { Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { login } from "../../remote/login-register-service";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  let onChangeUsername = (e: any) => {
    setUsername(e.currentTarget.value);
  }

  let onChangePassword = (e: any) => {
    setPassword(e.currentTarget.value);
  }

  let loginUser = async (e: any) => {
    e.preventDefault();
    let response = await login(username, password);
    localStorage.setItem("Authorization", response.headers.Authorization);
  }


    return (
        <>
        <Form>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control onChange={onChangeUsername} type="text" placeholder="username"  />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control onChange={onChangePassword} type="password" placeholder="*******"/>
          </Form.Group>
          <Form.Group className="text-center">
            <Button onClick={loginUser}>Login</Button>
          </Form.Group>
        </Form>
      </>
    )
}

export default Login;