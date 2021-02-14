import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Link } from "react-router-dom";
import { Row, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Wave from '../../../components/wave/Wave';
import UFOData from '../../../images/lottie/ufo';
import './Signin.css';

function Signin() {

    const UFO = {
        loop: true,
        autoplay: true,
        animationData: UFOData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div id="Login">
            <div id="login-auth-box">
                <form id="login-form">
                    <h4>Sign in</h4>
                    <Row>
                        <p className="input-label">Email Address</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="login-fa-icon" icon={faUser} />
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
                                    <FontAwesomeIcon className="login-fa-icon" icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl id="form-password" />
                        </InputGroup>
                    </Row>
                    <Row>
                        <button type="submit" id="form-login-btn">Login</button>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-login-form-row">
                    <p>Forgot your password? <Link to="forgotpassword">Reset password</Link></p>
                </Row>
            </div>
            <div className="auth-lottie-img">
                <Lottie
                    options={UFO}
                    height={300}
                    width={300}
                />
            </div>
            <Wave />
        </div>
    );
}

export default Signin;