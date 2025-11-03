import { useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign Up Data:", formData);
    // TODO: call registration API here
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "480px", width: "100%" }}>
        <h3 className="text-center mb-4 text-success">Sign Up</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select name="role" value={formData.role} onChange={handleChange} required>
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="supervisor">Supervisor</option>
              <option value="admin">Admin</option>
            </Form.Select>
          </Form.Group>

          <Form.Group controlId="formName" className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formEmail" className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPhone" className="mb-3">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="tel"
              name="phone"
              placeholder="Enter phone number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group controlId="formPassword" className="mb-4">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Create password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Button variant="success" type="submit" className="w-100">
            Sign Up
          </Button>
        </Form>

        <p className="text-center mt-3">
                    Already have an account?{" "}
                    <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={() => navigate("/signin")}
                    >
                        Sign In
                    </Button>
        </p>
      </Card>
    </Container>
  );
}
