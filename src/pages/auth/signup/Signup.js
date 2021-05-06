import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { register } from '../../../api/Auth';
import Lottie from 'react-lottie';
import SignupBox1 from './SignupBox1';
import SignupBox2 from './SignupBox2';
import Wave from '../../../components/wave/Wave';
import UFOData from '../../../images/lottie/ufo';
import './Signup.css';

function Signup() {
    const history = useHistory();

    const [toggle, setToggle] = useState(true);
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        name: '',
        major: ''
    });

    const UFO = {
        loop: true,
        autoplay: true,
        animationData: UFOData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    function handleUserInfo(userInfo) {
        setUser({
            username: userInfo.username,
            email: userInfo.email,
            password: userInfo.password,
            name: userInfo.name,
            major: user.major
        });
    }

    function handleUserMajor(userInfo) {
        setUser({
            ...user,
            major: userInfo.major
        });
    }

    async function handleRegister() {
        const registerStatus = await register(user);
        if (registerStatus.data.success) {
            history.push('/');
            window.location.reload(false);
        }
    }

    return (
        <div id="Signup">
            { toggle
                ? <AnimatePresence>
                    <motion.div
                        initial={{ x: 300, opacity: 0.5, zIndex: 2 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0.5 }}
                    >
                        <SignupBox1 setToggle={setToggle} user={user} handleUserInfo={handleUserInfo} />
                    </motion.div>
                </AnimatePresence>
                : <AnimatePresence>
                    <motion.section
                        id="sign-box-2"
                        initial={{ x: -300, opacity: 0.5, zIndex: 2 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0.5 }}
                    >
                        <SignupBox2 setToggle={setToggle} user={user} handleUserMajor={handleUserMajor} handleRegister={handleRegister} />
                    </motion.section>
                </AnimatePresence>
            }
            <div className="auth-lottie-img">
                <Lottie
                    options={UFO}
                    height={300}
                    width={300}
                />
            </div>
            <Wave />
        </div >
    );
}

export default Signup;
