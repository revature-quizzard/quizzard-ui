import { useState } from "react";
import { createdSetSearch } from "../../Remote/setService";
import { Row, Col, Container, Button } from "react-bootstrap";
import SetList from './SetList';
import { useDispatch } from "react-redux";
import { setSetList } from '../../StateSlices/Sets/setListSlice';


export function Sets() {

  const dispatch = useDispatch();
  
  // const [createdSetElement, setCreatedSetElement] = useState(undefined as unknown as CardSet[] || undefined);
  const [showList, setShowList] = useState(false);

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