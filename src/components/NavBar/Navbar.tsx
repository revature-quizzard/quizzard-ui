import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {

  // bring authState into nav bar to show hide compenents
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link to="/" className="text-primary">
            Qwizzard
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
             <Link id="navLink" className="text-light ml-2 mr-2" to="/login">
              Login
            </Link>
            <Link id="navLink" className="text-light ml-2 mr-2" to="/register">
              Register
            </Link>
            <Link
              id="navLink"
              className="text-light ml-2 mr-2"
              to="/flashcards"
            >
              Flashcards
            </Link>
            <Link id="navLink" className="text-light ml-2 mr-2" to="/createQuiz">
              Create Quiz
            </Link>

            <Link id="navLink" className="text-light ml-2 mr-2" to="/update">
              Update
            </Link>
            <Link id="navLink" className="text-light ml-2 mr-2" to="/study">
              Study Flashcards (Temporary)
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
