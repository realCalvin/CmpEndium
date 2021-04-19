import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Table, Menu, Dropdown } from 'antd';
import { currentEmail } from '../../api/Auth';
import { getSavedJobs, handleJobStatus } from '../../api/Job';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt } from '@fortawesome/free-solid-svg-icons';
import { DownOutlined } from '@ant-design/icons';
import './SavedJobsTable.css';

function SavedJobsTable(props) {
    const history = useHistory();
    const locations = useLocation();

    const [jobs, setJobs] = useState([]);
    const [page, setPage] = useState(1);

    function handlePagination(page) {
        setPage(page);
    }

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
                <Menu.Item danger>Delete Job</Menu.Item>
            </Menu>
        );
    }

    async function handleMenuItem(status, id) {
        const res = await handleJobStatus({ email: currentEmail(), status: status, id: id });
        if (res.data.response === 'success') {
            history.push({
                pathname: '/',
                state: {
                    page: page
                }
            });
            location.reload();
        }
    }

    useEffect(async () => {
        if (locations.state) {
            setPage(locations.state.page);
        }
        const user = currentEmail();
        const res = await getSavedJobs({ email: user });
        setJobs(res.data.jobs);
    }, []);

    const columns = [
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title'
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company'
        },
        {
            title: 'Date Applied',
            dataIndex: 'date',
            key: 'date'
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
                    <a className="ant-dropdown-link">
                        {record.status} <DownOutlined />
                    </a>
                </Dropdown>
            )
        }
    ];

    return (
        <div id="SavedJobsTable">
            <Table
                pagination={{ defaultPageSize: 10 }}
                dataSource={jobs}
                columns={columns}
                // eslint-disable-next-line
                pagination={{ current: page, onChange: handlePagination }}
            />
        </div>
    );
}

export default SavedJobsTable;
