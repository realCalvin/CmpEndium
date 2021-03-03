import React, { useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";
import Lottie from 'react-lottie';
import SignupBox1 from './SignupBox1';
import SignupBox2 from './SignupBox2';
import Wave from '../../../components/wave/Wave';
import UFOData from '../../../images/lottie/ufo';
import './Signup.css';

function Signup() {

    const UFO = {
        loop: true,
        autoplay: true,
        animationData: UFOData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [toggle, setToggle] = useState(true);

    return (
        <div id="Signup">

            { toggle ?
                <AnimatePresence>
                    <motion.div
                        initial={{ x: 300, opacity: 0.5, zIndex: 2 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0.5 }}
                    >
                        <SignupBox1 setToggle={setToggle} />
                    </motion.div>
                </AnimatePresence>
                :
                <AnimatePresence>
                    <motion.section
                        id="sign-box-2"
                        initial={{ x: -300, opacity: 0.5, zIndex: 2 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: 300, opacity: 0.5 }}
                    >
                        <SignupBox2 setToggle={setToggle} />
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