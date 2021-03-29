import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import Particles from '../../components/particles/particles';
import TempPfp from '../../images/Astronaut.png';
import './Account.css';

function Account() {
    const [info, setInfo] = useState({
        username: '',
        name: '',
        email: '',
        major: ''
    });

    const [share, setShare] = useState(false);

    useEffect(() => {
        async function getUserInfo() {
            const userEmail = currentEmail();
            const userInfo = await UserInfo(userEmail);
            setInfo(userInfo.data);
        }
        getUserInfo();
        console.log(info);
    }, [])

    return (
        <div id="Account">
            <Particles />
            <div id="prof-pic-and-name">
                <ReactRoundedImage
                    image={TempPfp}
                    roundedColor="white"
                    imageWidth="120"
                    imageHeight="120"
                    roundedSize="8"
                />
                <h1 className="username">{ info.username }</h1>
            </div>
            <hr className="lines" />
            <div id="profile">
                <h2>Profile</h2>
                <div id="profile-content">
                    <Row>
                        <Col xs={2} md={1}>
                            <h5>Name:</h5>
                        </Col>
                        <Col>
                            <h5>{ info.name }</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} md={1}>
                            <h5>Email:</h5>
                        </Col>
                        <Col>
                            <h5>{ info.email }</h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={2} md={1}>
                            <h5>Major:</h5>
                        </Col>
                        <Col>
                            <h5>{ info.major }</h5>
                        </Col>
                    </Row>
                </div>
                <Button id="edit-profile-btn">Edit Profile</Button>
            </div>
            <hr className="lines" />
            <div id="jobs-applied-to">
                <h2>Jobs Applied To</h2>
                <Row>
                    <Col xs={3} md={4}>
                        <h5>Job Title</h5>
                    </Col>
                    <Col xs={2} md={2}>
                        <h5>Company</h5>
                    </Col>
                    <Col xs={3} md={2}>
                        <h5>Date Applied</h5>
                    </Col>
                    <Col xs={2} md={2}>
                        <h5>Status</h5>
                    </Col>
                    <Col xs={2} md={2}>
                        <h5>Delete</h5>
                    </Col>
                </Row>
            </div>
            <hr className="lines" />
            <div id="resume">
                <h2>Resume</h2>
                <Row>
                    <Col xs={6} md={6}>
                        <h5>Insert Resume Name Here.pdf</h5>
                    </Col>
                    <Col xs={6} md={6}>
                        <h5>Allow Others to View Resume?</h5>
                    </Col>
                </Row>
                <Row>
                    <Col xs={6} md={6}>
                        <Button id="upload-resume-btn">Upload Resume</Button>
                    </Col>
                    <Col xs={6} md={6}>
                    <DropdownButton
                        id="dropdown-basic-button"
                        menuAlign="left"
                        title={ share ? 'Yes' : 'No' }
                    >
                        <Dropdown.Item onClick={() => setShare(true)}>Yes</Dropdown.Item>
                        <Dropdown.Item onClick={() => setShare(false)}>No</Dropdown.Item>
                    </DropdownButton>
                    </Col>
                </Row>
            </div>
        </div>
    );
}

export default Account;