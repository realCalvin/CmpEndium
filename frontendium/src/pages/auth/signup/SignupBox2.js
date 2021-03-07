import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, Button, Accordion, Card, ListGroup } from 'react-bootstrap';
import './Signup.css';
import { jobMapping } from '../../../components/jobs/Jobs';

function SignupBox2(props) {

    const [jobInfo, setJobInfo] = useState({ job: props.user.major });

    const [jobErrorMessage, setJobErrorMessage] = useState('');

    const handleJobChange = (e) => {
        e.preventDefault();
        setJobInfo({ job: e.target.innerText });
    }

    const handleJobDelete = (e) => {
        e.preventDefault();
        setJobInfo({ job: '' });
    }

    const handleValidJob = () => {
        if (props.user.major === '') {
            setJobErrorMessage('A role must be selected before registering');
            return false;
        }
        setJobErrorMessage('');
        return true;
    }

    const handleRegister = (e) => {
        e.preventDefault();
        if (handleValidJob()) {
            props.handleRegister();
        }
    }

    useEffect(() => {
        props.handleUserMajor({ major: jobInfo.job });
        // eslint-disable-next-line
    }, [jobInfo]);

    var jobDropdownButtons = jobMapping.map((jobItem, itr) => {
        var dropdownItems = jobItem[1].map((dropdownItem, dropdownItr) => {
            return (
                <ListGroup.Item onClick={handleJobChange} id={dropdownItem} eventKey={dropdownItr} key={dropdownItr} action>
                    {dropdownItem}
                </ListGroup.Item>
            );
        });
        return (
            <Card key={itr} className="signup-job-card">
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey={jobItem[0]}>
                        {jobItem[0]}
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey={jobItem[0]}>
                    <ListGroup defaultActiveKey={'#link' + itr}>
                        {dropdownItems}
                    </ListGroup>
                </Accordion.Collapse>
            </Card>
        );
    });

    return (
        <div className="signup-box" id="SignupBox2">
            <div id="signup-auth-box">
                <form id="signup-form" onSubmit={handleRegister}>
                    <h4>Select Role</h4>
                    {(jobInfo.job === '') ?
                        ''
                        :
                        <p id="signup-job-info">
                            {jobInfo.job}
                            <button id="signup-job-x-btn" onClick={handleJobDelete}>X</button>
                        </p>
                    }
                    <Row>
                        <Accordion className="signup-job-accordion">
                            {jobDropdownButtons}
                        </Accordion>
                    </Row>
                    <Row className="signup-error-message" id="signup-error-box-2">
                        {(jobErrorMessage !== '') ? <p>Error: {jobErrorMessage}</p> : ''}
                    </Row>
                    <Row>
                        <Col md={6}>
                            <button className="form-signup-btn btn-hover-effect" onClick={() => { props.setToggle(true) }}>Back</button>
                        </Col>
                        <Col md={6}>
                            <button type="submit" className="form-signup-btn btn-hover-effect">Register</button>
                        </Col>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-signup-form-row">
                    <p>If you do not see your role <a href="/">Contact Us</a>!</p>
                    <p>Already have an account? <Link to="signin">Sign In</Link></p>
                </Row>
            </div>
        </div>
    );
}

export default SignupBox2;