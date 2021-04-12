import React, { useState } from 'react';
import { Image, Modal } from 'react-bootstrap';
import './Resume.css';

function Resume(props) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div className="resume-sample">
      <Image src={props.image} thumbnail onClick={handleShow}/>
      <div className="resume-sample-text">
        <p>{props.name}</p>
        <p>{props.title}</p>
      </div>
      <Modal show={show} dialogClassName="resume-modal" centered onClick={handleClose} onEscapeKeyDown={handleClose}>
        <Modal.Body>
          <Image src={props.image} fluid />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Resume;
