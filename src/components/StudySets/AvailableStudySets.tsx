/**
 * @Author: Sean Taba
 */

import {Col, Row, Table} from "react-bootstrap";
import StudySetData from "./StudySetData";

const AvailableStudySets = () => {

    return (
        <Row>
            <Col>
                <Table hover>
                    <thead>
                    <tr>
                        <th>StudySet ID</th>
                        <th>Owner Account ID</th>
                        <th>StudySet Name</th>
                        <th>Public</th>
                    </tr>
                    </thead>
                        <StudySetData />
                    {}
                </Table>
            </Col>
        </Row>
    )
};

export default AvailableStudySets;