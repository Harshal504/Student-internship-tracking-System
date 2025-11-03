import { getConnectionObject } from "../configs/dbConfig.js";


export async function getAllInternships(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `
      SELECT 
        i.internship_id,
        i.company_id,
        i.title,
        DATE_FORMAT(i.post_date, '%d-%m-%Y' ) AS post_date,
        i.status,
        c.name AS company_name
        FROM 
        INTERNSHIP i
        INNER JOIN 
        COMPANY c ON i.company_id = c.company_id`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}


export async function addInternships(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body;
        const qry = `Insert into internship (company_id, title) values ('${data.company_id}', '${data.title}')`;
        const [resultSet] = await conn.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Internship added' });
        }
        else {
            response.status(500).send({ message: 'Internship addition failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
export async function updateInternships(request, response) {
    try {
        const conn = getConnectionObject();
        const {status } = request.body;
        const qry = `UPDATE internship SET  status='${status}' WHERE internship_id= ?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Internship Updated' });
        }
        else {
            response.status(500).send({ message: 'Internship update operation failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
export async function deleteInternships(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `DELETE FROM internship WHERE internship_id= ?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Internship Deleted' });
        }
        else {
            response.status(500).send({ message: 'Internship delete operation failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
