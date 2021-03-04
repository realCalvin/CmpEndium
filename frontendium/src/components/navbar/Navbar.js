import './Navbar.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from '../../images/logo.png';

function Header() {
    return (
        <Navbar id="navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="/">
                <span className='logo'>
                    <img
                        src={Logo}
                        alt="logo"
                        width="60"
                        height="60"
                        style={{ padding: "5px" }} />
                    CmpEndium
                </span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ml-auto">
                    <Nav.Link className="nav-link" as={Link} eventKey="1" to="/">Home</Nav.Link>
                    <Nav.Link className="nav-link" as={Link} eventKey="2" to="/search">Search Jobs</Nav.Link>
                    <Nav.Link className="nav-link" as={Link} eventKey="3" to="/resumes">Resume</Nav.Link>
                    <Nav.Link className="nav-link" as={Link} eventKey="4" to="/account">Account</Nav.Link>
                    <Nav.Link className="nav-link" as={Link} eventKey="5" to="/signin">Log In</Nav.Link>
                    <Nav.Link className="nav-link" as={Link} eventKey="6" to="/signup">Sign Up</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;