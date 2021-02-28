import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './Landing.css';
import { Container, Row, Col, Button, Image, Card } from 'react-bootstrap';
import Particles from '../../components/particles/particles';
import Lottie from 'react-lottie';
import AstronautData from '../../images/lottie/astronaut';
import FindData from '../../images/lottie/find';
import BuildData from '../../images/lottie/build';
import TrackData from '../../images/lottie/track';
import AstronautImage from '../../images/Astronaut.png';
import FindImage from '../../images/Find.png';
import BuildImage from '../../images/Build.png';
import TrackImage from '../../images/Track.png';

function Landing() {
    const Astronaut = {
        loop: true,
        autoplay: true,
        animationData: AstronautData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const Find = {
        loop: true,
        autoplay: true,
        animationData: FindData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const Build = {
        loop: true,
        autoplay: true,
        animationData: BuildData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };
    const Track = {
        loop: true,
        autoplay: true,
        animationData: TrackData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    return (
        <div id="Landing">
            <Row id="landing-page">
                <Particles />
                <Col sm={12}>
                    <div className="landing-content">
                        <h1 className="landing-content-h1">Land Your Next Job Efficiently</h1>
                        <p className="landing-content-p"> We pull job listings from multiple websites</p>
                        <Button href="#search" id="landing-page-btn">Get Started</Button>
                    </div>
                    <div className="landing-content">
                        <Lottie
                            options={Astronaut}
                            height={300}
                            width={300}
                        />
                    </div>
                </Col>
            </Row>
            <div id="landing-page-card">
                <Particles />
                <a className="card-link" href="#landing-find-page">
                    <Row className="landing-card">
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src={FindImage} fluid />
                            </Col>
                            <Col xs={5} md={8} className="landing-card-text">
                                Search For Jobs
                        </Col>
                        </Row>
                    </Row>
                </a>
                <a className="card-link" href="#landing-build-page">
                    <Row className="landing-card">
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src={BuildImage} fluid />
                            </Col>
                            <Col xs={5} md={8} className="landing-card-text">
                                Build Your Resume
                        </Col>
                        </Row>
                    </Row>
                </a>
                <a className="card-link" href="#landing-track-page">
                    <Row className="landing-card">
                        <Row>
                            <Col xs={6} md={4}>
                                <Image src={TrackImage} fluid />
                            </Col>
                            <Col xs={5} md={8} className="landing-card-text">
                                Track Applications
                        </Col>
                        </Row>
                    </Row>
                </a>
            </div>
            <Row className="landing-page-descriptions" id="landing-find-page">
                <Col md={12} lg={6}>
                    <div className="lottie-icon-left">
                        <Lottie
                            options={Find}
                            height={150}
                            width={150}
                        />
                    </div>
                    <h3>Find Your Dream Job</h3>
                    <ul>
                        <li>Filter out the job listings to find the job of your choice</li>
                        <li>Read through the job description and requirements</li>
                        <li>See if it is a fit for you</li>
                        <li>Hit apply to be redirected to the company's website to apply for this position</li>
                    </ul>
                </Col>
                <Col md={12} lg={6}>
                    <Image src={AstronautImage} fluid />
                </Col>
            </Row>
            <Row className="landing-page-descriptions" id="landing-build-page">
                <Col className="image-left" md={12} lg={6}>
                    <Image src={AstronautImage} fluid />
                </Col>
                <Col md={12} lg={6}>
                    <div className="lottie-icon-right">
                        <Lottie
                            options={Build}
                            height={150}
                            width={150}
                        />
                    </div>
                    <h3>Build Your Resume</h3>
                    <ul>
                        <li>Reference the resume of others who are or have been in your position to better your own</li>
                        <li>Cater your resume to fit the specific role of which you are applying for</li>
                        <li>Share your resume to help others who are and will be in your current position</li>
                    </ul>
                </Col>
                <Col className="image-right" md={12} lg={6}>
                    <Image src={AstronautImage} fluid />
                </Col>
            </Row>
            <Row className="landing-page-descriptions" id="landing-track-page">
                <Col md={12} lg={6}>
                    <div className="lottie-icon-left">
                        <Lottie
                            options={Track}
                            height={150}
                            width={150}
                        />
                    </div>
                    <h3>Track Your Job Applications</h3>
                    <ul>
                        <li>Add the jobs you applied to onto your profile</li>
                        <li>Keep track of the status of the jobs you applied to</li>
                    </ul>
                </Col>
                <Col md={12} lg={6}>
                    <Image src={AstronautImage} fluid />
                </Col>
            </Row>
        </div>
    )
}

export default Landing;