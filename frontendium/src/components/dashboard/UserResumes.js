import React, { useState, useEffect } from 'react';
import { Row, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import { uploadResume } from '../../api/AWS';
import { saveResume } from '../../api/Resume';
import './UserResumes.css';

function UserResumes() {
    const [resume, setResume] = useState(undefined);
    const [emptySubmit, setEmptySubmit] = useState(false);
    const [share, setShare] = useState(false);
    const [submitResume, setSubmitResume] = useState(true);
    const [info, setInfo] = useState({
        username: '',
        name: '',
        email: '',
        major: ''
    });

    const email = currentEmail();

    useEffect(() => {
        async function getUserInfo() {
            const userEmail = currentEmail();
            const userInfo = await UserInfo(userEmail);
            setInfo(userInfo.data);
        }
        getUserInfo();
    }, []);

    function handleResumeUpload(event) {
        setEmptySubmit(false);
        if (event.target.files[0].type !== 'application/pdf') {
            setSubmitResume(false);
        } else {
            setSubmitResume(true);
            setResume(event.target.files);
        }
    }

    function handleResumeSubmit() {
        if (resume) {
            // upload resume to s3 bucket
            const reader = new FileReader();
            reader.readAsDataURL(resume[0]);
            reader.onload = async e => {
                const json = JSON.stringify({
                    dataURL: reader.result
                });
                const base64 = JSON.parse(json).dataURL;
                const newBase64 = base64.replace('data:application/pdf;base64,', '');
                const res = await uploadResume(newBase64, email, info.major);
                // save resume to mongodb
                const resumeData = {
                    link: res.data.s3Url,
                    uploadDate: res.data.uploadDate,
                    email: email,
                    major: info.major
                };
                await saveResume(resumeData);
            };
        } else {
            setEmptySubmit(true);
        }
    }

    return (
        <div id="UserResumes">
            <Row id="resume-upload-input">
                <label id="file-upload">
                    <input type="file" onChange={handleResumeUpload} />
                </label>
            </Row>
            <Row>
                <Button id="upload-resume-btn" onClick={handleResumeSubmit} disabled={!submitResume}>Upload Resume</Button>
            </Row>
            <Row>
                {!submitResume
                    ? <span style={{ color: 'red' }}>Please submit a pdf file</span>
                    : ''
                }
                {(emptySubmit)
                    ? <span style={{ color: 'red' }}>Please upload a pdf file</span>
                    : ''
                }
            </Row>
            <Row>
                <DropdownButton
                    id="dropdown-basic-button"
                    menuAlign="left"
                    drop="down"
                    title={share ? 'Yes' : 'No'}
                >
                    <Dropdown.Item onClick={() => setShare(true)}>Yes</Dropdown.Item>
                    <Dropdown.Item onClick={() => setShare(false)}>No</Dropdown.Item>
                </DropdownButton>
            </Row>
        </div>
    );
}

export default UserResumes;
