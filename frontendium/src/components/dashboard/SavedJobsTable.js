import React, { useState, useEffect } from 'react';
import { Table, Menu, Dropdown, Tag } from 'antd';
import { currentEmail } from '../../api/Auth';
import { handleJobStatus, handleDeleteJob } from '../../api/Job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { DownOutlined } from '@ant-design/icons';
import './SavedJobsTable.css';

function SavedJobsTable(props) {
    const [jobs, setJobs] = useState([]);
    const [render, setRender] = useState(false);

    function dropdownMenu(status, id) {
        const menuItems = ['Applied', 'Interview', 'Rejected', 'Offer'];
        return (
            <Menu>
                {menuItems.map((item, itr) => {
                    if (item !== status) {
                        return (
                            <Menu.Item key={itr} onClick={() => { handleMenuItem(item, id); }}>{item}</Menu.Item>
                        );
                    }
                    return null;
                })}
                <Menu.Item danger onClick={() => { handleDeleteMenuItem(id); }}>Delete Job</Menu.Item>
            </Menu>
        );
    }

    function forceRender() {
        setRender(!render);
    }

    async function handleMenuItem(status, id) {
        const res = await handleJobStatus({ email: currentEmail(), status: status, id: id });
        if (res.data.response === 'success') {
            for (let i = 0; i < jobs.length; i++) {
                if (jobs[i]._id === id) {
                    const tempJobs = jobs;
                    tempJobs[i].status = status;
                    setJobs(tempJobs);
                    forceRender();
                }
            }
        }
    }

    async function handleDeleteMenuItem(id) {
        const res = await handleDeleteJob({ email: currentEmail(), id: id });
        if (res.data.response === 'success') {
            for (let i = 0; i < jobs.length; i++) {
                if (jobs[i]._id === id) {
                    const tempJobs = jobs;
                    tempJobs.splice(i, 1);
                    setJobs(tempJobs);
                    forceRender();
                }
            }
        }
    }

    useEffect(async () => {
        setJobs(props.jobs);
    }, [props.jobs]);

    const tagColor = {
        Applied: '#7676FA',
        Rejected: '#FF512C',
        Interview: '#FEBD30',
        Offer: '#2eb82e'
    };

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => a.company > b.company ? 1 : -1
        },
        {
            title: 'Date Applied',
            dataIndex: 'date',
            key: 'date',
            sortDirections: ['ascend', 'descend', 'ascend'],
            sorter: (a, b) => new Date(a.date) - new Date(b.date)
        },
        {
            title: 'Link',
            key: 'link',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                <a href={record.link} target="_blank" rel="noreferrer">
                    <FontAwesomeIcon className="login-fa-icon" icon={faExternalLinkAlt} />
                </a>
            )
        },
        {
            title: 'Status',
            key: 'status',
            // eslint-disable-next-line react/display-name
            render: (record) => (
                <Dropdown overlay={dropdownMenu(record.status, record._id)}>
                    <Tag color={tagColor[record.status]}>
                        <a className="ant-dropdown-link saved-jobs-status">
                            {record.status} <DownOutlined />
                        </a>
                    </Tag>
                </Dropdown>
            )
        }
    ];

    // eslint-disable-next-line
    let data = [...jobs];

    return (
        <div id="SavedJobsTable">
            <Table
                pagination={{ defaultPageSize: 10 }}
                dataSource={data}
                columns={columns}
            />
        </div>
    );
}

export default SavedJobsTable;
