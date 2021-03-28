import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Button } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import './Account.css';
import TempPfp from '../../images/Astronaut.png';

function Account() {
    const [info, setInfo] = useState();

    useEffect(() => {
        async function getUserInfo() {
            const userEmail = currentEmail();
            const userInfo = await UserInfo(userEmail);
            setInfo(userInfo.data);
        }
        getUserInfo();
    }, [])

    return (
        <div id="Account">
            <div id="prof-pic-and-name">
                <ReactRoundedImage
                    image={TempPfp}
                    roundedColor="white"
                    imageWidth="120"
                    imageHeight="120"
                    roundedSize="8"
                />
                <h1 className="username">hi</h1>
            </div>
            <hr className="lines" />
            <div id="profile">
                <h2>Profile</h2>
                <div id="profile-content">
                    <h5>Name: {info.name}</h5>
                    <h5>Email:</h5>
                    <h5>Major:</h5>
                </div>
                <Button id="edit-profile-btn">Edit Profile</Button>
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