
import { Button, Col, Row } from "react-bootstrap";
import AddFlashcardModal from "../StudySets/AddFlashcardModal";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { clearStudySet, currentlyLoading, studySetState } from "../../state-slices/study-set/study-set-slice";
import { authState } from "../../state-slices/auth/auth-slice"
import { useDispatch, useSelector } from "react-redux";
import StudyListTable from "../StudySets/StudyListTable";
import { isLoading } from "../../state-slices/flashcard/flashcard-slice";
import { Redirect, useHistory } from "react-router-dom";
import PublicSets from "./PublicSets";
import {makeStyles, Theme} from "@material-ui/core/styles";

/**
 * @author Sean Taba
 * @returns {JSX.Element}
 * renders the studySets page
 */
const StudyHub = () => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showCards, setShowCards] = useState(false);
  const [useList, setUseList] = useState(false); //true = public, false = owned

  const state = useAppSelector(studySetState);
  const user = useSelector(authState);
  const history = useHistory();

  const useStyles = makeStyles((theme:Theme) => ({
    divTable: {
      textAlign: 'center',
      width: '70%',
      marginLeft: 200,
    },
    paper: {


      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    }
  }));

  useEffect(() => {
    if (showCards) {
      document.getElementById("selected-study-set-title").scrollIntoView();
    }
  });

  const renderFlashcardTable = () => {
    setShowCards(true);
  };

  const modalHandler = () => {
    setShowModal((prevState) => !prevState);
  };

  // These functions set which list is displayed below based on button presses.
  const publicSetMode = (e: any) => {
    setShowCards(false);
    dispatch(currentlyLoading());
    dispatch(clearStudySet());
    setUseList(true);
  };

  const ownedSetMode = (e: any) => {
    setShowCards(false);
    dispatch(currentlyLoading());
    dispatch(clearStudySet());
    setUseList(false);
  };

  const goToStudy = (e: any) => {
    e.preventDefault();
    dispatch(isLoading());
    history.push("/card");
  };

  const goToQuiz = (e: any) => {
    e.preventDefault();
    if (state.selectedStudySet.cards.length < 4) {
      alert("Quizzes need at least 4 questions. SORRY!!");
    } else {
      history.push("/quiz");
    }
  };

  const createSet = (e: any) => {
    e.preventDefault();
    history.push("/sets");
  };
  const classes = useStyles();

  return (

      <>
        <div className={classes.divTable}>
        <PublicSets/>
      </div>
      </>


  )
};

export default StudyHub;
