import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./components/Main/Main";
import Navigation from "./components/NavBar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FlashCard from "./components/Flashcards/Flashcard";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
<<<<<<< HEAD
import Sets from "./components/Sets/Sets";
=======
import {FlipCard} from "./components/Flashcards/FlipCard";



import {  setFlashcards} from "./StateSlices/Flashcard/flashcardsSlice"
import { setSubjects } from "./StateSlices/Subject/subjectsSlice"
import { useDispatch } from "react-redux";
import {useEffect} from "react";
import { getSubs } from "./Remote/subjectService";
import {  getCards } from "./Remote/cardService";
>>>>>>> f0f9376df02a25fa6caa96aac8dd0671092eae6c

function App() {
  const dispatch = useDispatch();

  //Placed to collect existing flashcards and subjects into the Redux application state eagerly
  //makes it possible to navigate to Study Flashcards for now...
  // useEffect(()=> {
  //   console.log("FLIPCARD populate flashcards")
   
  //   const getFlashcards = async () => {
  //     let cards = await getCards();
  //     dispatch(setFlashcards(cards))
  //   };
  //   getFlashcards();

  //   const getSubjects = async () => {
  //     let subjects = await getSubs();
  //     dispatch(setSubjects(subjects));
  //   }
  //   getSubjects();

  // }, [])

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
          <Route exact path="/createQuiz">
            <CreateQuiz />
          </Route>
<<<<<<< HEAD
          <Route exact path="/sets">
            <Sets />
=======
          <Route exact path="/study">
            <FlipCard />
>>>>>>> f0f9376df02a25fa6caa96aac8dd0671092eae6c
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
