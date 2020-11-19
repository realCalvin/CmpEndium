import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'

function Home(){
    return(
        <div>
            <Container>
                <Row lg={12} className="align-items-center">
                    <Col lg={6}>
                        <div>
                            <p style={{ fontSize: "40px"}}>Land Your Next Job Efficiently</p>
                            <p style={{ fontSize: "20px"}}> We pull job listings from multiple websites</p>
                            <Button style={{backgroundColor: "#FF97C9"}}>Get started</Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <div>
                            <img 
                                src="Astronaut.png" 
                                alt="astronaut" 
                                width="500px" 
                                height="500px"
                            />
                        </div>
                    </Col>
                </Row>
            </Container>
            
        </div>
    )
}

export default Home;