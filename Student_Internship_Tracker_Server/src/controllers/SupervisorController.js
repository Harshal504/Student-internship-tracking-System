import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllSupervisors(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select name, phone, email from supervisor`;
        const data = await conn.query(qry);
        response.status(200).send(data[0][0]);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}