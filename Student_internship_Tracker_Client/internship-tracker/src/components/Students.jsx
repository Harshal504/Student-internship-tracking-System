import { useEffect, useState } from "react";
import { Alert, Col, Container, Row, Table } from "react-bootstrap";
import { getAllStudents } from "../services/Studentservices";



export function StudentsList() {

    const [students, setStudents] = useState([]);



    const fetchStudents = async () => {
        try {
            const response = await getAllStudents();
            console.log(response.data);
            setStudents(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchStudents();
    }, []);




    return (
        <Container className="mt-3">
            <Row>
                <Col lg={8}>
                    <div variant="primary">Student List</div>
                </Col>
            </Row>
            {
                students.length === 0 ? <Alert variant="warning">No Student information found</Alert> : <Table className="mt-3">
                    <thead>
                        <tr>
                            <th>Student Id</th>
                            <th>Name</th>
                            <th>Degree</th>
                            <th>email</th>
                            <th>Phone</th>
                            <th>Resume Url</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            students.map((student) => {
                                return (
                                    <tr>
                                        <td>{student.student_id}</td>
                                        <td>{student.name}</td>
                                        <td>{student.education}</td>
                                        <td>{student.email}</td>
                                        <td>{student.phone}</td>
                                        <td>{student.resume_url}</td>
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