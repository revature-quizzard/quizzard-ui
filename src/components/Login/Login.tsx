import {Form, Button} from "react-bootstrap";
import {useState} from "react";
import {authenticate} from "../../remote/login-register-service";
import {LoginModel} from "../../models/login-model";
import {useDispatch, useSelector} from 'react-redux';
import {showSnackbar, setErrorSeverity} from "../../state-slices/error/errorSlice";
import {authState, loginUserReducer} from "../../state-slices/auth/auth-slice";
import {Redirect} from "react-router-dom";

const Login = () => {
    const dispatch = useDispatch();
    const [loginUser, setLoginUser] = useState({username: "", password: ""} as LoginModel)
    const auth = useSelector(authState);

    let onChange = (e: any) => {
        const {name, value} = e.target;
        setLoginUser({
            ...loginUser, [name]: value
        });
    }

    let logUserIn = async (e: any) => {
        e.preventDefault();
        try {
            let response = await authenticate(loginUser);
            dispatch(loginUserReducer(response));
        } catch (e: any) {
            console.log(e);
            dispatch(setErrorSeverity('error'));
            dispatch(showSnackbar("Invalid credentials provided."));
        }
    }

    return (
        auth.isAuthenticated ? <Redirect to="/study"/> :
            <>
                <Form>
                    <h2>Login</h2>
                    <Form.Group>
                        <Form.Label>Username: </Form.Label>
                        <Form.Control name="username" value={loginUser.username} onChange={onChange} type="text"
                                      placeholder="username"/>
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Password: </Form.Label>
                        <Form.Control name="password" value={loginUser.password} onChange={onChange} type="password"
                                      placeholder="*******"/>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button onClick={logUserIn} type="submit">Login</Button>
                    </Form.Group>
                </Form>
            </>
    )
}

export default Login;
