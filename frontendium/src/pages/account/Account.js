import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Button, Dropdown, DropdownButton, Tab, Tabs } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import TempPfp from '../../images/Astronaut.png';
import './Account.css';

function Account() {
    const [key, setKey] = useState('profile');
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
        <div id="account">         
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
            <div id="content">
                <div id="account-info">
                    <Tabs
                        id="controlled-tab-example"
                        activeKey={key}
                        onSelect={(k) => setKey(k)}
                    >
                        <Tab eventKey="profile" title="Profile">
                            <div id="profile">
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
                        </Tab>
                        <Tab eventKey="job-apps" title="Jobs Applied To">
                            <div id="jobs-applied-to">
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
                        </Tab>
                        <Tab eventKey="resume" title="Resume">
                            <div id="resume" classname="d-flex justify-content-center">
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
                                        drop="down"
                                        title={ share ? 'Yes' : 'No' }
                                    >
                                        <Dropdown.Item onClick={() => setShare(true)}>Yes</Dropdown.Item>
                                        <Dropdown.Item onClick={() => setShare(false)}>No</Dropdown.Item>
                                    </DropdownButton>
                                    </Col>
                                </Row>
                            </div>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}

export default Account;