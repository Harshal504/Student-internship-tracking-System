
import { Container, Row, Col, Button, Card, Image } from "react-bootstrap";
import myImage from "../../public/homeimg1.png"
export function Homepage() {
  return (
    <div>
      {/* Hero Section */}
      <div className="bg-light py-5">
        <Container>
          <Row className="align-items-center">
            <Col md={7} className="text-center text-md-start mb-4 mb-md-0">
              <h1 className="fw-bold display-5 text-primary mb-3">
                Connect Students with Dream Internships
              </h1>

              <p className="mt-3 fs-5 text-secondary">
                <strong>Internify</strong> is a comprehensive platform connecting
                talented students with leading companies. Streamline your internship
                application process and find the perfect opportunity.
              </p>

              <p className="fs-5 text-muted ">
                Our university’s <strong>Internify Portal</strong> plays a vital role
                in guiding and supporting students through every step of their
                internship journey. It helps faculty manage, monitor, and mentor
                students effectively ensuring meaningful and successful experiences.
              </p>

              <Button variant="primary" size="lg" className="mt-4">
                Get Started
              </Button>
            </Col>

            <Col md={5} className="text-center">
              <Image src={myImage} alt="Internify" className="img-fluid rounded shadow w-full **h-full** **object-cover**" />

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
                  <h2 className="fw-bold text-primary">50+</h2>
                  <p className="text-muted mb-0">Companies</p>
                </Card.Body>
              </Card>
            </Col>

            <Col md={4}>
              <Card className="border-0">
                <Card.Body>
                  <h2 className="fw-bold text-primary">700+</h2>
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


