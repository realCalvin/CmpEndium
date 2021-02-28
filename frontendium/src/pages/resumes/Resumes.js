import { useState } from 'react';
import { Container, Row, Col, Modal, Image } from 'react-bootstrap';
import './Resumes.css';
import SearchBar from '../../components/searchbar/Searchbar.js';
import Particles from '../../components/particles/particles';
import Resume from '../../components/resume/resume.js';
import ResumeNav from './ResumeNav.js';

// hardcoded images, delete once the backend is setup
import img from '../../images/samples/sample1.png';
import img2 from '../../images/samples/sample2.png';
import img3 from '../../images/samples/sample3.jpg';
import img4 from '../../images/samples/sample4.png';
import img5 from '../../images/samples/sample5.png';
import img6 from '../../images/samples/sample6.jpg';


function Resumes() {

    const [show, setShow] = useState(false);
    const [id, setId] = useState(0);

    const handleClose = () => setShow(false);
    const handleShow = (id) => {
        setId(id);
        setShow(true);
    }

    const sampleJson = [
        {
            "image": img,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        },
        {
            "image": img2,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        },
        {
            "image": img3,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        },
        {
            "image": img4,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        },
        {
            "image": img5,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        },
        {
            "image": img6,
            "name": "Anne Smith",
            "title": "Registered Nurse"
        }
    ]

    const rows = [
        <Row className="justify-content-center mb-3">
            <Col onClick={() => handleShow(0)}><Resume image={img} name="Anne Smith" title="Registered Nurse" /></Col>
            <Col onClick={() => handleShow(1)}><Resume image={img2} name="Angela Wilkinson" title="Data Analyst" /></Col>
            <Col onClick={() => handleShow(2)}><Resume image={img3} name="Samantha Jansen" title="Product Manager" /></Col>
            <Col onClick={() => handleShow(3)}><Resume image={img4} name="Samantha Cerio" title="Property Manager" /></Col>
        </Row>,
        <Row className="justify-content-center mb-3">
            <Col onClick={() => handleShow(4)}><Resume image={img5} name="Lilibeth Andrada" title="Data Analyst" /></Col>
            <Col onClick={() => handleShow(5)}><Resume image={img6} name="Darla Demarco" title="Cashier" /></Col>
        </Row>
    ]

    return (
        <div class="resume-content">
            <ResumeNav />
            <Container class="resume-content-container">
                <h4>Example Resumes</h4>
                {rows}
            </Container>
            <Modal show={show} onHide={handleClose} dialogClassName="resume-modal" centered>
                <Modal.Body>
                    <Image src={sampleJson[id].image} fluid />
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default Resumes;