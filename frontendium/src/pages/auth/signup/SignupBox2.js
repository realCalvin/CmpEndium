import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, InputGroup, Button, FormControl, Accordion, Card, ListGroup } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css';
import { jobMapping } from '../../../components/jobs/Jobs';

function SignupBox2(props) {
    var jobDropdownButtons = jobMapping.map((jobItem, itr) => {
        var dropdownItems = jobItem[1].map((dropdownItem, dropdownItr) => {
            return (
                <ListGroup.Item eventKey={dropdownItr} action>
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
                <form id="signup-form">
                    <h4>Select Role</h4>
                    <Row>
                        <Accordion className="signup-job-accordion">
                            {jobDropdownButtons}
                        </Accordion>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <button className="form-signup-btn" onClick={() => { props.setToggle(true) }}>Back</button>
                        </Col>
                        <Col md={6}>
                            <button type="submit" className="form-signup-btn">Register</button>
                        </Col>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-signup-form-row">
                    <p>If you do not see your role <a href="#">Contact Us</a>!</p>
                    <p>Already have an account? <Link to="signin">Sign In</Link></p>
                </Row>
            </div>
        </div>
    );
}

export default SignupBox2;