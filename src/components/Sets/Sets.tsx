import { useState } from "react";
import { Row, Col, Container, ListGroup, Button, FormControl, Table } from "react-bootstrap";
import { CardSet } from "../../models/cardSet";
import { createdSetSearch } from "../../remote/set-service";

export function Sets() {

  let username = "revature";
  const [createdSetElement, setCreatedSetElement] = useState(undefined as unknown as CardSet[] || undefined);

  let createdSetsSearch = async (e: any) => {
    e.preventDefault();
    const getData = async () => {
      let response = await createdSetSearch(username);
      setCreatedSetElement(response.data);
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
      createdSetElement
      &&
      <Container>
        <Row>
          <Col>
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Set Name</th>
                  <th>Access</th>
                </tr>
              </thead>
              <tbody>
              {createdSetElement.map((cardSet: CardSet) => (
                  <tr>
                    <td>cardSet.setName</td>
                    <td>{cardSet.isPublic 
                    ? "Public"
                    : "Private"} </td>
                  </tr>
              ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
      }
    </>
  );
};

export default Sets;