import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllApplications(request, response) {
    try {
        const conn = await getConnectionObject();

        const qry = `
            SELECT 
                a.application_id,
                a.student_id,
                s.name AS student_name,
                s.education,
                s.email AS student_email,
                s.phone AS student_phone,
                a.company_id,
                c.name AS company_name,
                c.tech_domain,
                a.internship_id,
                i.title AS internship_title,
                i.status AS internship_status,
                a.status AS application_status,
                a.applied_at
            FROM application a
            JOIN student s ON a.student_id = s.student_id
            JOIN company c ON a.company_id = c.company_id
            JOIN internship i ON a.internship_id = i.internship_id
            ORDER BY a.applied_at DESC;
        `;

        const [data] = await conn.query(qry);
        response.status(200).send(data);

    } catch (error) {
        console.error("Error fetching applications:", error);
        response.status(500).send({ message: "Something went wrong" });
    }
}


export async function getApplicationsByStudent(request, response) {
    try {
        const conn = await getConnectionObject();
        const { studentId } = request.params;

        const qry = `
            SELECT 
                a.application_id,
                a.student_id,
                s.name AS student_name,
                s.education,
                s.email AS student_email,
                s.phone AS student_phone,
                a.company_id,
                c.name AS company_name,
                c.tech_domain,
                a.internship_id,
                i.title AS internship_title,
                i.status AS internship_status,
                a.status AS application_status,
                a.applied_at
            FROM application a
            JOIN student s ON a.student_id = s.student_id
            JOIN company c ON a.company_id = c.company_id
            JOIN internship i ON a.internship_id = i.internship_id
            WHERE a.student_id = ?
            ORDER BY a.applied_at DESC;
        `;

        const [data] = await conn.query(qry, [studentId]);
        response.status(200).send(data);

    } catch (error) {
        console.error("Error fetching student applications:", error);
        response.status(500).send({ message: "Something went wrong" });
    }
}


export async function updateApplicationStatus(request, response) {
    try {
        const { applicationId } = request.params; // application_id
        const { status } = request.body;

        if (!status) {
            return response.status(400).send({ message: "Status is required" });
        }

        const conn = getConnectionObject();

        const qry = `
            UPDATE application
            SET status = ?
            WHERE application_id = ?;
        `;

        const [result] = await conn.query(qry, [status, applicationId]);

        if (result.affectedRows === 0) {
            return response.status(404).send({ message: "Application not found" });
        }

        response.status(200).send({ message: "Status updated successfully" });
    } catch (error) {
        console.error("Error updating status:", error);
        response.status(500).send({ message: "Something went wrong" });
    }
}


// ✅ Delete Application
export async function deleteApplication(request, response) {
  try {
    const { id } = request.params;
    const conn = getConnectionObject();

    const qry = `DELETE FROM application WHERE application_id = ?`;
    const [result] = await conn.query(qry, [id]);

    if (result.affectedRows === 0) {
      return response.status(404).send({ message: "Application not found" });
    }

    response.status(200).send({ message: "Application deleted successfully" });
  } catch (error) {
    console.error("Error deleting application:", error);
    response.status(500).send({ message: "Something went wrong" });
  }
}





export async function updateApplication(request, response) {
  try {
    const { id } = request.params;
    const { status, internship_id, company_id } = request.body;

    const conn = getConnectionObject();

    // Build dynamic query depending on provided fields
    const fields = [];
    const values = [];

    if (status) {
      fields.push("application_status = ?");
      values.push(status);
    }
    if (internship_id) {
      fields.push("internship_id = ?");
      values.push(internship_id);
    }
    if (company_id) {
      fields.push("company_id = ?");
      values.push(company_id);
    }

    if (fields.length === 0) {
      return response.status(400).send({ message: "No fields to update." });
    }

    values.push(id);

    const query = `UPDATE application SET ${fields.join(", ")} WHERE application_id = ?`;
    const [result] = await conn.query(query, values);

    if (result.affectedRows === 0) {
      return response.status(404).send({ message: "Application not found." });
    }

    response.status(200).send({ message: "Application updated successfully." });
  } catch (error) {
    console.error("Error updating application:", error);
    response.status(500).send({ message: "Something went wrong" });
  }
}

export async function createApplication(req, res) {
    try {
        const conn = getConnectionObject();
        const {
            student_id,
            internship_id,
            company_id
        } = req.body;

        const query = `
            INSERT INTO application 
            (student_id, internship_id, company_id)
            VALUES (?, ?, ?)
        `;

        const [result] = await conn.query(query, [
            student_id,
            internship_id,
            company_id
        ]);

        if (result.affectedRows === 1) {
            res.status(200).send({ message: "Application submitted" });
        } else {
            res.status(500).send({ message: "Application failed" });
        }
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: "Server error" });
    }
}


export async function getApplicationsByCompanyID(request, response) {
    try {
        const { company_id } = request.params;
        const conn = getConnectionObject();
        const qry = `SELECT * FROM Application where company_id = ?`;
      
        const data = await conn.query(qry, [company_id]);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

