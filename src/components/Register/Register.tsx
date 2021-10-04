import {Button, Container, TextField, Typography} from "@mui/material"
import {makeStyles} from "@mui/styles";
import {useState} from 'react';
import {registerUserAccount} from "../../remote/login-register-service";
import {RegisterModel} from "../../models/register-model";
import {useDispatch} from 'react-redux';
import {useHistory} from "react-router-dom";
import {setErrorSeverity, showSnackbar} from "../../state-slices/error/errorSlice";

const useStyles = makeStyles({
    registerContainer: {
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: '3rem',
    },
    registerDiv: {
        justifyContent: "space-between",
        margin: '2rem'
    }
});

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
    const classes = useStyles();

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
            <Container fixed maxWidth="sm" id="login-component" className={classes.registerContainer}>
                <div className={classes.registerDiv}>
                    <Typography variant='h4'>Register</Typography>
                        <br/>
                        <Typography>Username: </Typography>
                        <TextField
                            name="username"
                            value={newUser.username}
                            onChange={handleChange}
                            type="text"
                            placeholder="username"
                        />
                        <br/>
                        <Typography>Password: </Typography>
                        <TextField
                            name="password"
                            value={newUser.password}
                            onChange={handleChange}
                            type="password"
                            placeholder="*******"
                        />
                        <br/>
                        <Typography>Email: </Typography>
                        <TextField
                            name="email"
                            value={newUser.email}
                            onChange={handleChange}
                            type="text"
                            placeholder="email@email.com"
                        />
                        <br/>
                        <Typography>First Name: </Typography>
                        <TextField
                            name="firstName"
                            value={newUser.firstName}
                            onChange={handleChange}
                            type="text"
                            placeholder="John"
                        />
                        <br/>
                        <Typography>Last Name: </Typography>
                        <TextField
                            name="lastName"
                            value={newUser.lastName}
                            onChange={handleChange}
                            type="text"
                            placeholder="Bond"
                        />
                        <br/>
                        <Button
                            id='register-button'
                            onClick={registerNewUser}
                            variant='contained'
                            style={{backgroundColor: '#332347', color: '#FFFFFF'}}
                            type="submit">
                            Register
                        </Button>
                </div>
            </Container>
        </>
    );
};

export default Register;
