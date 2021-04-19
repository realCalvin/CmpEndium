import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Tabs } from 'antd';
import SavedJobsTable from '../../components/dashboard/SavedJobsTable';
import Lottie from 'react-lottie';
import CometData from '../../images/lottie/comet';
import './Dashboard.css';

function Dashboard() {
    const Comet = {
        loop: true,
        autoplay: true,
        animationData: CometData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    const { TabPane } = Tabs;
    return (
        <div id="Dashboard">
            <Row id="dashboard-banner">
                <Col id="dashboard-banner-1" md={8}>
                    <h1>Welcome back, Calvin!</h1>
                    <h6>Manage and track your saved jobs.</h6>
                </Col>
                <Col id="dashboard-banner-2" md={2}>
                    <Lottie
                        options={Comet}
                        height={200}
                        width={200}
                    />
                </Col>
            </Row>
            <Row id="dashboard-content">
                <div id="dashboard-tabs">
                    <Tabs defaultActiveKey="1">
                        <TabPane tab="Saved Jobs" key="1">
                            <SavedJobsTable />
                        </TabPane>
                        <TabPane tab="Resumes" key="2">
                            Content of Tab Pane 2
                        </TabPane>
                        <TabPane tab="My Progress" key="3">
                            Content of Tab Pane 3
                        </TabPane>
                    </Tabs>
                </div>
            </Row>
        </div>
    );
}

export default Dashboard;
