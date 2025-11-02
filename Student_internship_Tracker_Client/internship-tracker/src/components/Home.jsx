
import { Container, Row, Col, Button, Card } from "react-bootstrap";

export function Homepage(){
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={6} className="text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-primary">
                Connect Students with Dream Internships
              </h1>
              <p className="mt-3 fs-5 text-secondary">
                <strong>Internify</strong> is a comprehensive platform connecting
                talented students with leading companies. Streamline your
                internship application process and find the perfect opportunity.
              </p>
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Col>

            <Col md={6} className="text-center">
              <img src="../assets/internify.png" alt="Internify" className="img-fluid rounded shadow" />

            </Col>
          </Row>
        </Container>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-5 border-top">
        <Container>
          <Row className="text-center">
            <Col md={4} className="mb-4 mb-md-0">
              <Card className="border-0">
                <Card.Body>
                  <h2 className="fw-bold text-primary">500+</h2>
                  <p className="text-muted mb-0">Students</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4} className="mb-4 mb-md-0">
              <Card className="border-0">
                <Card.Body>
                  <h2 className="fw-bold text-primary">150+</h2>
                  <p className="text-muted mb-0">Companies</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0">
                <Card.Body>
                  <h2 className="fw-bold text-primary">1000+</h2>
                  <p className="text-muted mb-0">Placements</p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};


