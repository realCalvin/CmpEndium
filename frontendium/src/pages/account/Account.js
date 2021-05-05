import React, { useState, useEffect } from 'react';
import ReactRoundedImage from 'react-rounded-image';
import { Row, Col, Button, Modal } from 'react-bootstrap';
import { currentEmail } from '../../api/Auth';
import { UserInfo } from '../../api/UserInfo';
import TempPfp from '../../images/Astronaut.png';
import './Account.css';

function Account() {
    const [info, setInfo] = useState({
        username: '',
        name: '',
        email: '',
        major: ''
    });
    const [show, setShow] = useState(false);

    useEffect(() => {
        async function getUserInfo() {
            const userEmail = currentEmail();
            const userInfo = await UserInfo(userEmail);
            setInfo(userInfo.data);
        }
        getUserInfo();
    }, []);

    return (
        <div id="account">
            <Modal centered show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title id="modal-title">Change Major</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                Just random stuff to take up space for now.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShow(false)} id="modal-button">Cancel</Button>
                </Modal.Footer>
            </Modal>
            <div id="prof-pic-and-name">
                <ReactRoundedImage
                    image={TempPfp}
                    roundedColor="white"
                    imageWidth="120"
                    imageHeight="120"
                    roundedSize="8"
                />
                <h1 className="username">{ info.username }</h1>
            </div>
            <div id="content">
                <div id="account-info">
                    <div id="profile">
                        <div id="profile-content">
                            <Row>
                                <Col xs={2} md={1}>
                                    <h5>Name:</h5>
                                </Col>
                                <Col>
                                    <h5>{ info.name }</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={2} md={1}>
                                    <h5>Email:</h5>
                                </Col>
                                <Col>
                                    <h5>{ info.email }</h5>
                                </Col>
                            </Row>
                            <Row>
                                <Col xs={2} md={1}>
                                    <h5>Major:</h5>
                                </Col>
                                <Col>
                                    <h5>{ info.major }</h5>
                                </Col>
                            </Row>
                        </div>
                        <Button id="edit-major-btn" onClick={() => setShow(true)}>Change Major</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Account;
