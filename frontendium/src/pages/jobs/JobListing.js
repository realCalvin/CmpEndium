import React, { useState, useEffect } from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import Lottie from 'react-lottie';
import SearchData from '../../images/lottie/search.json';
import Pagination from '../../components/pagination/Pagination';
import './JobListing.css';

function JobListing() {

    const Search = {
        loop: true,
        autoplay: true,
        animationData: SearchData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    let [jobs, setJobs] = useState([{}]);
    let [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 10;

    useEffect(() => {
        setJobs(JSON.parse(sessionStorage.getItem('jobs')));
    }, []);

    // logic and calculation for the current page indexing
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.slice(indexOfFirstJob, indexOfLastJob);

    // calculate how many pages are needed
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(jobs.length / jobsPerPage); i++) {
        pageNumbers.push(i);
    }

    // display the current indexed jobs
    let jobCards = currentJobs.map((job, itr) => {
        let location = "";
        if (job.location) {
            for (let i = 0; i < job.location.length; i++) {
                location += job.location[i].name;
                if (i !== job.location.length - 1) location += ' — ';
            }
        }
        return (
            <Card className="job-listing-cards" key={itr}>
                <Card.Body>
                    <Card.Title>{job.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                    <Card.Text className="mb-2 text-muted"><i>{location}</i></Card.Text>
                    <button className="job-listing-btn">Details</button>
                    <a target="_blank" rel="noreferrer" href={job.link}>
                        <button className="job-listing-btn">Apply</button>
                    </a>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div id="JobListing">
            <div id="job-listing-content">
                <div id="job-listing-header">
                    <Row>
                        <Col>
                            <h2>Searching For <br></br> "software engineer"<br></br> In "san jose"</h2>
                        </Col>
                        <Col>
                            <Lottie
                                options={Search}
                                height={300}
                                width={300}
                            />
                        </Col>
                    </Row>
                </div>
                <div id="job-listing-body">
                    {jobCards}
                    <Pagination totalPages={pageNumbers.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                </div>
            </div>
        </div>
    )
}

export default JobListing;