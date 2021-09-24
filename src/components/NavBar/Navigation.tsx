/**
 * @Co-Author: Sean Taba
 */

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  authState,
  logoutUserReducer,
  loginFormReducer,
  registerFormReducer,
} from "../../state-slices/auth/auth-slice";
import { useSelector, useDispatch } from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authState);
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

  return (
    <Navbar bg="dark" expand="md">
      <Container id="nav-container">
        <Navbar.Brand href="#" style={{ color: "white" }}>
          <img
            src="https://i.imgur.com/PAm216P.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
            alt="Qwizzard Hat Logo"
          />{" "}
          Q W I Z Z A R D
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!auth.isAuthenticated && (
              <>
                <div
                  className="text-light ml-2 mr-2 navLink authLink"
                  onClick={handleLogin}
                >
                  Login
                </div>

                <div
                  className="text-light ml-2 mr-2 navLink authLink"
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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
