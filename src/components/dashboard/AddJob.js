import React, { useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Button, Input, Menu, Dropdown, Tag } from 'antd';
import { currentEmail } from '../../api/Auth';
import { saveJob } from '../../api/Job';
import { DownOutlined } from '@ant-design/icons';
import './AddJob.css';

function AddJob() {
    const [status, setStatus] = useState('Applied');
    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [link, setLink] = useState('');
    const [submit, setSubmit] = useState(false);
    const [validTitle, setValidTitle] = useState(false);
    const [validCompany, setValidCompany] = useState(false);
    const [validLink, setValidLink] = useState(false);

    const tagColor = {
        Applied: 'white',
        Rejected: 'white',
        Interview: 'white',
        Offer: 'white'
    };

    function handleChange(e, val) {
        if (val === 'title') {
            setTitle(e.target.value);
            setValidTitle(true);
        } else if (val === 'company') {
            setCompany(e.target.value);
            setValidCompany(true);
        } else if (val === 'link') {
            setLink(e.target.value);
            setValidLink(true);
        }
    }

    function dropdownMenu() {
        const menuItems = ['Applied', 'Interview', 'Rejected', 'Offer'];
        return (
            <Menu>
                {menuItems.map((item, itr) => {
                    if (item !== status) {
                        return (
                            <Menu.Item key={itr} onClick={() => { setStatus(item); }}>{item}</Menu.Item>
                        );
                    }
                    return null;
                })}
            </Menu>
        );
    }

    function checkValidInputs() {
        title.length ? setValidTitle(true) : setValidTitle(false);
        company.length ? setValidCompany(true) : setValidCompany(false);
        link.length ? setValidLink(true) : setValidLink(false);

        if (title.length && company.length && link.length) {
            return true;
        }
        return false;
    }

    function handleSubmit(e) {
        setSubmit(true);
        const val = checkValidInputs();
        if (val) {
            let date = new Date();
            const dd = String(date.getDate()).padStart(2, '0');
            const mm = String(date.getMonth() + 1).padStart(2, '0');
            const yyyy = date.getFullYear();
            date = mm + '/' + dd + '/' + yyyy;

            const jobData = {
                email: currentEmail(),
                title: title,
                company: company,
                link: link,
                date: date,
                status: status
            };
            saveJob(jobData);
            window.location.reload(false);
        }
    }

    return (
        <div id="AddJob">
            <Row className="manual-job-row">
                <Col sm={12} lg={3}>
                    <Row>Title</Row>
                    <Row>
                        <Input placeholder='Job Position' onChange={(e) => { handleChange(e, 'title'); }} />
                    </Row>
                    <Row>
                        {(submit && !validTitle)
                            ? <span style={{ color: 'red' }}>Please enter job title</span>
                            : ''
                        }
                    </Row>
                </Col>
                <Col sm={12} lg={3}>
                    <Row>Company</Row>
                    <Row>
                        <Input placeholder='Company' onChange={(e) => { handleChange(e, 'company'); }} />
                    </Row>
                    <Row>
                        {submit && !validCompany
                            ? <span style={{ color: 'red' }}>Please enter company</span>
                            : ''
                        }
                    </Row>
                </Col>
                <Col sm={12} lg={3}>
                    <Row>Link</Row>
                    <Row>
                        <Input required={true} placeholder='Link To Job Application' onChange={(e) => { handleChange(e, 'link'); }} />
                    </Row>
                    <Row>
                        {submit && !validLink
                            ? <span style={{ color: 'red' }}>Please enter job link</span>
                            : ''
                        }
                    </Row>
                </Col>
                <Col sm={12} lg={1}>
                    <Row>Status</Row>
                    <Row>
                        <Dropdown overlay={dropdownMenu()}>
                            <Tag color={tagColor[status]}>
                                <a className="ant-dropdown-link manual-saved-jobs-status">
                                    {status} <DownOutlined />
                                </a>
                            </Tag>
                        </Dropdown>
                    </Row>
                </Col>
            </Row>
            <Row className="manual-job-row">
                <Button onClick={handleSubmit}>Submit</Button>
            </Row>
        </div>
    );
}

export default AddJob;
