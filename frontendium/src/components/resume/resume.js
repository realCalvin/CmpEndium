import { Image } from 'react-bootstrap';
import './resume.css';

function resume(props) {
    
    return (
        <div class="resume-sample">
            <Image src={props.image} thumbnail/>
            <div class="resume-sample-text">
                <p>{props.name}</p>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default resume;