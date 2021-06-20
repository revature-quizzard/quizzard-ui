import {Col, Row, Table} from "react-bootstrap";
import StudySetData from "./StudySetData";

const AvailableStudySets = () => {

    return (
        <Row>
            <Col>
                <Table hover>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Studyset Topic</th>
                        <th>Studyset Name</th>
                        <th>Studyset Creator</th>
                    </tr>
                    </thead>
                        <StudySetData />
                </Table>
            </Col>
        </Row>
    )
};

export default AvailableStudySets;