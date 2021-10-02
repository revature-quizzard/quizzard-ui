
import { Button, Col, Row } from "react-bootstrap";
import AddFlashcardModal from "./AddFlashcardModal";
import { useState, useEffect } from "react";
import { useAppSelector } from "../../store/hooks";
import { clearStudySet, currentlyLoading, setStudySet, studySetState } from "../../state-slices/study-set/study-set-slice";
import { authState } from  "../../state-slices/auth/auth-slice"
import { useDispatch, useSelector } from "react-redux";
import StudyListTable from "./StudyListTable";
import { isLoading } from "../../state-slices/flashcard/flashcard-slice";
import { Redirect, useHistory } from "react-router-dom";
import PublicSets from "./PublicSets";
import { Set } from "../../dtos/Set";
import { Card } from "../../dtos/Card";
import { Tag } from "../../dtos/Tag";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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
  const currentSet = useSelector(studySetState);
  const history = useHistory();

  let userSets : Set[]  = [];
  let targetSet : Set =  {setName: '', isPublic: false, author : '' , tags : [] as Tag[] , set_id : '' , favorites :0 , cards: [] as Card[] , views : 0  , plays : 0 ,studies : 0 } as Set;

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

  const handleSetSelection = (e: any , key: any) =>{

    dispatch(setStudySet(userSets[key]));
  }
  const createSet = (e: any) => {
    e.preventDefault();
    history.push("/sets");
  };
 
  return (

      <>
        <div>set page</div>
        <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <td>Name</td>
            <td align="right">Author</td>
            <td align="right"></td>
            <td align="right">Carbs&nbsp;(g)</td>
            <td align="right">Protein&nbsp;(g)</td>
          </TableRow>
        </TableHead>
        <TableBody>
        {userSets?.map((S : Set , i ) =>{
                           return  <TableRow key={i} >
                                             <td>{S.setName} </td>
                                             <td>{S.author.toString()}</td>
                                             <td>{S.isPublic ? <p style={{color:'#75BC3E'}}>Public</p> : <p style={{color: '#9A0B15'}}>Private</p> }</td>
                                             <td>{S.author.toString()}</td>
                                             <td>{S.cards.length.toString()}</td>
                                             <td> <Button style={{background : ' #4E3E61 ' , color: '#7D7687 '}} variant="light" key={i} onClick={(e) => handleSetSelection( e , i)}> Select</Button></td>
                                            </TableRow> 
                                      })}
        </TableBody>
      </Table>
    </TableContainer>
      
        <PublicSets/>

      </>


  )
};

export default StudyHub;
