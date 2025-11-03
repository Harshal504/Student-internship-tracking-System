import { useEffect, useState } from "react";
import { Alert, Button, Col, Container, Form, Row, Table } from "react-bootstrap";
import { getAllApplications, deleteApplication } from "../services/Applicationservices";
import "../styles/tablestyle.css";

export function ApplicationsManager({ loggedInStudentId = null }) {
  const [applications, setApplications] = useState([]);
  const [filteredApplications, setFilteredApplications] = useState([]);
  const [filter, setFilter] = useState("");

  // Fetch all applications
  const fetchApplications = async () => {
    try {
      const response = await getAllApplications();
      let allApps = response.data;

      // If student is logged in, only show their applications
      if (loggedInStudentId) {
        allApps = allApps.filter(
          (app) => app.student_id === loggedInStudentId
        );
      }

      setApplications(allApps);
      setFilteredApplications(allApps);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  // Apply filter by Student ID (for now)
  const handleFilter = () => {
    if (filter.trim() === "") {
      setFilteredApplications(applications);
    } else {
      setFilteredApplications(
        applications.filter((a) =>
          a.student_id.toString().includes(filter.trim())
        )
      );
    }
  };

  // Clear filter
  const handleClear = () => {
    setFilter("");
    setFilteredApplications(applications);
  };

  // Delete application
  const handleDelete = async (appId) => {
    if (!window.confirm("Are you sure you want to delete this application?")) return;

    try {
      await deleteApplication(appId);
      alert("Application deleted successfully!");
      fetchApplications(); // Refresh table
    } catch (error) {
      console.error("Error deleting application:", error);
      alert("Failed to delete application!");
    }
  };

  return (
    <Container className="mt-3 mb-5">
      <Row className="align-items-center mb-3">
        <Col>
          <h4 className="fw-bold text-primary mb-0">Manage Applications</h4>
        </Col>
      </Row>

      {/* Filter */}
      <Row className="g-2 mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="Filter by Student ID"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            disabled={!!loggedInStudentId}
          />
        </Col>
        <Col md={4} className="d-flex gap-2">
          <Button variant="primary" onClick={handleFilter}>
            Apply
          </Button>
          <Button variant="secondary" onClick={handleClear}>
            Clear
          </Button>
        </Col>
      </Row>

      {/* Applications Table */}
      {filteredApplications.length === 0 ? (
        <Alert variant="warning">No applications found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
          <thead>
            <tr>
              <th>Application ID</th>
              <th>Student</th>
              <th>Company</th>
              <th>Internship</th>
              <th>Status</th>
              <th>Applied At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((app) => (
              <tr key={app.application_id}>
                <td>{app.application_id}</td>
                <td>{app.student_name}</td>
                <td>{app.company_name}</td>
                <td>{app.internship_title}</td>
                <td>{app.application_status}</td>
                <td>
                  {new Date(app.applied_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  })}
                </td>
                <td>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(app.application_id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
