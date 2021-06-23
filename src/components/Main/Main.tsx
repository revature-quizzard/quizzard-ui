import { Row, Col } from "react-bootstrap";
import Welcome from "./Welcome";

const Main = () => {
  return (
    <Row className="d-flex justify-content-center align-items-center">
      <Col lg={10} style={{ height: "100vh" }}>
        {!auth.isAuthenticated ? <Welcome /> : <LandingPage />}
      </Col>
    </Row>
  );
};

export default Main;
