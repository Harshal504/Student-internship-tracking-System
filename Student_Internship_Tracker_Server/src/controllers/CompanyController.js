import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllCompanies(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select company_id, name, email, tech_domain from company`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
export async function addCompanies(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body
        const qry = `INSERT into COMPANY(name, email, password, tech_domain) VALUES ('${data.name}', '${data.email}', '${data.password}', '${data.tech_domain}')`;
        const [resultSet] = await conn.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Company registered successfully' });
        }
        else {
            response.status(500).send({ message: 'Company registration failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function updateCompanies(request, response) {
    try {
        const conn = getConnectionObject();
        const { name, email, tech_domain } = request.body;
        const qry = `UPDATE company SET name='${name}', email='${email}', tech_domain='${tech_domain}' WHERE company_id= ?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Company Updated' });
        }
        else {
            response.status(500).send({ message: 'Company update operation failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function delCompanies(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `DELETE FROM company WHERE company_id= ?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Company Deleted' });
        }
        else {
            response.status(500).send({ message: 'Company delete operation failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
