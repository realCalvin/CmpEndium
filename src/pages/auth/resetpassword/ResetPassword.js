import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Row, InputGroup, FormControl } from 'react-bootstrap';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { UserInfo } from '../../../api/UserInfo';
import { resetPasswordCode, validPasswordCode, setPassword as resetPassword } from '../../../api/Auth';
import Lottie from 'react-lottie';
import UFOData from '../../../images/lottie/ufo';
import Wave from '../../../components/wave/Wave';
import './ResetPassword.css';

function ResetPassword() {
    const history = useHistory();
    const UFO = {
        loop: true,
        autoplay: true,
        animationData: UFOData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [confirmationCode, setConfirmationCode] = useState('');
    const [resetState, setResetState] = useState(1);
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmationError, setConfirmationError] = useState('');

    function handleChangeEmail(e) {
        setEmail(e.target.value);
        setEmailError('');
    }

    function handleChangePassword(e) {
        setPassword(e.target.value);
    }

    function handleChangeConfirmPassword(e) {
        setConfirmPassword(e.target.value);
    }

    function handleChangeConfirmationCode(e) {
        setConfirmationCode(e.target.value);
        setConfirmationError('');
    }

    const handleValidPassword = () => {
        let validPassword = true;
        if (password !== confirmPassword) {
            setPasswordError('Passwords do not match');
        } else if (password.length < 6) {
            setPasswordError('Password must be greater than 6 characters');
        } else {
            setPasswordError('');
        }
        return validPassword;
    };

    async function handleValidConfirmationCode() {
        const res = await validPasswordCode(email, confirmationCode);
        if (res.data.error === 'invalid') {
            setConfirmationError('Invalid confirmation code.');
            return false;
        } else if (res.data.error === 'expire') {
            setConfirmationError('Expired confirmation code.');
            return false;
        }
        return true;
    }

    async function handleResetClick(e) {
        e.preventDefault();
        let res = await UserInfo(email);
        if (res.data.error) {
            setEmailError('Email not found.');
        } else {
            resetPasswordCode(email);
            setResetState(2);
        }
    }

    async function handleResetSubmit(e) {
        e.preventDefault();
        if (handleValidPassword() && await handleValidConfirmationCode()) {
            await resetPassword(email, password);
            history.push('/signin');
            window.location.reload(false);
        }
    }

    function ResetBox1() {
        return (
            <div id="reset-password-box">
                <form id="reset-password-form" onSubmit={handleResetClick}>
                    <h4>Reset Password</h4>
                    <Row>
                        <p className="input-label">Email Address</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faEnvelope} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="email" id="form-email-address" onChange={handleChangeEmail} name="email" value={email} required />
                        </InputGroup>
                    </Row>
                    <Row className="signin-error-message">
                        {(emailError.length) ? <p>Error: {emailError}</p> : ''}
                    </Row>
                    <Row>
                        <button type="submit" className="form-signup-btn btn-hover-effect">Next</button>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-login-form-row">
                    <p>Already have an account? <Link to="signup">Sign In</Link></p>
                    <p>Don't have an account? <Link to="resetpassword">Sign Up</Link></p>
                </Row>
            </div>
        );
    }

    function ResetBox2() {
        return (
            <div id="reset-password-box">
                <form id="reset-password-form" onSubmit={handleResetSubmit}>
                    <h4>Reset Password</h4>
                    <Row>
                        <p className="input-label">New Password</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faLock} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="password" id="form-password" onChange={handleChangePassword} name="password" value={password} required />
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
                            <FormControl type="password" id="form-confirm-password" onChange={handleChangeConfirmPassword} name="confirmPassword" value={confirmPassword} required />
                        </InputGroup>
                    </Row>
                    <Row className="signup-error-message">
                        {(passwordError.length) ? <p>Error: {passwordError}</p> : ''}
                    </Row>
                    <Row>
                        <p className="input-label">Confirmation Code</p>
                        <InputGroup className="mb-3">
                            <InputGroup.Prepend>
                                <InputGroup.Text>
                                    <FontAwesomeIcon className="signup-fa-icon" icon={faEnvelope} />
                                </InputGroup.Text>
                            </InputGroup.Prepend>
                            <FormControl type="text" id="form-confirm-password" onChange={handleChangeConfirmationCode} name="confirmationCode" value={confirmationCode} required />
                        </InputGroup>
                    </Row>
                    <Row className="signup-error-message">
                        {(confirmationError.length) ? <p>Error: {confirmationError}</p> : ''}
                    </Row>
                    <Row id="input-info">
                        <p>Note: Please check your inbox and spam folder for confirmation codes</p>
                    </Row>
                    <Row>
                        <button type="submit" className="form-signup-btn btn-hover-effect">Reset</button>
                    </Row>
                </form>
                <hr></hr>
                <Row className="bottom-signup-form-row">
                    <p>Already have an account? <Link to="signin">Sign In</Link></p>
                </Row>
            </div>
        );
    }

    return (
        <div id="ResetPassword">
            <AnimatePresence>
                <motion.div
                    initial={{ x: 300, opacity: 0.5, zIndex: 2 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -300, opacity: 0.5 }}
                >
                    {resetState === 1
                        ? <AnimatePresence>
                            <motion.div
                                initial={{ x: 300, opacity: 0.5, zIndex: 2 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0.5 }}
                            >
                                {ResetBox1()}
                            </motion.div>
                        </AnimatePresence>
                        : <AnimatePresence>
                            <motion.section
                                initial={{ x: -300, opacity: 0.5, zIndex: 2 }}
                                animate={{ x: 0, opacity: 1 }}
                                exit={{ x: -300, opacity: 0.5 }}
                            >
                                {ResetBox2()}
                            </motion.section>
                        </AnimatePresence>
                    }
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

export default ResetPassword;
