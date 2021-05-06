import React from 'react';
import './ResumeNav.css';
import { Row, Col, DropdownButton, Dropdown } from 'react-bootstrap';
import { jobMapping } from '../../components/jobs/Jobs';

export default function ResumeNav(props) {
    const jobDropdownButtons = jobMapping.map((jobItem, itr) => {
        const dropdownItems = jobItem[1].map((dropdownItem, dropdownItr) => {
            return (
                <Dropdown.Item eventKey={dropdownItr} key={dropdownItr} id={dropdownItem} onClick={props.retrieveResumes}>{dropdownItem}</Dropdown.Item>
            );
        });
        return (
            <Col className="job-buttons" key={itr} xs={6} sm={4} md={4} lg={2}>
                <DropdownButton className="job-button" title={jobItem[0]}>
                    {dropdownItems}
                </DropdownButton>
            </Col>
        );
    });
    return (
        <div className="resume-nav-content">
            <Row className="resume-nav-row">
                {jobDropdownButtons}
            </Row>
        </div>
    );
}
