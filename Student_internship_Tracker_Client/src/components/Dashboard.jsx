import { Container, Card } from "react-bootstrap";

export function Dashboard() {
    const user = JSON.parse(localStorage.getItem("user"));
    const role = user?.role || "Guest";

    return (
        <Container className="d-flex justify-content-center align-items-center vh-100">
            <Card className="p-5 shadow-lg rounded-4 text-center" style={{ maxWidth: "600px" }}>
                <h2 className="fw-bold text-primary mb-3">
                    Welcome {user?.name ? user.name : "to Internify"}!
                </h2>
                <h5 className="text-secondary">
                    {role !== "Guest"
                        ? `You are logged in as a ${role}.`
                        : "Please sign in to access your dashboard."}
                </h5>
            </Card>
        </Container>
    );
}


