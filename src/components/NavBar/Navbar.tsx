/**
 * @Co-Author: Sean Taba
 */

import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import {authState, logoutUserReducer} from "../../state-slices/auth/auth-slice";
import {useSelector, useDispatch} from "react-redux";

const Navigation = () => {
  const dispatch = useDispatch();
  const auth = useSelector(authState);
  // bring authState into nav bar to show hide compenents

  const handleLogout = () => {
    dispatch(logoutUserReducer());
  }
  return (
    <Navbar bg="dark" expand="md">
      <Container>
        <Link to="/" className="navbrand">
          <img src="logo.png" alt="Qwizzard lizzard logo" style={{"height": "40px", "width": "40px"}} />
          <h1>wizzard</h1>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {!auth.isAuthenticated &&
              <>
                <Link id="" className="text-light ml-2 mr-2 navLink authLink" to="/login">
                  Login
                </Link>

                <Link id="" className="text-light ml-2 mr-2 navLink authLink" to="/register">
                Register
                </Link>
              </>
            }
            {auth.isAuthenticated &&
              <>
                <Link id="" className="text-light ml-2 mr-2 navLink" to="/studysets">
                  Study
                </Link>

                <Link id="" className="text-light ml-2 mr-2 navLink" to="/update">
                  Update
                </Link>
                <Link id="" className="text-light ml-2 mr-2 navLink" to="/sets">
                  Create
                </Link>

                <a id="logout" className="text-light ml-2 mr-2 navLink authLink" onClick={handleLogout}>Logout</a>
              </>
            }
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
