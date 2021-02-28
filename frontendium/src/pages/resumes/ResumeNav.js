import React from 'react';
import './ResumeNav.css';
import { Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import {
    businessItems, educationItems,
    engineeringItems, healthItems,
    humanitiesItems, scienceItems,
    socialScienceItems
} from '../../components/jobs/Jobs';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-force-tabpanel-${index}`}
            aria-labelledby={`scrollable-force-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
    },
}));

export default function ResumeNav() {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="on"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="scrollable force tabs example"
                    centered
                >
                    <Tab label="Business" {...a11yProps(0)} />
                    <Tab label="Education" {...a11yProps(1)} />
                    <Tab label="Engineering" {...a11yProps(2)} />
                    <Tab label="Health" {...a11yProps(3)} />
                    <Tab label="Humanities" {...a11yProps(4)} />
                    <Tab label="Science" {...a11yProps(5)} />
                    <Tab label="Social Science" {...a11yProps(6)} />
                </Tabs>
            </AppBar>
            <TabPanel className="tab-panel-content" value={value} index={0}>
                <Row className="justify-content-md-center">
                    {businessItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="2" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={1}>
                <Row className="justify-content-md-center">
                    {educationItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="3" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={2}>
                <Row className="justify-content-md-center">
                    {engineeringItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="3" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={3}>
                <Row className="justify-content-md-center">
                    {healthItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="2" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={4}>
                <Row className="justify-content-md-center">
                    {humanitiesItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="2" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={5}>
                <Row className="justify-content-md-center">
                    {scienceItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="3" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
            <TabPanel className="tab-panel-content" value={value} index={6}>
                <Row className="justify-content-md-center">
                    {socialScienceItems.map((item, itr) => {
                        return (
                            <Col md="4" lg="3" className="tab-panel-item" key={itr}>{item}</Col>
                        );
                    })}
                </Row>
            </TabPanel>
        </div >
    );
}