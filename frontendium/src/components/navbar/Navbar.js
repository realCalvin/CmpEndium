import './Navbar.css';
import { Nav, Navbar } from 'react-bootstrap';
import Logo from '../../images/logo.png';

function Header() {
    return (
        <Navbar id="transparent-navbar" collapseOnSelect expand="lg" bg="dark" variant="dark">
            <Navbar.Brand href="#">
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
                    <Nav.Link href="#">Home</Nav.Link>
                    <Nav.Link href="#">Search Jobs</Nav.Link>
                    <Nav.Link href="#">Resume</Nav.Link>
                    <Nav.Link href="#">Account</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header;