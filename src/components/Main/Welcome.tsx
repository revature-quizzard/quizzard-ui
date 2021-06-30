import { Row, Col } from "react-bootstrap";

const Welcome = () => {
  return (
    <>
      <Row className="d-flex justify-content-center align-items-center mt-4 mb-4">
        <Col lg={10} className="welcomeBanner">
          <img className="welcomeBanner" src="qwizzard.gif" alt="qwizzard quizzard qwizard kwizzard" height="80px" />
        </Col>
      </Row>
      <Row>
        <Col className="bg-light">
          <Row>
            <Col>
              <div className="instructionsWelcome">
                Please login or register using the links in the navigation at
                the top of the screen to gain access to some exciting features!
              </div>
            </Col>
          </Row>
          <Row>
            <Col>
              <div className="featuresHeader">
                Features included with this application:
              </div>
            </Col>
          </Row>{" "}
          <Row>
            <Col>
              <div className="featuresList">
                <ul>
                  <li>Create your own Flashcards to study with</li>
                  <li>Add those flashcards to a study set</li>
                  <li>
                    Create multiple choice quiz from those study sets to test
                    your knowledge
                  </li>
                  <li>
                    View other users public study sets to share your knowledge
                  </li>
                </ul>
              </div>
            </Col>
            </Row>
        </Col>
      </Row>
    </>
  );
};

export default Welcome;
