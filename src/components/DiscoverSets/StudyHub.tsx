
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
 * @author Jose Tejada
 * @returns {JSX.Element}
 * renders the studySets page
 */
const StudyHub = () => {


  const useStyles = makeStyles((theme:Theme) => ({
    divTable: {
      textAlign: 'center',
      // width: '70%',
      // marginLeft: 200,
    },
    paper: {


      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 3),
    }
  }));



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
