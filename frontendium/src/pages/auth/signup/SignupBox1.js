import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { checkUniqueUsername, checkUniqueEmail } from '../../../api/Auth';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import './Signup.css';

function SignupBox1(props) {
    const [userInfo, setUserInfo] = useState({
        username: props.user.username,
        email: props.user.email,
        password: props.user.password,
        name: props.user.name
    });

    const [confirmPassword, setConfirmPassword] = useState({ confirmPassword: '' });

    const [usernameErrorMessage, setUsernameErrorMessage] = useState('');
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleChange = e => {
        setUserInfo({
            ...userInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleConfirmPassword = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleValidPassword = () => {
        let validPassword = true;
        if (userInfo.password !== confirmPassword) {
            setPasswordErrorMessage('Passwords do not match');
            validPassword = false;
        } else if (userInfo.password.length < 6) {
            setPasswordErrorMessage('Password must be greater than 6 characters');
            validPassword = false;
        } else {
            setPasswordErrorMessage('');
        }
        return validPassword;
    };

    const handleValidInput = () => {
        let valid = true;

        // check if all input fields are valid
        const signupInputs = ['form-name', 'form-username', 'form-email-address',
            'form-password', 'form-confirm-password'];
        signupInputs.forEach(input => {
            const inputField = document.getElementById(input);
            if (!inputField.checkValidity()) {
                valid = false;
            }
        });

        return valid;
    };

    async function handleUniqueUsernameEmail() {
        let valid = true;

        // check if unique username and email
        const uniqueUsername = await checkUniqueUsername(userInfo.username);
        const uniqueEmail = await checkUniqueEmail(userInfo.email);
        if (uniqueUsername.data != null) {
            setUsernameErrorMessage('Username already exists');
            valid = false;
        } else {
            setUsernameErrorMessage('');
        }
        if (uniqueEmail.data != null) {
            setEmailErrorMessage('Email already exists');
            valid = false;
        } else {
            setEmailErrorMessage('');
        }

        return valid;
    }

    async function handleValid(e) {
        e.preventDefault();

        const validPassword = handleValidPassword();
        const validInput = handleValidInput();
        const uniqueUsernameEmail = await handleUniqueUsernameEmail();

        if (validPassword && validInput && uniqueUsernameEmail) {
            props.handleUserInfo(userInfo);
            props.setToggle(false);
        }
    }

    return (
        <div className="signup-box" id="SignupBox1">
            <div id="signup-auth-box">
                <form id="signup-form" onSubmit={handleValid}>
                    <h4>Sign Up</h4>
                    <Row>
                        <Col>
                            <p className="input-label">Username</p>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon className="signup-fa-icon" icon={faUser} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="form-username" onChange={handleChange} name="username" value={userInfo.username} required />
                            </InputGroup>
                        </Col>
                        <Col id="signup-form-name">
                            <p className="input-label">Name</p>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text>
                                        <FontAwesomeIcon className="signup-fa-icon" icon={faUser} />
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <FormControl type="text" id="form-name" onChange={handleChange} name="name" value={userInfo.name} required />
                            </InputGroup>
                        </Col>
                    </Row>
                    <Row className="signup-error-message">
                        {(usernameErrorMessage.length) ? <p>Error: {usernameErrorMessage}</p> : ''}
                    </Row>
                    <Row>
                        <p className="input-label">Email Address</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faEnvelope} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="email" id="form-email-address" onChange={handleChange} name="email" value={userInfo.email} required />
                        </InputGroup>
                    </Row>
                    <Row className="signup-error-message">
                        {(emailErrorMessage.length) ? <p>Error: {emailErrorMessage}</p> : ''}
                    </Row>
                    <Row>
                        <p className="input-label">Password</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="password" id="form-password" onChange={handleChange} name="password" value={userInfo.password} required />
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
                            <FormControl type="password" id="form-confirm-password" onChange={handleConfirmPassword} name="confirmPassword" required />
                        </InputGroup>
                    </Row>
                    <Row className="signup-error-message">
                        {(passwordErrorMessage.length) ? <p>Error: {passwordErrorMessage}</p> : ''}
                    </Row>
                    <Row>
                        <button type="submit" className="form-signup-btn btn-hover-effect">Next</button>
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

export default SignupBox1;
