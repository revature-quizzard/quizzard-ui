import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./components/Main/Main";
import Navigation from "./components/NavBar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FlashCard from "./components/Flashcards/Flashcard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import UpdateAccontInfo from "./components/UpdateAccountInfo/UpdateAccountInfo";
import Sets from "./components/Sets/Sets";
import {FlipCard} from "./components/Flashcards/FlipCard";
import {StudyableSet} from "./components/Sets/StudyableSet"



function App() {

  // @ts-ignore
    return (
    <Router>
      <Navigation />
      <Container className="app-container">
        <Switch>
          <Route exact path="/">
            <Main />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/flashcards">
            <FlashCard/>
          </Route>
          <Route exact path="/sets">
            <Sets />
          </Route>
          <Route exact path="/update">
              <UpdateAccontInfo />
              </Route>
          <Route exact path="/sets">
            <Sets />
          </Route>
          <Route exact path="/study">
            <StudyableSet />
          </Route>
          <Route exact path="/createQuiz">
            <CreateQuiz/>
          </Route>
        </Switch>
      </Container>
      <footer>
        <Row className="bg-dark text-light">
          <Col>
            <div className="footerText">Copyright Revature LLC. &copy;</div>
          </Col>
        </Row>
      </footer>
    </Router>
  );
}

export default App;
