import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Routes from './Routes.js';
import Navbar from './components/navbar/Navbar.js';

const browserHistory = createBrowserHistory();

function App() {
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
