import { useState } from "react";


import { Row, Col, Container, ListGroup, Button, FormControl, Table } from "react-bootstrap";
import { CardSet } from "../../Models/cardSet";
import { createdSetSearch } from "../../remote/set-service";
import SetList from './SetList';
import { useDispatch, useSelector } from "react-redux";
import { setSetList, setListState } from '../../StateSlices/Sets/setListSlice';


export function Sets() {

  const dispatch = useDispatch();
  const allSetsState = useSelector(setListState);

  let username = "revature";
  // const [createdSetElement, setCreatedSetElement] = useState(undefined as unknown as CardSet[] || undefined);
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

  let publicSetsSearch = async (e: any) => {

  } 
  
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