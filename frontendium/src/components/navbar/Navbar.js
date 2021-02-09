import './Navbar.css';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Logo from '../../images/logo.png';

function Header() {
    return (
        <Navbar id="transparent-navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
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
                    <Link className="nav-link" to="/">Home</Link>
                    <Link className="nav-link" to="/search">Search Jobs</Link>
                    <Link className="nav-link" to="/resumes">Resume</Link>
                    <Link className="nav-link" to="/account">Account</Link>
                    <Link className="nav-link" to="/signin">Log In</Link>
                    <Link className="nav-link" to="/signup">Sign Up</Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;