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
            <Container id="landing-container">
                <Row id="landing-page-1" className="align-items-center">
                    <Col className="landing-content" lg={6}>
                        <div>
                            <p style={{ fontSize: "40px" }}>Land Your Next Job Efficiently</p>
                            <p style={{ fontSize: "20px" }}> We pull job listings from multiple websites</p>
                            <Button href="#search" id="landing-page-btn" style={{ backgroundColor: "#FF97C9" }}>Get Started</Button>
                        </div>
                    </Col>
                    <Col className="landing-content" lg={6}>
                        <Image
                            src={Astronaut}
                            id="landing-astronaut-img"
                            alt="astronaut"
                            fluid
                        />
                    </Col>
                    <Row id="landing-page-card">
                        <Col className="info-card-col" s={4}>
                            <a href="#search" style={{ textDecoration: "none" }}>
                                <Card className="info-card">
                                    <Container>
                                        <Row className="align-items-center">
                                            <Col lg={4}>
                                                <Card.Img src={Find} />
                                            </Col>
                                            <Col lg={8}>
                                                <Card.Title className="info-card-title">
                                                    Search For Jobs
                                            </Card.Title>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </a>
                        </Col>
                        <Col className="info-card-col" s={4}>
                            <a href="#build" style={{ textDecoration: "none" }}>
                                <Card className="info-card">
                                    <Container>
                                        <Row className="align-items-center">
                                            <Col lg={4}>
                                                <Card.Img src={Build} />
                                            </Col>
                                            <Col lg={8}>
                                                <Card.Title className="info-card-title">
                                                    Build Your Resume
                                                </Card.Title>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </a>
                        </Col>
                        <Col className="info-card-col" s={4}>
                            <a href="#track" style={{ textDecoration: "none" }}>
                                <Card className="info-card">
                                    <Container>
                                        <Row className="align-items-center">
                                            <Col lg={4}>
                                                <Card.Img src={Track} />
                                            </Col>
                                            <Col lg={8}>
                                                <Card.Title className="info-card-title">
                                                    Track Applications
                                            </Card.Title>
                                            </Col>
                                        </Row>
                                    </Container>
                                </Card>
                            </a>
                        </Col>
                    </Row>
                </Row>
                <Row id="search" style={{ paddingTop: "75px" }}>
                    <Col lg={6}>
                        <p style={{ fontSize: "30px" }}>Find Your Dream Job</p>
                        <ul style={{ fontSize: "20px " }}>
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
                <Row id="build" style={{ paddingTop: "75px" }}>
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
                        <ul style={{ fontSize: "20px " }}>
                            <li>Reference the resume of others who are or have been in your position to better your own</li>
                            <li>Cater your resume to fit the specific role of which you are applying for</li>
                            <li>Share your resume to help others who are and will be in your current position</li>
                        </ul>
                    </Col>
                </Row>
                <Row id="track" style={{ paddingTop: "75px" }}>
                    <Col lg={6}>
                        <p style={{ fontSize: "30px" }}>Track Your Job Applications</p>
                        <ul style={{ fontSize: "20px " }}>
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