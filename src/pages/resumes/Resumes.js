import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Divider, Button as AntdButton, Pagination } from 'antd';
import { Document, Page, pdfjs } from 'react-pdf';
import ResumeNav from './ResumeNav.js';
import ResumeModal from '../../components/resume/ResumeModal';
import Lottie from 'react-lottie';
import CometData from '../../images/lottie/comet';
import Arrow from '../../images/arrow.png';
import { getResumes } from '../../api/Resume';
import './Resumes.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resumes() {
    const Comet = {
        loop: true,
        autoplay: true,
        animationData: CometData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [currentResume, setCurrentResume] = useState({
        email: '',
        link: '',
        major: '',
        uploadDate: '',
        _id: '',
        __v: ''
    });
    const [major, setMajor] = useState('');
    const [resumes, setResumes] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [showModal, setShowModal] = useState(false);

    const resumesPerPage = 12;

    async function retrieveResumes(e) {
        setMajor(e.target.id);
        let resumeList = await getResumes({ major: e.target.id });
        setResumes(resumeList.data.reverse());
        setCurrentPage(1);
    }

    function handleViewModal(resume) {
        setShowModal(true);
        setCurrentResume(resume);
    }

    function handlePagination(current, size) {
        setCurrentPage(current);
    }

    // logic and calculation for the current page indexing
    const indexOfLastResume = currentPage * resumesPerPage;
    const indexOfFirstResume = indexOfLastResume - resumesPerPage;
    const currentResumes = resumes.slice(indexOfFirstResume, indexOfLastResume);

    // calculate how many pages are needed
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(resumes.length / resumesPerPage); i++) {
        pageNumbers.push(i);
    }

    useEffect(async () => {
        setMajor('All');
        let resumeList = await getResumes({ major: 'All' });
        setResumes(resumeList.data.reverse());
    }, []);

    const resumeList = currentResumes.map((resume, itr) => {
        return (
            <Col className="user-resume" key={itr}>
                <Row>
                    <Document
                        file={resume.link}
                        loading="Loading..."
                    >
                        <Page renderTextLayer={false} pageNumber={1} height={550} />
                    </Document>
                </Row>
                <Row className="user-resume-btn">
                    <AntdButton onClick={() => { handleViewModal(resume); }}>{resume.major}</AntdButton>
                </Row>
            </Col>
        );
    });

    return (
        <div className="resume-content">
            <div id="resume-landing-page">
                <div className="resume-landing-content">
                    <h1 className="resume-landing-content-h1">View Successful Resumes</h1>
                    <h6>Contact us if you do not see your field of study</h6>
                </div>
                <div className="resume-landing-content">
                    <Lottie
                        options={Comet}
                        height={300}
                        width={300}
                    />
                </div>
                <ResumeNav retrieveResumes={retrieveResumes} />
                <div className="downArrow bounce">
                    <a href="#resumes"><img src={Arrow} alt="" /></a>
                </div>
            </div>
            <div className="resume-content-container" id="resumes">
                <Divider><h4>{major} Resumes</h4></Divider>
                <Row>
                    {resumeList}
                </Row>
                <Pagination defaultCurrent={currentPage} total={resumes.length - 2} showSizeChanger={false} onChange={handlePagination} />
            </div>
            <ResumeModal currentResume={currentResume} showModal={showModal} setShowModal={setShowModal} />
        </div>
    );
}

export default Resumes;
