import { useState } from "react";
import { Button, Container, Form, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/SignInservices"; // create this API call

export default function SignUp() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
    resume_url: "",
    education: "",
    tech_domain: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await registerUser(formData);
      if (response.status === 201) {
        alert("Registration successful!");
        navigate("/signin");
      }
    } catch (error) {
      console.error("Signup failed:", error);
      alert(error.response?.data?.message || "Something went wrong!");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center vh-100">
      <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "500px", width: "100%" }}>
        <h3 className="text-center mb-4 text-success">Sign Up</h3>

        <Form onSubmit={handleSubmit}>
          {/* Role Selector */}
          <Form.Group controlId="formRole" className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Select
              name="role"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select Role</option>
              <option value="student">Student</option>
              <option value="company">Company</option>
              <option value="supervisor">Supervisor</option>
            </Form.Select>
          </Form.Group>

          {/* Common fields */}
          <Form.Group className="mb-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Form.Group>

          {/* Conditional Fields */}
          {formData.role === "student" && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="tel"
                  name="phone"
                  placeholder="Enter phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Resume URL</Form.Label>
                <Form.Control
                  type="text"
                  name="resume_url"
                  placeholder="Enter Resume URL"
                  value={formData.resume_url}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Education</Form.Label>
                <Form.Control
                  type="text"
                  name="education"
                  placeholder="Enter Education"
                  value={formData.education}
                  onChange={handleChange}
                />
              </Form.Group>
            </>
          )}

          {formData.role === "supervisor" && (
            <Form.Group className="mb-3">
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
          )}

          {formData.role === "company" && (
            <Form.Group className="mb-3">
              <Form.Label>Tech Domain</Form.Label>
              <Form.Control
                type="text"
                name="tech_domain"
                placeholder="Enter Tech Domain"
                value={formData.tech_domain}
                onChange={handleChange}
              />
            </Form.Group>
          )}

          <Form.Group className="mb-4">
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
