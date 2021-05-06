import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'react-lottie';
import { login } from '../../../api/Auth';
import { Row, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import Wave from '../../../components/wave/Wave';
import UFOData from '../../../images/lottie/ufo';
import './Signin.css';

function Signin() {
    const history = useHistory();

    const UFO = {
        loop: true,
        autoplay: true,
        animationData: UFOData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [user, setUser] = useState({
        email: '',
        password: ''
    });

    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const handleChange = e => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    async function handleLogin(e) {
        e.preventDefault();
        const loginStatus = await login(user);
        if (loginStatus.data.success) {
            history.push('/');
            window.location.reload(false);
        } else {
            if (loginStatus.data.error === 'email') {
                setEmailErrorMessage('Email does not exist');
            } else {
                setEmailErrorMessage('');
            }
            if (loginStatus.data.error === 'password') {
                setPasswordErrorMessage('Password is incorrect');
            } else {
                setPasswordErrorMessage('');
            }
        }
    }

    return (
        <div id="Login">
            <AnimatePresence>
                <motion.div
                    initial={{ x: 300, opacity: 0.5, zIndex: 2 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0.5 }}
                >

                    <div id="login-auth-box">
                        <form id="login-form" onSubmit={handleLogin}>
                            <h4>Sign In</h4>
                            <Row>
                                <p className="input-label">Email Address</p>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon className="login-fa-icon" icon={faUser} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="email" id="form-email-address" onChange={handleChange} name="email" />
                                </InputGroup>
                            </Row>
                            <Row className="signin-error-message">
                                {(emailErrorMessage.length) ? <p>Error: {emailErrorMessage}</p> : ''}
                            </Row>
                            <Row>
                                <p className="input-label">Password</p>
                                <InputGroup className="mb-3">
                                    <InputGroup.Prepend>
                                        <InputGroup.Text>
                                            <FontAwesomeIcon className="login-fa-icon" icon={faLock} />
                                        </InputGroup.Text>
                                    </InputGroup.Prepend>
                                    <FormControl type="password" id="form-password" onChange={handleChange} name="password" />
                                </InputGroup>
                            </Row>
                            <Row className="signin-error-message">
                                {(passwordErrorMessage.length) ? <p>Error: {passwordErrorMessage}</p> : ''}
                            </Row>
                            <Row>
                                <button type="submit" className="btn-hover-effect" id="form-login-btn">Login</button>
                            </Row>
                        </form>
                        <hr></hr>
                        <Row className="bottom-login-form-row">
                            <p>Don't have an account? <Link to="signup">Sign Up</Link></p>
                            <p>Forgot your password? <Link to="resetpassword">Reset password</Link></p>
                        </Row>
                    </div>
                </motion.div>
            </AnimatePresence>
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
