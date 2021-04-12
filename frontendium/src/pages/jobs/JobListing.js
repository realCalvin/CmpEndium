import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Card, Row, Col } from 'react-bootstrap';
import Lottie from 'react-lottie';
import BeatLoader from 'react-spinners/BeatLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import SearchData from '../../images/lottie/search.json';
import Pagination from '../../components/pagination/Pagination';
import { searchJobs, saveJob } from '../../api/Job';
import { currentEmail } from '../../api/Auth';
import './JobListing.css';

function JobListing(props) {
  const location = useLocation();

  const Search = {
    loop: true,
    autoplay: true,
    animationData: SearchData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const [jobs, setJobs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 10;

  async function handleSaveJob(job) {
    let date = new Date();
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;

    const jobData = {
      email: currentEmail(),
      title: job.title,
      company: job.company,
      link: job.link,
      date: date,
      status: 'Applied'
    };
    await saveJob(jobData);
    // TODO: Add animation when job is successfully saved
  }

  // eslint-disable-next-line
  useEffect(async () => {
    // implement "caching" logic
    const savedKeywords = await sessionStorage.getItem('keywords');
    const savedLocation = await sessionStorage.getItem('location');
    if (savedKeywords !== location.state.keywords || savedLocation !== location.state.location) {
      const jobs = await searchJobs(location.state);
      await sessionStorage.clear('jobs');
      if (jobs.data.jobs.length) {
        await sessionStorage.setItem('jobs', JSON.stringify(jobs.data.jobs));
      } else {
        await sessionStorage.setItem('jobs', '[]');
      }
      await sessionStorage.setItem('keywords', location.state.keywords);
      await sessionStorage.setItem('location', location.state.location);
    }
    setJobs(JSON.parse(sessionStorage.getItem('jobs')));
    setLoaded(true);
  }, [location.state]);

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
  const jobCards = currentJobs.map((job, itr) => {
    let location = '';
    if (Array.isArray(job.location)) {
      for (let i = 0; i < job.location.length; i++) {
        location += job.location[i].name;
        if (i !== job.location.length - 1) location += ' — ';
      }
    } else {
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
              <button className="job-listing-btn" onClick={() => { handleSaveJob(job); }}>Save Job</button>
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
    );
  });

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
          {loaded
            ? (jobs.length
              ? <>
                {jobCards}
                <Pagination totalPages={pageNumbers.length} currentPage={currentPage} setCurrentPage={setCurrentPage} />
              </>
              : <div>
                <h4>No Jobs Found. Please try a different keyword or location.</h4>
              </div>
            )
            : <div id="job-listing-loader">
              <BeatLoader color='#7676fa' loading={!loaded} size={25} />
            </div>
          }
        </div>
      </div>
    </div>
  );
}

export default JobListing;
