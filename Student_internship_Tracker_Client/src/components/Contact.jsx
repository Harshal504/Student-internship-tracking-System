import { Container, Row, Col, Form, Button } from "react-bootstrap";

export function Contact() {
  return (
    <Container className="mt-5 mb-5">
      <h2 className="text-center mb-4 text-primary">Contact Us</h2>
      <Row className="bg-light p-4 rounded shadow">
        {/* Left side - Contact Info */}
        <Col md={6} className="mb-4">
          <h4 className="text-primary mb-3">Get in Touch</h4>
          <p>
            Feel free to reach out to us for any queries or feedback. 
            We’ll get back to you as soon as possible.
          </p>
          <p><strong>Email:</strong> internshiptracker@gmail.com</p>
          <p><strong>Phone:</strong> +91 98765 43210</p>
          <p><strong>Location:</strong> Pune, India</p>
        </Col>

        {/* Right side - Contact Form */}
        <Col md={6}>
          <h4 className="text-primary mb-3">Send Us a Message</h4>
          <Form>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter your email" required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formMessage">
              <Form.Label>Message</Form.Label>
              <Form.Control as="textarea" rows={4} placeholder="Write your message here..." required />
            </Form.Group>

            <Button variant="primary" type="submit">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
