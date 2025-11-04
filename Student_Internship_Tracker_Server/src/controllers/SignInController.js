import { getConnectionObject } from "../configs/dbConfig.js";
// import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = "internify"; // ⚠️ ideally use process.env.JWT_SECRET

export async function loginUser(request, response) {
  try {
    const { email, password, role } = request.body;

    if (!email || !password || !role) {
      return response.status(400).send({ message: "Email, password, and role are required" });
    }

    const conn = getConnectionObject();

    // ✅ Select table dynamically based on role
    let tableName = "";
    if (role === "student") tableName = "student";
    else if (role === "company") tableName = "company";
    else if (role === "supervisor") tableName = "supervisor";
    else return response.status(400).send({ message: "Invalid role" });

    const [rows] = await conn.query(`SELECT * FROM ${tableName} WHERE email = ?`, [email]);

    if (rows.length === 0) {
      return response.status(401).send({ message: "Invalid email or password" });
    }

    const user = rows[0];

    // ✅ Compare passwords
    // const isMatch = bcrypt.compareSync(password, user.password);
    if (password != user.password) {
      return response.status(401).send({ message: "Invalid email or password" });
    }

    // ✅ Create JWT token
    const token = jwt.sign(
      { id: user[`${role}_id`], role },
      JWT_SECRET
    );

    // ✅ Remove password from response
    delete user.password;

    return response.status(200).send({
      message: "Login successful",
      token,
      user: { ...user, role },
    });

  } catch (error) {
    console.error("Login Error:", error);
    response.status(500).send({ message: "Something went wrong" });
  }
}




export async function signUpUser(request, response){
  try {
        const conn = getConnectionObject();

    const { role, name, email, password, phone, tech_domain, resume_url, education } = request.body;

    if (!role || !name || !email || !password)
      return response.status(400).json({ message: "Missing required fields" });

    // hash password
    // const hashedPassword = await bcrypt.hash(password, 10);

    let query, values;

    switch (role) {
      case "student":
        query = `
          INSERT INTO student (name, email, phone, password, resume_url, education)
          VALUES (?, ?, ?, ?, ?, ?)
        `;
        values = [name, email, phone, password, resume_url || null, education || null];
        break;

      case "supervisor":
        query = `
          INSERT INTO supervisor (name, email, phone, password)
          VALUES (?, ?, ?, ?)
        `;
        values = [name, email, phone, password];
        break;

      case "company":
        query = `
          INSERT INTO company (name, email, password, tech_domain)
          VALUES (?, ?, ?, ?)
        `;
        values = [name, email, password, tech_domain || null];
        break;

      default:
        return response.status(400).json({ message: "Invalid role specified" });
    }

    const [result] = await conn.query(query, values);
    if (result.affectedRows > 0) {
      response.status(201).json({ message: `${role} registered successfully` });
    } else {
      response.status(500).json({ message: "Registration failed" });
    }
  } catch (error) {
    console.error("Signup error:", error);
    if (error.code === "ER_DUP_ENTRY") {
      response.status(400).json({ message: "Email already exists" });
    } else {
      response.status(500).json({ message: "Server error" });
    }
  }
};
