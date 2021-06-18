import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container } from "react-bootstrap";
import Main from "./components/Main/Main";
import Navigation from "./components/NavBar/Navbar";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import FlashCard from "./components/Flashcards/Flashcard";

function App() {
  return (
    <Router>
      <Navigation />
      <Container>
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
            <FlashCard />
          </Route>
        </Switch>
      </Container>
    </Router>
  );
}

export default App;
