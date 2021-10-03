/**
 * @Co-Author: Sean Taba
 */

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Main from "./components/Main/Main";
import Navigation from "./components/NavBar/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import StudyHub from "./components/DiscoverSets/StudyHub";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import UpdateAccountInfo from "./components/UpdateAccountInfo/UpdateAccountInfo";
import Sets from "./components/Sets/Sets";
import { FlipCard } from "./components/Flashcards/FlipCard";
import {ConfirmSignup} from "./components/Login/ConfirmSignup";
import {Amplify} from "aws-amplify";
import {COGNITO} from "./config/aws";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { errorState, hideErrorMessage } from "./state-slices/error/errorSlice";
<<<<<<< HEAD
import ViewComment from "./components/Forum/ViewComments";
=======
import UserProfileContainer from "./components/UserProfile/UserProfileContainer";
<<<<<<< HEAD
>>>>>>> 4f432fa8393c06f91ea97533a56a1f6e213972b5
=======
import ViewSetPage from "./components/DiscoverSets/ViewSetPage";
>>>>>>> dev

Amplify.configure({
    aws_cognito_region: COGNITO.REGION,
    aws_user_pools_id: COGNITO.USER_POOL_ID,
    aws_user_pools_web_client_id: COGNITO.APP_CLIENT_ID
})

function App() {
  const error = useSelector(errorState);
  const dispatch = useDispatch();

  // @ts-ignore
  return (
    <Router>
      <Navigation />
      <Container className="app-container" id="app-container">
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
          <Route exact path="/sets">
            <ViewSetPage/>
          </Route>
          <Route exact path="/update">
            <UpdateAccountInfo />
          </Route>
          <Route exact path="/card">
            <FlipCard />
          </Route>
          <Route exact path="/quiz">
            <CreateQuiz />
          </Route>
          <Route exact path="/study">
            <StudyHub />
          </Route>
          <Route exact path="/confirmation">
            <ConfirmSignup />
          </Route>
<<<<<<< HEAD
          <Route exact path="/forum/thread/comment">
            <ViewComment />
=======
          <Route exact path="/profile">
            <UserProfileContainer />
>>>>>>> 4f432fa8393c06f91ea97533a56a1f6e213972b5
          </Route>



        </Switch>
      </Container>
      <Snackbar open={error.showError} autoHideDuration={3000} onClose={() => {dispatch(hideErrorMessage())}}>
        <Alert onClose={() => {dispatch(hideErrorMessage())}} severity={error.errorSeverity} sx={{ width: '100%' }}>
          {error.errorMsg}
        </Alert>
      </Snackbar>
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
