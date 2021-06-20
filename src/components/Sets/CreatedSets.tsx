import { Row, Col, Container, ListGroup } from "react-bootstrap";
import { CardSet } from "../../models/cardSet";
import { createdSetSearch } from "../../remote/set-service";

const CreatedSets = async () => {

  let accountId = 1;
  let createdSetElement = await createdSetSearch(accountId);
  
  return (
    <Container>
      <Row>
        <Col>
          <ListGroup>
            {createdSetElement?.map((cardSet: CardSet) => {
              return (
                <ListGroup.Item style={{ margin: "10px" }}>
                  {cardSet.setName}
                </ListGroup.Item>
              )
            })}
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default CreatedSets;