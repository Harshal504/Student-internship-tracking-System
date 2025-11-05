import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { getAllCompanies } from "../services/Companyservices";
import "../styles/tablestyle.css";

export function CompaniesList() {

    const [companies, setCompanies] = useState([]);

    const fetchCompanies = async () => {
        try {
            const response = await getAllCompanies();
            console.log(response.data);
            setCompanies(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCompanies();
    }, []);

    return (
        <Container className="mt-3">


            <Row className="align-items-center mb-3">
                <Col>
                    <h4 className="fw-bold text-primary mb-0">Companies List</h4>
                </Col>
            </Row>

            {
                companies.length === 0 ? <Alert variant="warning">No Company information found</Alert> :
                    <Table striped bordered hover responsive className="align-middle shadow-sm mt-3">
                        <thead>
                            <tr>
                                <th>Company Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Tech Domain</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                companies.map((company) => {
                                    return (
                                        <tr key={company.company_id}>
                                            <td>{company.company_id}</td>
                                            <td>{company.name}</td>
                                            <td>{company.email}</td>
                                            <td>{company.tech_domain}</td>
                                        </tr>
                                    )
                                })
                            }

                        </tbody>
                    </Table>
            }
        </Container>
    )
}
