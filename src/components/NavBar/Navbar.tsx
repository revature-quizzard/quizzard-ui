import { Navbar, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <Navbar bg="dark" expand="lg">
      <Container>
        <Link to="/">
          <Navbar.Brand className="text-primary" href="#home">
            Qwizzard
          </Navbar.Brand>
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
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
