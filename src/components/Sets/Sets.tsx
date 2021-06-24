import { useState } from "react";


import { Row, Col, Container, ListGroup, Button, FormControl, Table } from "react-bootstrap";
import { CardSet } from "../../Models/CardSet";
import { createdSetSearch } from "../../Remote/set-service";
import SetList from './SetList';
import { useDispatch, useSelector } from "react-redux";
import { setSetList, setListState } from '../../StateSlices/Sets/setListSlice';
import { createStudySetSlice, createStudySetState } from '../../StateSlices/Sets/createStudySetsSlice';
// ANN: need to import state object and reducer for creating study sets, they've been moved into the Sets folder


export function Sets() {

  const dispatch = useDispatch();
  const allSetsState = useSelector(setListState);
  const createSetState = useSelector(createStudySetState);
  // ANN: need to create a variable as above using the state object exported from the create study set slice

  let username = "revature";
  const [createdSetElement, setCreatedSetElement] = useState(undefined as unknown as CardSet[] || undefined);
  const [showList, setShowList] = useState(false);

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
  let createStudySet = async (e: any) => {
    e.preventDefault();
    let response = await createStudySet(createdSetElement);
    setCreatedSetElement({setName: "", isPublic: false} as unknown as CardSet[]);
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
              <Button type="submit" onClick={createdSetsSearch} >Your Sets</Button>
            </Col>
            <Col className="col-1" style={{ padding: "2px" }}>
              <Button type="submit" onClick={publicSetsSearch} >All Public Sets</Button>
            </Col>
        </Row>
        <Row>
          <Col>
            <Form>
              <Form.Group>
                <Form.Label>Set Name: </Form.Label>
                <Form.Control name="setName" value={CardSet.setName} onChange={onchange} type="text" placeholder="Set Name"  />
              </Form.Group>
              <Form.Group>
                <Form.Check type = "checkbox" label="Do you want this study set to be public?" checked = {isPublic} onChange={e=>setIsPublic(e.target.checked)}></Form.Check>
              </Form.Group>
              <Form.Group className="text-center">
                <Button onClick={createStudySet}>Create</Button>
              </Form.Group>
            </Form>
          </Col>
        </Row>
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