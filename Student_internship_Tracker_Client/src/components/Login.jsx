import { useState } from "react";
import { Button, Container, Form, Row, Col, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

export function SignIn() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
        role: "",
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        try {
            e.preventDefault();
            console.log("Sign In Data:", formData);
            // TODO: call login API here
            // const response = await checkCredentials(formData);
            // console.log(response);
            // if (response.status === 200) {
            //     // show success message
            //     toast.success("Product Added", {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //         transition: Bounce,
            //     });
        }
        catch (error) {
            console.log(error);
            // if (error.response.status === 500) {
            //     // show failure message
            //     toast.error("Something went wrong", {
            //         position: "top-right",
            //         autoClose: 5000,
            //         hideProgressBar: false,
            //         closeOnClick: true,
            //         pauseOnHover: true,
            //         draggable: true,
            //         progress: undefined,
            //         theme: "colored",
            //         transition: Bounce,
            //     });
            // }
        }


    };

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-4 shadow-lg rounded-4" style={{ maxWidth: "420px", width: "100%" }}>
                <h3 className="text-center mb-4 text-primary">Sign In</h3>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formRole" className="mb-3">
                        <Form.Label>Role</Form.Label>
                        <Form.Select name="role" value={formData.role} onChange={handleChange} required>
                            <option value="">Select Role</option>
                            <option value="student">Student</option>
                            <option value="company">Company</option>
                            <option value="supervisor">Supervisor</option>
                        </Form.Select>
                    </Form.Group>

                    <Form.Group controlId="formEmail" className="mb-3">
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

                    <Form.Group controlId="formPassword" className="mb-4">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            placeholder="Enter password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Button variant="primary" type="submit" className="w-100">
                        Sign In
                    </Button>
                </Form>

                <p className="text-center mt-3">
                    Don’t have an account?{" "}
                    <Button
                        variant="link"
                        className="p-0 text-decoration-none"
                        onClick={() => navigate("/signup")}
                    >
                        Sign Up
                    </Button>
                </p>
            </Card>
        </Container>
    );
}
