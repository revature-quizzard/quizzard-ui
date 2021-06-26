import { Container, Row, Col, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { setListState } from '../../state-slices/sets/set-list-slice';
import { CardSet } from '../../models/card-set';

export default function SetList() {

    const allSetsState = useSelector(setListState);

    return (
        <Container>
        <Row>
          <Col>
          {allSetsState.cardSetList.length === 0 && <p>No sets available.</p>}
          {allSetsState.cardSetList.length > 0 && (
            <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Set Name</th>
                <th>Access</th>
              </tr>
            </thead>
            <tbody>
            {allSetsState.cardSetList.map((cardSet: CardSet) => (
                <tr>
                  <td>cardSet.setName</td>
                  <td>{cardSet.isPublic 
                  ? "Public"
                  : "Private"} </td>
                </tr>
            ))}
            </tbody>
          </Table>
          )}
          </Col>
        </Row>
      </Container>
    )
}
