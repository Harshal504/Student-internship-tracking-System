import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllSupervisors(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select name, phone, email from supervisor`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function addSupervisors(request, response){
    try{
        const conn = getConnectionObject();
        const data = request.body;
        const qry = `INSERT INTO Supervisor(name, phone, email, password) values ('${data.name}', '${data.phone}', '${data.email}', '${data.password}')`;
        const [resultSet] = await conn.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message : 'Supervisor Registered'});
        }
        else{
            response.status(500).send({message : 'Supervisor Registration Failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message : 'Something Went Wrong'});
    }
}

export async function updateSupervisors(request, response){
    try{
        const conn = getConnectionObject();
        const {name, phone, email} = request.body;
        const qry = `UPDATE Supervisor SET name='${name}', phone='${phone}', email='${email}' WHERE supervisor_id=?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message : 'Supervisor Updated'});
        }
        else{
            response.status(500).send({message : 'Supervisor Updation Failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message : 'Something Went Wrong'});
    }
}


export async function deleteSupervisors(request, response){
    try{
        const conn = getConnectionObject();
        const qry = `DELETE FROM Supervisor WHERE supervisor_id=?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message : 'Supervisor Deleted'});
        }
        else{
            response.status(500).send({message : 'Supervisor Deletion Failed'});
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({message : 'Something Went Wrong'});
    }
}
    
