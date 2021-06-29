import { Row, Col } from "react-bootstrap";
import Welcome from "./Welcome";
import Register from "../Register/Register"

const Main = () => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col md={8} style={{ height: "100%" }}>
        <Welcome />
      </Col>
      <aside className="col-md-4">
        <Register />
      </aside>
    </Row>
  );
};

export default Main;
