import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Card, Row, Col } from 'react-bootstrap';
import Lottie from 'react-lottie';
import BeatLoader from "react-spinners/BeatLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import SearchData from '../../images/lottie/search.json';
import Pagination from '../../components/pagination/Pagination';
import { searchJobs } from '../../api/Job';
import './JobListing.css';

function JobListing(props) {

    const location = useLocation();

    const Search = {
        loop: true,
        autoplay: true,
        animationData: SearchData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    let [jobs, setJobs] = useState([]);
    let [loaded, setLoaded] = useState(false);
    let [currentPage, setCurrentPage] = useState(1);

    const jobsPerPage = 10;

    useEffect(async () => {
        // TODO: Reorder job listings to display the location first, rather than 'remote'
        let jobs = await searchJobs(location.state);
        await sessionStorage.clear('jobs');
        if (jobs.data.jobs.length) {
            await sessionStorage.setItem('jobs', JSON.stringify(jobs.data.jobs));
        } else {
            await sessionStorage.setItem('jobs', "[]");
        }
        setJobs(JSON.parse(sessionStorage.getItem('jobs')));
        setLoaded(true);
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
        if (Array.isArray(job.location)) {
            for (let i = 0; i < job.location.length; i++) {
                location += job.location[i].name;
                if (i !== job.location.length - 1) location += ' — ';
            }
        }
        else {
            location = job.location;
        }
        return (
            <Card className="job-listing-cards" key={itr}>
                <Card.Body>
                    <Row>
                        <Col md={8}>
                            <Card.Title>{job.title}</Card.Title>
                            <Card.Subtitle className="mb-2 text-muted">{job.company}</Card.Subtitle>
                            <Card.Text className="mb-2 text-muted"><i>{location}</i></Card.Text>
                            <Card.Text className="mb-2 text-muted">Description:</Card.Text>
                            <Card.Text className="job-listing-card-description mb-2 text-muted">
                                <div dangerouslySetInnerHTML={{ __html: job.description }} />
                            </Card.Text>
                        </Col>
                        <Col md={4} className="job-listing-btns">
                            <button className="job-listing-btn">Details</button>
                            <br></br>
                            <button className="job-listing-btn">Save Job</button>
                            <br></br>
                            <a target="_blank" rel="noreferrer" href={job.link}>
                                <button className="job-listing-btn">
                                    Apply <FontAwesomeIcon className="login-fa-icon" icon={faExternalLinkAlt} />
                                </button>
                            </a>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        )
    })

    return (
        <div id="JobListing">
            <div id="job-listing-content">
                {/* TODO: Add job search bar */}
                <div id="job-listing-header">
                    <Row>
                        <Col>
                            <h2>Searching For <br></br> "{location.state.keywords}"<br></br> In "{location.state.location}"</h2>
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
                    {loaded ?
                        (jobs.length ?
                            <>
                                {jobCards}
                                <Pagination totalPages={pageNumbers.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
                            </>
                            :
                            <div>
                                <h4>No Jobs Found. Please try a different keyword or location.</h4>
                            </div>
                        )
                        :
                        <div id="job-listing-loader">
                            <BeatLoader color='#7676fa' loading={!loaded} size={25} />
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default JobListing;