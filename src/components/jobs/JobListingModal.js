import React, { useState, useEffect } from 'react';
import { Row, Modal, Button, Spin } from 'antd';
import { getJob } from '../../api/Job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import './JobListingModal.css';

function JobListingModal(props) {
    const { currentJob, authenticated, jobModal, setJobModal, handleSaveJob } = props;

    let [job, setJob] = useState({
        title: '',
        company: '',
        location: '',
        description: '',
        link: ''
    });
    let [loaded, setLoaded] = useState(false);

    const handleCancel = () => {
        setJobModal(false);
    };

    useEffect(async () => {
        setLoaded(false);
        setJob({
            title: '',
            company: '',
            location: '',
            description: '',
            link: ''
        });
        if (currentJob.link !== '') {
            const tempJob = await getJob(currentJob);
            setJob(tempJob.data.job);
            setLoaded(true);
        }
    }, [currentJob]);

    return (
        <div id="JobListingModal">
            <Modal
                title={currentJob.company + ' - ' + currentJob.title}
                width={800}
                visible={jobModal}
                onCancel={handleCancel}
                footer={authenticated
                    ? [
                        <Button className="job-modal-btn" key="save" loading={!loaded} onClick={() => { handleSaveJob(event, job); }}>
                        Save Job
                        </Button>,
                        <a key="apply" target="_blank" rel="noreferrer" href={job.link}>
                            <Button className="job-modal-btn" loading={!loaded} >
                        Apply&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt} />
                            </Button>
                        </a>
                    ]
                    : [<a key="apply" target="_blank" rel="noreferrer" href={job.link}>
                        <Button className="job-modal-btn" loading={!loaded} >
                        Apply&nbsp;<FontAwesomeIcon icon={faExternalLinkAlt} />
                        </Button>
                    </a>]}
            >
                {loaded
                    ? <>
                        <Row>
                            <p className="job-modal-label">Title:&nbsp; </p>
                            <p className="job-modal-content">{job.title}</p>
                        </Row>
                        <Row>
                            <p className="job-modal-label">Company:&nbsp; </p>
                            <p className="job-modal-content">{job.company}</p>

                        </Row>
                        <Row>
                            <p className="job-modal-label">Location:&nbsp; </p>
                            <p className="job-modal-content">{job.location}</p>

                        </Row>
                        <Row>
                            <p className="job-modal-label">Description:</p>
                        </Row>
                        <Row className="job-modal-description">
                            <div dangerouslySetInnerHTML={{ __html: job.description }} />
                        </Row>
                    </>
                    : <div id="job-modal-spinner"><Spin /></div>
                }
            </Modal>
        </div>
    );
}

export default JobListingModal;
