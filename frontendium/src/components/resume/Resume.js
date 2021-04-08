import { Image } from 'react-bootstrap';
import './Resume.css';

function resume(props) {

    return (
        <div className="resume-sample">
            <Image src={props.image} thumbnail />
            <div className="resume-sample-text">
                <p>{props.name}</p>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default resume;