import React from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { setListState } from '../../StateSlices/Sets/setListSlice';
import { CardSet } from '../../Models/CardSet';

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
