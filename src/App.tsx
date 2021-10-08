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
import UpdateAccountInfo from "./components/UpdateAccountInfo/UpdateAccountInfo";
import Sets from "./components/Sets/Sets";
import Game from "./components/Multiplayer/Game";
import GameLounge from "./components/Multiplayer/GameLounge";
import { FlipCard } from "./components/Flashcards/FlipCard";
import SubforumHandler from "./components/Forum/Subforum";
import {ConfirmSignup} from "./components/Login/ConfirmSignup";
import {Amplify} from "aws-amplify";
import {COGNITO} from "./config/aws";
import { Alert, Snackbar } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { errorState, hideErrorMessage } from "./state-slices/error/errorSlice";

import ViewComment from "./components/Forum/ViewComments";

import UserProfileContainer from "./components/UserProfile/UserProfileContainer";
import AddThread from './components/Forum/AddThread';
import GetThreads from "./components/Forum/GetThread";
import ViewSetPage from "./components/DiscoverSets/ViewSetPage";
import CreateSetModal from "./components/UserProfile/CreateSetModal";
import UserSets from "./components/UserProfile/UserSets";
import ViewUserCards from "./components/UserProfile/UserCards";



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
    <Router >
      <Navigation />
     {/* className="app-container" id="app-container" */}
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
          <Route exact path="/sets">
            <ViewSetPage/>
          </Route>
          <Route exact path="/update">
            <UpdateAccountInfo />
          </Route>
          <Route exact path="/card">
            <FlipCard />
          </Route>
          <Route exact path="/userCards">
          <ViewUserCards />
        </Route>
          <Route exact path="/study">
            <StudyHub />
          </Route>
          <Route exact path="/lounge">
            <GameLounge />
          </Route>
          <Route exact path="/multiplayer">
            <Game />
            </Route>
          <Route exact path="/confirmation">
            <ConfirmSignup />
          </Route>
          <Route exact path="/forum">
            <SubforumHandler />
          </Route>
          <Route exact path="/forum/thread/*">
            <ViewComment />
          </Route>
          <Route path="/forum/*">
            <GetThreads />
          </Route>
          <Route exact path="/profile">
            <UserProfileContainer />
          </Route>





        </Switch>
      </Container>
      <Snackbar open={error.showError} autoHideDuration={3000} onClose={() => {dispatch(hideErrorMessage())}}>
        <Alert onClose={() => {dispatch(hideErrorMessage())}} severity={error.errorSeverity} sx={{ width: '100%' }}>
          {error.errorMsg}
        </Alert>
      </Snackbar>

    </Router>
  );
}

export default App;
