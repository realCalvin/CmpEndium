import React, { useState } from 'react';
import Lottie from 'react-lottie';
import { Row, Col, InputGroup, FormControl } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faLocationArrow } from '@fortawesome/free-solid-svg-icons';
import Wave from '../../components/wave/Wave';
import RocketData from '../../images/lottie/rocket';
import './Search.css';

function Search() {
  const Rocket = {
    loop: true,
    autoplay: true,
    animationData: RocketData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const history = useHistory();

  const [info, setInfo] = useState({
    keywords: '',
    location: ''
  });

  const handleChange = e => {
    setInfo({
      ...info,
      [e.target.name]: e.target.value
    });
  };

  async function handleSearch(e) {
    e.preventDefault();
    history.push({
      pathname: '/jobs',
      state: info
    });
  }

  return (
    <div id="Search">
      <div id="search-box">
        <form id="search-form" onSubmit={handleSearch}>
          <h4>Search For Jobs</h4>
          <Row>
            <Col md={6}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="login-fa-icon" icon={faSearch} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="search-form-keywords" placeholder="Job Title, Company, Keywords" onChange={handleChange} name="keywords" />
              </InputGroup>
            </Col>
            <Col md={6}>
              <InputGroup className="mb-3">
                <InputGroup.Prepend>
                  <InputGroup.Text>
                    <FontAwesomeIcon className="login-fa-icon" icon={faLocationArrow} />
                  </InputGroup.Text>
                </InputGroup.Prepend>
                <FormControl id="search-form-address" placeholder="City, State, Zip Code" onChange={handleChange} name="location" />
              </InputGroup>
            </Col>
          </Row>
          <Row>
            <button type="submit" id="search-btn">Search</button>
          </Row>
        </form>
      </div>
      <div className="auth-lottie-img">
        <Lottie
          options={Rocket}
          height={300}
          width={300}
        />
      </div>
      <Wave />
    </div>
  );
}

export default Search;
