import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

export function Navigationbar() {
    return (
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
            <Container>
                <Navbar.Brand href="#home">Internify</Navbar.Brand>
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

                        <LinkContainer to="/applications">
                            <Nav.Link>Applications</Nav.Link>
                        </LinkContainer>

                        <LinkContainer to="/internships">
                            <Nav.Link>Contact</Nav.Link>
                        </LinkContainer>



                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}