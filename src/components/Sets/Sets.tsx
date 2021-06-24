import { useEffect, useState } from "react";
import { Row, Col, Container, ListGroup, Button, FormControl, Table, Form, Card, CardDeck } from "react-bootstrap";
import { isLoading, isLoaded, addFlashcard, setFlashcards, flashcardsState } from "../../StateSlices/Flashcard/flashcardsSlice";
import { setSubjects, subjectsState } from "../../StateSlices/Subject/subjectsSlice"
import { CardSet } from "../../Models/CardSet";
import { createdSetSearch, createStudySet } from "../../Remote/set-service";
import SetList from './SetList';
import { useDispatch, useSelector } from "react-redux";
import { setSetList, addSet, setListState } from '../../StateSlices/Sets/setListSlice';
import { createStudySetSlice, createStudySetState } from '../../StateSlices/Sets/createStudySetsSlice';
import {Flashcard} from "../../Models/Flashcard";
import { getCards } from "../../Remote/cardService";
import { getSubs } from "../../Remote/subjectService";
// ANN: need to import state object and reducer for creating study sets, they've been moved into the Sets folder


export function Sets() {

  const dispatch = useDispatch();
  const allSetsState = useSelector(setListState);
  const createSetState = useSelector(createStudySetState);
  // ANN: need to create a variable as above using the state object exported from the create study set slice

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

  let createdSetsSearch = async (e: any) => {
    e.preventDefault();
    const getData = async () => {
      let response = await createdSetSearch(username);
      dispatch(setSetList(response.data));

      // needs to be updated eventually to actually check whether results were successfully fetched from the api
      setShowList(true);
    };
    getData();
  }

  // ANN: need to add a method here that makes a request to the database with the newly created flashcard set using your axios method
  let handleCreateStudySet = () => {
    handleLocalFlashcards();
    handlePersistStudySet();
  }


  let handleLocalFlashcards = () =>{
    checkedBoxes.forEach(element => {
      console.log(parseInt(element));
      localFlashcards.push(stateFlashcards.flashCards[parseInt(element)]);
      console.log(localFlashcards);
    });
  }

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

  const handleChecked = (e: any) =>{
    let currentChecked = checkedBoxes;
    
    console.log("Checked: " + e.target.checked);
    console.log("Key: " + e.target.key);
    console.log("ID: " + e.target.id);
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