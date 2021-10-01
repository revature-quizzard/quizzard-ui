import { useEffect, useState } from "react";
import { subjectsState,} from "../../state-slices/subject/subject-slice";
import { CardDto } from "../../models/request-models/card-dto";
import { useDispatch, useSelector } from "react-redux";
import { Card } from "../../models/cards";
import { getCards } from "../../remote/card-service";
import { useHistory } from 'react-router-dom'

import { appendCardToStudySet } from "../../state-slices/study-set/study-set-slice";
import { Set } from "../../models/set";
import TextField from "@material-ui/core/TextField";



/**
 * Top of Sets function. Who wrote this?
 * @constructor
 */
function CreateSet() {
  const dispatch = useDispatch();
  const history = useHistory();

  const stateFlashcards = useSelector(flashcardsState);
  const subjects = useSelector(subjectsState);

  const [setName, setSetName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [currentSet, setCurrentSet] = useState( );
  const [localFlashcards, setLocalFlashcards] = useState([]);
  const [checkedBoxes, setCheckedBoxes] = useState([]);
  

  /**
   * get headers with token for auth based axios calls
   *
   */
  const headers = {
    "Content-Type": "application/json",
    Authorization: localStorage.getItem("Authorization"),
  };

  /**
   * Acquires the current cards and subejcts that already exist in the database.
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  useEffect(() => {
   
    const getFlashcards = async () => {
      let set = await createSet();
      dispatch(setSet(set));
    };
    getFlashcards();

  }, []);

  /**
   * Local flashcards are set here along with calls to persist study sets
   * @author 'Kevin Chang'
   */
  let handleCreateStudySet = () => {
    handleLocalFlashcards();
    handlePersistStudySet();
    history.push("/study");
    //history.go(0);//re-render component?
  };

  /**
   * Sets local flashcards based on checked boxes
   * @author 'Kevin Chang'
   */
  let handleLocalFlashcards = () => {
    checkedBoxes.forEach((element) => {
      localFlashcards.push(stateFlashcards.flashCards[parseInt(element)]);
    });
  };

  /**
   * Local flashcards are set here along with calls to persist study sets
   * @author 'Ann-Aisha Louis-Charles'
   * @author 'Christopher Levano'
   * @author 'Kevin Chang'
   */
  let handlePersistStudySet = async () => {
    let setObj: CardSetRequest = {
      setName,
      isPublic,
      localFlashcards,
    };


   

  /**
   * Handles acquisition of a card's associated subject
   * @param card Typed as Flashcard
   * @returns Name of subject
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
  const handleSubject = (card: FlashcardDTO) => {
   
    let currentSubject = subjects.subjects[card.subjectId - 1].name;

    return currentSubject;
  };

  /**
   * Keeps track of checked cards for persistign selected cards into the database
   * @author 'Kevin Chang'
   */
  const handleChecked = (e: any) => {
    let currentChecked = checkedBoxes;

    if (e.target.checked) {
      currentChecked.push(e.target.id);
    } else {
      currentChecked.splice(currentChecked.indexOf(e.target.id), 1);
    }
    
    
  };

  return (


    <>
    <TextField id="filled-basic" label="Filled" variant="filled" />

    </>
    // <>
    //   <Container style={{ marginTop: "10px" }}>
    //     <Row className="sticky-top">
    //       <Col md={10} className="mobile-semitransparent">
    //         <Form>
    //           <Form.Group>
    //             <Form.Label>Set Name: </Form.Label>
    //             <Form.Control
    //               id="setName"
    //               name="setName"
    //               value={setName}
    //               onChange={(e) => setSetName(e.target.value)}
    //               type="text"
    //               placeholder="Set Name"
    //             />
    //           </Form.Group>
    //           <Form.Group>
    //             <Form.Check
    //               type="checkbox"
    //               label="Do you want this study set to be public?"
    //               checked={isPublic}
    //               onChange={(e) => setIsPublic(e.target.checked)}
    //             ></Form.Check>
    //           </Form.Group>
    //         </Form>
    //       </Col>
    //       <Col md={2}>
    //         <Form.Group className="text-center">
    //           <Button
    //             className="create-study-set-button"
    //             onClick={handleCreateStudySet}
    //           >
    //             Create Study Set
    //           </Button>
    //         </Form.Group>
    //       </Col>
    //     </Row>
    //     <Row>
    //       <CardDeck>
    //         {stateFlashcards.flashCards.map((card, index: any) => {
    //           return (
    //             <Col key={index} xs={12} md={6} lg={4} style={{ padding: "1rem" }}>
    //               <Card>
    //                 <Card.Header>{card.question}</Card.Header>
    //                 <Card.Body>
    //                   <Card.Title>
    //                     <Card.Subtitle>Answer:</Card.Subtitle>
    //                   </Card.Title>
    //                   <Card.Body>
    //                     <Card.Text>{card.answer}</Card.Text>
    //                   </Card.Body>
    //                 </Card.Body>
    //                 <Card.Footer className="text-center">
    //                   {/* This is under the assumption that ID's match with the index */}
    //                   <Card.Text>{handleSubject(card)}</Card.Text>
    //                   <Form.Check
    //                     id={"" + stateFlashcards.flashCards.indexOf(card)}
    //                     className="add-card-checkbox"
    //                     name={
    //                       "Question" + stateFlashcards.flashCards.indexOf(card)
    //                     }
    //                     key={"Key" + stateFlashcards.flashCards.indexOf(card)}
    //                     type="checkbox"
    //                     label="Add Card"
    //                     onChange={handleChecked}
    //                   ></Form.Check>
    //                 </Card.Footer>
    //               </Card>
    //             </Col>
    //           );
    //         })}
    //       </CardDeck>
    //     </Row>
    //   </Container>
    // </>
  );
}

export default Sets;
