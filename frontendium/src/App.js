import React, { useState, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { createBrowserHistory } from "history";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes.js';
import Navbar from './components/navbar/Navbar.js';

const browserHistory = createBrowserHistory();

function App() {

  // callAPI() {
  //   fetch("http://localhost:9000/testAPI")
  //     .then(res => res.text())
  //     .then(res => this.setState({ apiResponse: res }));
  // }

  return (
    <div className="App">
      <Router history={browserHistory}>
        <Navbar />
        <Routes />
      </Router>
    </div>
  );
}

export default App;
