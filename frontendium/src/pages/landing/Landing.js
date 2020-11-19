import './Landing.css';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import Particles from '../../components/particles/particles';
import Astronaut from '../../images/Astronaut.png';

function Landing() {
    return (
        <div id="Landing">
            <Particles />
            <Container>
                <Row className="align-items-center">
                    <Col className="landing-content" lg={6}>
                        <div>
                            <p style={{ fontSize: "40px" }}>Land Your Next Job Efficiently</p>
                            <p style={{ fontSize: "20px" }}> We pull job listings from multiple websites</p>
                            <Button style={{ backgroundColor: "#FF97C9" }}>Get Started</Button>
                        </div>
                    </Col>
                    <Col className="landing-content" lg={6}>
                        <div>
                            <Image
                                src={Astronaut}
                                alt="astronaut"
                                width="500px"
                                height="500px"
                                fluid
                            />
                        </div>
                    </Col>
                </Row>
            </Container>

        </div>
    )
}

export default Landing;