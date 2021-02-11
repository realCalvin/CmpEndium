import React, { Component } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Landing from './pages/landing/Landing.js';
import Navbar from './components/navbar/Navbar.js';
import Resumes from './pages/resumes/Resumes.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "" };
  }

  callAPI() {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
        <Navbar />
        <Resumes />
      </div>
    );
  }
}

export default App;
