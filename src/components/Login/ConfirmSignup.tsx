import {Button, FormControl, Input, InputLabel, makeStyles, Typography} from "@material-ui/core";
import {useHistory} from "react-router-dom";
import {SyntheticEvent, useState} from "react";
import ErrorMessageComponent from "./ErrorMessageComponent";
import {Alert} from "@material-ui/lab";
import { confirmUserAccount } from "../../remote/login-register-service";

const useStyles = makeStyles({
    confirmAccountContainer: {
        justifyContent: "center",
        marginLeft: "25rem",
        marginTop: "10rem",
        padding: 20,
        width: "25%"
    }
});

export const ConfirmSignup = () => {

    const classes = useStyles();
    const history = useHistory();

    const [formData, setFormData] = useState({
        username: '',
        code: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [codeExpired, setCodeExpired] = useState(false);

    let handleChange = (e: any) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value});
    }

    const confirmAccount = async (e: SyntheticEvent) => {

        try {
            await confirmUserAccount(formData.username, formData.code);
            history.push("/login");
        } catch (err: any) {
            console.error(err);
            setErrorMessage(err.message as string);
            setCodeExpired(err.code === 'ExpiredCodeException');
        }
    };

    const resendCode = async (e: SyntheticEvent) => {

    };

    return (
        <div id="register-component" className={classes.confirmAccountContainer}>
            <Typography align="center" variant="h4">Confirm Your Account!</Typography>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="username">Username</InputLabel>
                <Input
                    onChange={handleChange}
                    id="username"
                    name="username"
                    type="username"
                    placeholder="Enter the username associated with your account"
                />
            </FormControl>

            <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="code">Verification Code</InputLabel>
                <Input
                    onChange={handleChange}
                    id="code"
                    name="code"
                    type="text"
                    placeholder="Enter the verification code we sent to your email"
                />
            </FormControl>

            <Button
                id="confirm-button"
                onClick={confirmAccount}
                variant="contained"
                color="primary"
                style={{backgroundColor: '#332347', color: '#FFFFFF'}}
                size="medium">Confirm Account</Button>

            <br/><br/>

            { errorMessage ? <ErrorMessageComponent errorMessage={errorMessage}/> : <></> }

            {
                codeExpired
                    ?
                    (<Alert severity="info">Click <a href="#" onClick={resendCode}>here</a> to send a new verification code</Alert>)
                    :
                    (<></>)
            }

        </div>
    );

}