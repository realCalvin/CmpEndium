import React, { useState, useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tabs } from 'antd';
import { pdfjs } from 'react-pdf';
import { currentEmail } from '../../api/Auth';
import { getSavedJobs } from '../../api/Job';
import SavedJobsTable from '../../components/dashboard/SavedJobsTable';
import MyProgressCharts from '../../components/dashboard/MyProgressCharts';
import UserResumes from '../../components/dashboard/UserResumes';
import AddJob from '../../components/dashboard/AddJob';
import Lottie from 'react-lottie';
import CometData from '../../images/lottie/comet';
import './Dashboard.css';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Dashboard() {
    const Comet = {
        loop: true,
        autoplay: true,
        animationData: CometData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };

    const [jobs, setJobs] = useState([]);
    const { TabPane } = Tabs;

    useEffect(async () => {
        const user = currentEmail();
        const res = await getSavedJobs({ email: user });
        setJobs(res.data.jobs.reverse());
    }, []);

    return (
        <div id="Dashboard">
            <Row id="dashboard-banner">
                <Col id="dashboard-banner-1" md={8}>
                    <h1>Welcome back, Calvin!</h1>
                    <h6>Manage and track your saved jobs.</h6>
                </Col>
                <Col id="dashboard-banner-2" md={2}>
                    <Lottie options={Comet} height={200} width={200} />
                </Col>
            </Row>
            <Row id="dashboard-content">
                <div id="dashboard-tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Saved Jobs" key="1">
                            <SavedJobsTable jobs={jobs} />
                        </TabPane>
                        <TabPane tab="Resumes" key="2">
                            <UserResumes />
                        </TabPane>
                        <TabPane tab="My Progress" key="3">
                            <MyProgressCharts jobs={jobs} />
                        </TabPane>
                        <TabPane tab="+ Add Job" key="4">
                            <AddJob />
                        </TabPane>
                    </Tabs>
                </div>
            </Row>
        </div>
    );
}

export default Dashboard;
