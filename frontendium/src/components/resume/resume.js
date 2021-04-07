import { Image } from 'react-bootstrap';
import './resume.css';

function resume(props) {

    return (
        <div className="resume-sample">
            <Image src="https://cmpendium.s3-us-west-1.amazonaws.com/Computer_Science/cocoa_touch.jpg" thumbnail />
            <div className="resume-sample-text">
                <p>{props.name}</p>
                <p>{props.title}</p>
            </div>
        </div>
    )
}

export default resume;