import './Landing.css';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import Particles from '../../components/particles/particles';
import Astronaut from '../../images/Astronaut.png';
import Find from '../../images/Find.png';
import Build from '../../images/Build.png';
import Track from '../../images/Track.png';

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
                <Row className="align-items-center" style={{paddingTop: "150px"}}>
                    <Col lg={4}>
                        <Card className="info-card">
                            <Container>
                                <Row className="align-items-center">
                                    <Col>
                                        <Card.Img src={Find} width="50" />
                                    </Col>
                                    <Col>
                                        <Card.Title className="info-card-title">
                                            Find Your Dream Job
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="info-card">
                            <Container>
                                <Row className="align-items-center">
                                    <Col>
                                        <Card.Img src={Build} />
                                    </Col>
                                    <Col>
                                        <Card.Title className="info-card-title">
                                            Build Your Resume
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                    <Col lg={4}>
                        <Card className="info-card">
                            <Container>
                                <Row className="align-items-center">
                                    <Col>
                                        <Card.Img src={Track} />
                                    </Col>
                                    <Col>
                                        <Card.Title className="info-card-title">
                                            Track Your Job Applications
                                        </Card.Title>
                                    </Col>
                                </Row>
                            </Container>
                        </Card>
                    </Col>
                </Row>
                <Row style={{paddingTop: "75px"}}>
                    <Col lg={6}>
                        <p style={{ fontSize: "30px" }}>Find Your Dream Job</p>
                        <ul style={{ fontSize: "20px "}}>
                            <li>Filter out the job listings to find the job of your choice</li>
                            <li>Read through the job description and requirements</li>
                            <li>See if it is a fit for you</li>
                            <li>Hit apply to be redirected to the company's website to apply for this position</li>
                        </ul>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <p style={{ fontSize: "20px", textAlign: "center" }}>Astronaut Gang (Replace With Actual Pic Later)</p>
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
                <Row style={{paddingTop: "75px"}}>
                    <Col lg={6}>
                        <div>
                            <p style={{ fontSize: "20px", textAlign: "center" }}>Astronaut Gang (Replace With Actual Pic Later)</p>
                            <Image
                                src={Astronaut}
                                alt="astronaut"
                                width="500px"
                                height="500px"
                                fluid
                            />
                        </div>
                    </Col>
                    <Col lg={6}>
                        <p style={{ fontSize: "30px" }}>Build Your Resume</p>
                        <ul style={{ fontSize: "20px "}}>
                            <li>Reference the resume of others who are or have been in your position to better your own</li>
                            <li>Cater your resume to fit the specific role of which you are applying for</li>
                            <li>Share your resume to help others who are and will be in your current position</li>
                        </ul>
                    </Col>
                </Row>
                <Row style={{paddingTop: "75px"}}>
                    <Col lg={6}>
                        <p style={{ fontSize: "30px" }}>Track Your Job Applications</p>
                        <ul style={{ fontSize: "20px "}}>
                            <li>Add the jobs you applied to onto your profile</li>
                            <li>Keep track of the status of the jobs you applied to</li>
                        </ul>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <p style={{ fontSize: "20px", textAlign: "center" }}>Astronaut Gang (Replace With Actual Pic Later)</p>
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