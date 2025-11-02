import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllStudents(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select student_id, name, phone, email, resume_url, education from student`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function addStudents(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body;
        const qry = `Insert into student (supervisor_id, name, phone, email, password, education) values ('${data.supervisor_id}','${data.name}', '${data.phone}', '${data.email}', '${data.password}', '${data.education}')`;
        const [resultSet] = await conn.query(qry);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Student registered'});
        }
        else{
            response.status(500).send({message:'Student registration failed'});
        }

    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function updateStudents(request, response) {
    try {
        const conn = getConnectionObject();
        const {name,phone,email, education} = request.body;
        const qry = `UPDATE student SET name='${name}', phone='${phone}', email='${email}', education='${education}' WHERE student_id= ?`;
        const [resultSet] = await conn.query(qry, [request.params.id] );
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Student Updated'});
        }
        else{
            response.status(500).send({message:'Student update operation failed'});
        }



    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}


export async function delStudents(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `DELETE FROM student WHERE student_id = ?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if(resultSet.affectedRows === 1){
            response.status(200).send({message:'Student Updated'});
        }
        else{
            response.status(500).send({message:'Student update operation failed'});
        }


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}
