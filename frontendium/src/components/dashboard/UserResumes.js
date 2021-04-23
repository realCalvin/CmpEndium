import React, { useState, useEffect } from 'react';
import { Row, Col, Button, Dropdown, DropdownButton } from 'react-bootstrap';
import { Button as AntdButton } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import { uploadResume } from '../../api/AWS';
import { saveResume, getUserResume } from '../../api/Resume';
import party from 'party-js';
import './UserResumes.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function UserResumes() {
    const [resume, setResume] = useState(undefined);
    const [userResumes, setUserResumes] = useState([]);
    const [emptySubmit, setEmptySubmit] = useState(false);
    const [submitResume, setSubmitResume] = useState(true);
    const [successResume, setSuccessResume] = useState(false);
    const [share, setShare] = useState(false);
    const [info, setInfo] = useState({
        username: '',
        name: '',
        email: '',
        major: ''
    });

    const email = currentEmail();

    useEffect(async () => {
        async function getUserInfo() {
            const userEmail = currentEmail();
            const userInfo = await UserInfo(userEmail);
            setInfo(userInfo.data);
        }
        getUserInfo();
        const resumes = await getUserResume(currentEmail());
        setUserResumes(resumes.data.reverse());
    }, []);

    function handleResumeUpload(event) {
        setEmptySubmit(false);
        if (event) {
            if (event.target.files[0].type !== 'application/pdf') {
                setSubmitResume(false);
            } else {
                setSubmitResume(true);
                setResume(event.target.files);
            }
        }
    }

    function handleResumeSubmit(e) {
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

            // animation
            const siteColors = ['#a864fd', '#29cdff', '#78ff44', '#ff718d', '#fdff6a', '#ff7373'];
            party.element(e.target, {
                color: siteColors,
                count: party.variation(25, 0.5),
                size: party.minmax(6, 10),
                velocity: party.minmax(-300, -600),
                angularVelocity: party.minmax(6, 9)
            });
            setSuccessResume(true);
        } else {
            setEmptySubmit(true);
        }
    }

    const resumeList = userResumes.map((resume, itr) => {
        const date = new Date(resume.uploadDate);
        return (
            <Col className='user-resume' key={itr}>
                <Row className='user-resume-btn'>
                    <AntdButton>View {date.toLocaleString()}</AntdButton>
                </Row>
                <Row>
                    <Document
                        file={resume.link}
                        loading='Loading...'
                    >
                        <Page
                            renderTextLayer={false}
                            pageNumber={1}
                            height='550'
                        />
                    </Document>
                </Row>
            </Col >
        );
    });

    return (
        <div id="UserResumes">
            <Row>
                {resumeList}
            </Row>
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
                {(successResume)
                    ? <span style={{ color: 'green' }}>Successfully uploaded resume</span>
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
