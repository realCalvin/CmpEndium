import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Link } from "react-router-dom";
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Account.css';

function Account() {
    return (
        <div id="Account">
            <div id="prof-pic-and-name">
                <span>
                    hi
                </span>
            </div>
            <hr className="lines" />
            <div id="profile">
                <h2>Profile</h2>
            </div>
            <hr className="lines" />
            <div id="jobs-applied-to">
                <h2>Jobs Applied To</h2>
            </div>
            <hr className="lines" />
            <div id="resume">
                <h2>Resume</h2>
            </div>
        </div>
    );
}

export default Account;