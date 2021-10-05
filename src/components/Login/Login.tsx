import {Button, Container, TextField, Typography} from "@mui/material"
import {makeStyles} from "@mui/styles";
import {useState} from "react";
import {authenticate} from "../../remote/login-register-service";
import {LoginModel} from "../../models/login-model";
import {useDispatch, useSelector} from 'react-redux';
import {showSnackbar, setErrorSeverity} from "../../state-slices/error/errorSlice";
import {authState, loginUserReducer} from "../../state-slices/auth/auth-slice";
import {Redirect, useHistory} from "react-router-dom";

const useStyles = makeStyles({
    loginContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
        border: 'solid #332347',
        borderWidth: '2px'
    },
    loginDiv: {
        justifyContent: "space-between",
        margin: '2rem'
    }
});

const Login = () => {
    const classes = useStyles();
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

    const history = useHistory();

    let navToRegister = () => {
        history.push('/register');
    }

    return (
        auth.isAuthenticated ? <Redirect to="/profile"/> :
            <>
                <Container fixed maxWidth="sm" id="login-component" className={classes.loginContainer}>
                    <div className={classes.loginDiv}>
                        <Typography variant='h4'>Login</Typography>
                        <br/><br/>
                        <TextField
                            id='username'
                            label='Username'
                            name='username'
                            value={loginUser.username}
                            variant='outlined'
                            onChange={onChange}
                        />
                        <br/><br/>
                        <TextField
                            id='password'
                            label='Password'
                            name='password'
                            value={loginUser.password}
                            variant='outlined'
                            type='password'
                            onChange={onChange}
                        />
                        <br/><br/>
                        <Button
                            id='login-button'
                            onClick={logUserIn}
                            variant='contained'
                            style={{backgroundColor: '#332347', color: '#FFFFFF'}}
                            type="submit">
                            Login
                        </Button>
                        <br/><br/>
                        <p>No account yet? <span
                            style={{color: "#0000EE", cursor: "pointer", textDecoration: "underline"}}
                            onClick={navToRegister}>Sign Up</span>!</p>
                    </div>
                </Container>
            </>
    )
}
export default Login;


