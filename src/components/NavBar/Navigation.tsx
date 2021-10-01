/**
 * @Co-Author: Sean Taba
 */
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  authState,
  logoutUserReducer,
  loginFormReducer,
  registerFormReducer,
} from "../../state-slices/auth/auth-slice";


import { useSelector, useDispatch } from "react-redux";
import { Menu } from '@material-ui/core';

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  let cueIco ='https://iconifier.net/iconified/20210929013103_Qwizzard/favicon.ico';
  // bring authState into nav bar to show hide compenents

  const handleLogout = () => {
    dispatch(logoutUserReducer());
    localStorage.removeItem("Authorization");
  };

  const handleLogin = () => {
    dispatch(loginFormReducer());
  }

  const handleRegister = () => {
    dispatch(registerFormReducer());
  }

  // for menu pop up
  const handleClick = () => {
    dispatch(registerFormReducer());
  }

  return (
    <>
    
    

    <AppBar id='sidebar'  >
      <Toolbar className="sidebar-header">
        <Navbar.Brand href="#"  style={{ color: "#7D7687" }}>
        {/* <img
            src= "https://iconifier.net/iconified/20210929014910_Screenshot%202021-09-28%20114743/favicon.ico"
            width="20"
            height="20"
            className="d-inline-block align-top"
            alt="Qwizzard Hat Logo"
          />{" "} */}
          Q W I Z Z A R D
        </Navbar.Brand>
      
        </Toolbar>
          <Nav  id='nav-login-reg'>
            {!auth.isAuthenticated && (
              <>
                 <div
              
                 // onClick={handleLogin}
                >
                   <Link to="/game">
                  game
                </Link>
                 
                  </div>

                <div
              
             
                  onClick={handleRegister}
                >
                  Register
                </div>
              </>
            )}
            {auth.isAuthenticated && (
              <>
                <Link className="text-light ml-2 mr-2 navLink" to="/study">
                  Study
                </Link>

                <Link className="text-light ml-2 mr-2 navLink" to="/update">
                  Update
                </Link>

                <Link id="" className="text-light ml-2 mr-2 navLink" to="/sets">
                  Create
                </Link>

                <Link
                  id="logout"
                  className="text-light ml-2 mr-2 navLink authLink"
                  onClick={handleLogout}
                  to="/"
                >
                  Logout
                </Link>
              </>
            )}
            
          </Nav>
      
    </AppBar>
    
   
    </>
  );
};

export default Navigation;
function anchorEl(anchorEl: any): boolean {
  throw new Error('Function not implemented.');
}

