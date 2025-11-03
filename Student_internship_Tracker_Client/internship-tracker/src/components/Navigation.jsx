import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import navimage from "/Users/harshaltarmale/Projects/CDAC_projects/Student_Internship_Tracker/Student_internship_Tracker_Client/internship-tracker/public/internify.ico";

export function Navigationbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark"  sticky="top" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="/">  <img
                    src={navimage}
                    alt="Internify Logo"
                    width="40"
                    height="40"
                    className="d-inline-block align-top me-2"
                /><span>Internify</span></Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <LinkContainer to="/">
                            <Nav.Link>Home</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/aboutus">
                            <Nav.Link>About Us</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/contact">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/Student">
                            <Nav.Link>Student</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/companies">
                            <Nav.Link>Company</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/supervisors">
                            <Nav.Link>Supervisors</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/internships">
                            <Nav.Link>Internships</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/applications">
                            <Nav.Link>Applications</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/applicationsStatusUpdate">
                            <Nav.Link>Applications status Updater</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/applicationsEdit">
                            <Nav.Link>Applications Edit</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/signin">
                            <Nav.Link>Sign In</Nav.Link>
                        </LinkContainer>
{/* 
                        <LinkContainer to="/signup">
                            <Nav.Link>Sign Up</Nav.Link>
                        </LinkContainer> */}



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}