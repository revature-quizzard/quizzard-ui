import { Form,  Alert } from "react-bootstrap";
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
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';
import {getSubs} from "../../remote/subject-service";
import {setSubjects} from "../../state-slices/subject/subject-slice";
import { Fab } from "@material-ui/core";

const Register = () => {
  const [newUser, setNewUser] = useState({username: "", password: "", email: "", firstName: "", lastName: ""} as RegisterModel)
  const dispatch = useDispatch();
  const history = useHistory();

 const error = useSelector(errorState);

  const handleChange = (e: any) => {
    const {name, value} = e.target;
    console.log(e.target);
    setNewUser({
      ...newUser, [name]: value
    });
    e.target = undefined;
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
    })
}


  return (
    <>
    <Form  className='crud-form' >
        <h2><b>Registration</b></h2>
        <Form.Group >
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
        <Fab variant="extended" onClick={registerNewUser}  style={{color:"#7D7687" , background: "#4E3E61"}} > 
        Register
        </Fab>
        </Form.Group>
        {error.showError && <Alert variant="danger">{error.errorMsg}</Alert>}
      </Form>
   </>
  );
};

export default Register;
