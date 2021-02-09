import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { Row, Col, InputGroup, Form, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons'
import './Signup.css';

function Signup() {

    return (
        <div id="Signup">
            <div id="signup-auth-box">
                <form id="signup-form">
                    <h4>Sign up</h4>
                    <Row>
                        <Col id="signup-form-name">
                            <p className="input-label">Name</p>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon className="signup-fa-icon" icon={faUser} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="form-email-address" />
                            </InputGroup>
                        </Col>
                        <Col>
                            <p className="input-label">Username</p>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon className="signup-fa-icon" icon={faUser} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl id="form-email-address" />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row>
                        <p className="input-label">Email Address</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faEnvelope} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="form-email-address" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <p className="input-label">Password</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="form-password" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <p className="input-label">Confirm Password</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="form-password" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <button type="submit" id="form-signup-btn">Register</button>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-signup-form-row">
                    <p>Already have an account? <Link to="signin">Sign In</Link></p>
                </Row>
            </div>
        </div>
    );
}

export default Signup;