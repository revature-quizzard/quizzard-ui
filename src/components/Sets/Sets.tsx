import { useEffect, useState } from "react";
import { Row, Col, Container, Button, Form, Card, CardDeck } from "react-bootstrap";
import { setFlashcards, flashcardsState } from "../../state-slices/flashcard/flashcard-slice";
import { setSubjects, subjectsState } from "../../state-slices/subject/subject-slice"
import { CardSet } from "../../models/card-set";
import { createdSetSearch, createStudySet } from "../../remote/set-service";
import SetList from './SetList';
import { useDispatch, useSelector } from "react-redux";
import { setSetList, addSet, setListState } from '../../state-slices/sets/set-list-slice';
import { createStudySetState } from '../../state-slices/sets/create-study-sets-slice';
import {Flashcard} from "../../models/flashcard";
import { getCards } from "../../remote/card-service";
import { getSubs } from "../../remote/subject-service";


export function Sets() {

  const dispatch = useDispatch();
  const allSetsState = useSelector(setListState);
  const createSetState = useSelector(createStudySetState);

  let username = "revature";
  const stateFlashcards = useSelector(flashcardsState);
  const subjects = useSelector(subjectsState);
  const [createdSetElement, setCreatedSetElement] = useState(undefined as unknown as CardSet || undefined);
  const [showList, setShowList] = useState(false);
  const [setName, setSetName] = useState("");
  const [isPublic, setIsPublic] = useState(false);
  const [localFlashcards, setLocalFlashcards] = useState([]); 
  const [checkedBoxes, setCheckedBoxes] = useState([]);

    /**
   * Acquires the current cards and subejcts that already exist in the database.
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
     useEffect(()=> {
      console.log("populate flashcards")
     
      const getFlashcards = async () => {
        let cards = await getCards();
        dispatch(setFlashcards(cards))
      };
      getFlashcards();
  
      const getSubjects = async () => {
        let subjects = await getSubs();
        dispatch(setSubjects(subjects));
      }
      getSubjects();

    }, [])

  /**
   * When "Your Sets" button is clicked, request to retrieve all created sets for account will be sent.
   * Will display a list of the results. 
   * @param e event when button is clicked
   * @author Austin Knauer
   * @author Vinson Chin
   */
  let createdSetsSearch = async (e: any) => {
    e.preventDefault();

    const headers = {
    'Content-Type': 'application/json',
    'Authorization': localStorage.getItem("Authorization")
    }
    
    let response = await createdSetSearch(headers);
    dispatch(setSetList(response));

      // needs to be updated eventually to actually check whether results were successfully fetched from the api
    setShowList(true);
  }

  /**
   * Local flashcards are set here along with calls to persist study sets
   * @author 'Kevin Chang'
   */
  let handleCreateStudySet = () => {
    handleLocalFlashcards();
    handlePersistStudySet();
  }

 /**
   * Sets local flashcards based on checked boxes
   * @author 'Kevin Chang'
   */
  let handleLocalFlashcards = () =>{
    checkedBoxes.forEach(element => {
      localFlashcards.push(stateFlashcards.flashCards[parseInt(element)]);
    });
  }

 /**
   * Local flashcards are set here along with calls to persist study sets
   * @author 'Ann-Aisha Louis-Charles'
   * @author 'Christopher Levano'
   * @author 'Kevin Chang'
   */
  let handlePersistStudySet = async () => {
    let setObj: CardSet = {
      setName,
      isPublic,
      localFlashcards
    };

    dispatch(addSet(setObj));

    setCreatedSetElement(setObj);

    let response = await createStudySet(createdSetElement);

    setCreatedSetElement({setName: "", isPublic: false, flashcards: {}} as unknown as CardSet);
    setLocalFlashcards([]);
    
  }

  /**
   * Handles acquisition of a card's associated subject
   * @param card Typed as Flashcard
   * @returns Name of subject
   * @author 'Kevin Chang'
   * @author 'Giancarlo Tomasello'
   */
   const handleSubject = (card: Flashcard) => {

    let currentSubject = subjects.subjects[parseInt(card.subjectId)-1].name;

    return currentSubject;
  }

   /**
   * Keeps track of checked cards for persistign selected cards into the database
   * @author 'Kevin Chang'
   */
  const handleChecked = (e: any) =>{
    let currentChecked = checkedBoxes;
  
    if(e.target.checked){
      currentChecked.push(e.target.id);
    }
    else{
      currentChecked.splice(currentChecked.indexOf(e.target.id), 1);
    }

    console.log(currentChecked);
    
  }

  let publicSetsSearch = async (e: any) => {

  } 

  // ANN: need to add another conditional render statement like with SetList below that renders
  // a form with an input for the study set name, a dropdown input with public/private options,
  // and a button with an onclick that calls the method you'll create to persist the new set to the database
  // You'll also have to add another button insidd the top Container element below that has its own onClick
  // method which sets showList to false and sets a new piece of state you'll have to create in this component
  // using useState that tracks whether the create study set form is currently open (just a simple boolean value
  // called creatingSet or something along those lines). Then you'll use that piece of state to as the condition
  // in the conditional render I mentioned at the beginning of this comment
  
  return (
    <>
      <Container style={{ marginTop: "10px" }}>
        <Row className="justify-content-center">
            <Col className="col-1" style={{ padding: "2px" }}>
              <Button type="submit" onClick={createdSetsSearch} >Your Sets (Not used yet)</Button>
            </Col>
            <Col className="col-1" style={{ padding: "2px" }}>
              <Button type="submit" onClick={publicSetsSearch} >All Public Sets (Not used yet)</Button>
            </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Set Name: </Form.Label>
                <Form.Control id="setName" name="setName" value={setName} onChange={(e) => setSetName(e.target.value)} type="text" placeholder="Set Name"  />
              </Form.Group>
              <Form.Group>
                <Form.Check type = "checkbox" label="Do you want this study set to be public?" checked={isPublic} onChange={e=>setIsPublic(e.target.checked)}></Form.Check>
              </Form.Group>
              
            </Form>
          </Col>
        </Row>
        <Row>
          <CardDeck>
            {stateFlashcards.flashCards.map((card) => {
              return (
                <Col xs={8} md={6} lg={4} style={{ padding: '1rem' }}>
                  <Card>
                      <Card.Header>{card.question}</Card.Header>
                      <Card.Body>
                        <Card.Title>
                          <Card.Subtitle>Answer:</Card.Subtitle>
                        </Card.Title>
                        <Card.Body>
                          <Card.Text>{card.answer}</Card.Text>
                        </Card.Body>
                      </Card.Body>
                      <Card.Footer className="text-center">
                        {/* This is under the assumption that ID's match with the index */}
                        <Card.Text>{handleSubject(card)}</Card.Text>
                          <Form.Check id={""+stateFlashcards.flashCards.indexOf(card)} className="add-card-checkbox" name={"Question" + stateFlashcards.flashCards.indexOf(card)} key={"Key"+stateFlashcards.flashCards.indexOf(card)} type="checkbox" label="Add Card" onChange={handleChecked}></Form.Check>
                      </Card.Footer>
                  </Card>
                </Col>
              )
            })}
          </CardDeck>
      </Row>
        <Container>
          <Row>
            <Col>
              <Form>
                <Form.Group className="text-center">
                  <Button className="create-study-set-button" onClick={handleCreateStudySet}>Create Study Set</Button>
                </Form.Group>
              </Form>
            </Col>
          </Row>
        </Container>
      </Container>
      {
      showList
      &&
      <SetList />
      }
    </>
  );
};

export default Sets;