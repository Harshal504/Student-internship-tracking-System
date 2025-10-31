import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllCompanies(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select name, email, tech_domain from company`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}