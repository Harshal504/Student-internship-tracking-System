import { getConnectionObject } from "../configs/dbConfig.js";

export async function getAllSkills(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `Select skill_id, skill_name from skills`;
        const data = await conn.query(qry);
        response.status(200).send(data[0]);


    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something went wrong' });
    }
}

export async function getSkillsByStudentId(request, response) {
    try {
        const conn = await getConnectionObject();
        const { studentId } = request.params;

        const qry = `
            SELECT 
                s.skill_id,
                s.skill_name
            FROM student_skills ss
            JOIN skills s ON ss.skill_id = s.skill_id
            WHERE ss.student_id = ?;
        `;

        const [data] = await conn.query(qry, [studentId]);

        if (data.length === 0) {
            return response.status(404).send({ message: "No skills found for this student" });
        }

        response.status(200).send(data);
    } catch (error) {
        console.error("Error fetching student skills:", error);
        response.status(500).send({ message: "Something went wrong" });
    }
}


export async function addSkills(request, response) {
    try {
        const conn = getConnectionObject();
        const data = request.body;
        const qry = `INSERT INTO Skills(name) values ('${data.name}')`;
        const [resultSet] = await conn.query(qry);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Skills Added' });
        }
        else {
            response.status(500).send({ message: 'Skills are NOT added' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something Went Wrong' });
    }
}

export async function updateSkills(request, response) {
    try {
        const conn = getConnectionObject();
        const { name } = request.body;
        const qry = `UPDATE Skills SET name='${name}' WHERE skill_id=?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Skills Updated' });
        }
        else {
            response.status(500).send({ message: 'Skills Updation Failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something Went Wrong' });
    }
}


export async function deleteSkills(request, response) {
    try {
        const conn = getConnectionObject();
        const qry = `DELETE FROM Skills WHERE skill_id=?`;
        const [resultSet] = await conn.query(qry, [request.params.id]);
        if (resultSet.affectedRows === 1) {
            response.status(200).send({ message: 'Skill Deleted' });
        }
        else {
            response.status(500).send({ message: 'Skill Deletion Failed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).send({ message: 'Something Went Wrong' });
    }
}

