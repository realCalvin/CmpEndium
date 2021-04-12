import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Button, Dropdown, DropdownButton, Tab, Tabs } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import { uploadResume } from '../../api/AWS';
import TempPfp from '../../images/Astronaut.png';
import './Account.css';

function Account() {
  const [key, setKey] = useState('profile');
  const [resume, setResume] = useState(undefined);
  const [info, setInfo] = useState({
    username: '',
    name: '',
    email: '',
    major: ''
  });
  const [share, setShare] = useState(false);
  const [submitResume, setSubmitResume] = useState(true);

  useEffect(() => {
    async function getUserInfo() {
      const userEmail = currentEmail();
      const userInfo = await UserInfo(userEmail);
      setInfo(userInfo.data);
    }
    getUserInfo();
  }, []);

  function handleResumeUpload(event) {
    if (event.target.files[0].type !== 'application/pdf') {
      setSubmitResume(false);
    } else {
      setSubmitResume(true);
    }
    setResume(event.target.files);
  }

  function handleResumeSubmit() {
    if (resume) {
      const reader = new FileReader();
      reader.readAsDataURL(resume[0]);
      reader.onload = function(e) {
        const json = JSON.stringify({
          dataURL: reader.result
        });
        const base64 = JSON.parse(json).dataURL;
        const newBase64 = base64.replace('data:application/pdf;base64,', '');
        uploadResume(newBase64);
      };
    }
  }

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
                <Button id="edit-major-btn">Change Major</Button>
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
              <div id="resume">
                <h2>Resume</h2>
                <Row>
                  <Col xs={6} md={6}>
                    <input type="file" onChange={handleResumeUpload} />
                  </Col>
                  <Col xs={6} md={6}>
                    <h5>Allow Others to View Resume?</h5>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6} md={6}>
                    <Button id="upload-resume-btn" onClick={handleResumeSubmit} disabled={!submitResume}>Upload Resume</Button>
                    {!submitResume
                      ? <span style={{ color: 'red' }}>Please submit a pdf file</span>
                      : ''
                    }
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
