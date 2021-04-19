import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Nav, Navbar } from 'react-bootstrap';

import { isAuthenticated } from '../../api/Auth';
import './Navbar.css';
import Logo from '../../images/logo.png';

function Header() {
    const history = useHistory();

    const [authenticated] = useState(isAuthenticated().length !== 0);

    function handleLogOut() {
        localStorage.removeItem('jwt');
        localStorage.removeItem('jwt-expire');
        history.push('/');
        window.location.reload(false);
    }

    return (
        <Navbar id="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <span className='logo'>
                    <img
                        src={Logo}
                        alt="logo"
                        width="60"
                        height="60"
                        style={{ padding: '5px' }} />
                    CmpEndium
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    {!authenticated
                        ? <>
                            <Nav.Link className="nav-link" as={Link} eventKey="1" to="/">Home</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} eventKey="5" to="/signin">Sign In</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} eventKey="6" to="/signup">Sign Up</Nav.Link>
                        </>
                        : <>
                            <Nav.Link className="nav-link" as={Link} eventKey="1" to="/">Dashboard</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} eventKey="2" to="/search">Search Jobs</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} eventKey="3" to="/resumes">Resume</Nav.Link>
                            <Nav.Link className="nav-link" as={Link} eventKey="4" to="/account">Account</Nav.Link>
                            <Nav.Link className="nav-link" eventKey="7" onClick={handleLogOut}>Log Out</Nav.Link>
                        </>
                    }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default Header;
