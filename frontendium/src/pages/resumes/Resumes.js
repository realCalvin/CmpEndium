import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './Resumes.css';
import Resume from '../../components/resume/Resume.js';
import ResumeNav from './ResumeNav.js';
import Lottie from 'react-lottie';
import CometData from '../../images/lottie/comet';
import Arrow from '../../images/arrow.png';
import { upload, deleteResume, retrieve } from '../../api/AWS';

function Resumes() {
    const Comet = {
        loop: true,
        autoplay: true,
        animationData: CometData,
        rendererSettings: {
            preserveAspectRatio: "xMidYMid slice"
        }
    };

    const [data, setData] = useState({});
    const [major, setMajor] = useState("");

    async function retrieveResumes(e) {
        var major = e.target.id;
        setMajor(major);
        major = major.replace(/ /g, "_");
        const data = await retrieve(major);
        console.log(data.data)
        setData(data.data);
    }

    // if someone has a better solution to this block of code, plz change
    const cols = [];
    var i;
    var j = 0;
    for (i = 0; i < data.length; i += 4) {
        if (data.length - i < 4) {
            break;
        }
        cols.push(
            <Row className="justify-content-center mb-3" key={j}>
                <Col><Resume image={data[i].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 1].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 2].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 3].Key} name="" title="" /></Col>
            </Row>
        )
        j++;
    }
    if (data.length - i === 3) {
        cols.push(
            <Row className="justify-content-center mb-3" key={j}>
                <Col><Resume image={data[i].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 1].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 2].Key} name="" title="" /></Col>
            </Row>
        )
    }
    else if (data.length - i === 2) {
        cols.push(
            <Row className="justify-content-center mb-3" key={j}>
                <Col><Resume image={data[i].Key} name="" title="" /></Col>
                <Col><Resume image={data[i + 1].Key} name="" title="" /></Col>
            </Row>
        )
    }
    else if (data.length - i === 1) {
        cols.push(
            <Row className="justify-content-center mb-3" key={j}>
                <Col><Resume image={data[i].Key} name="" title="" /></Col>
            </Row>
        )
    }

    return (
        <div className="resume-content">
            <div id="resume-landing-page">
                <div className="resume-landing-content">
                    <h1 className="resume-landing-content-h1">View Successful Resumes</h1>
                    <p className="resume-landing-content-p">Contact us if you do not see your field of study</p>
                </div>
                <div className="resume-landing-content">
                    <Lottie
                        options={Comet}
                        height={300}
                        width={300}
                    />
                </div>
                <ResumeNav retrieveResumes={retrieveResumes} />
                <div className="downArrow bounce">
                    <a href="#resumes"><img src={Arrow} alt="" /></a>
                </div>
            </div>
            <Container className="resume-content-container" id="resumes">
                <u><h3>{major} Resumes</h3></u>
                {cols}
            </Container>
        </div>
    )
}

export default Resumes;