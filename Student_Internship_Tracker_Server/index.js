import express from 'express';
import cors from 'cors';
import { getConnectionObject } from "./src/configs/dbConfig.js";
import bcrypt from 'bcrypt';

import { connectDB } from "./src/configs/dbConfig.js";
import { getAllSupervisors, addSupervisors, updateSupervisors, deleteSupervisors } from './src/controllers/SupervisorController.js';
import { getAllStudents, addStudents, updateStudents, delStudents, getStudentsBySupervisorID } from './src/controllers/StudentController.js';
import { getAllCompanies, addCompanies, updateCompanies, delCompanies } from './src/controllers/CompanyController.js';
import { getAllInternships, addInternships, updateInternships, deleteInternships, getInternshipsByCompanyID } from './src/controllers/InternshipController.js';
import { createApplication, deleteApplication, getAllApplications, getApplicationsByCompanyID, getApplicationsByStudent, updateApplication, updateApplicationStatus } from "./src/controllers/ApplicationController.js";
import { getAllSkills, addSkills, updateSkills, deleteSkills, getSkillsByStudentId } from './src/controllers/SkillsController.js'
import { updateInternshipStatus } from './src/controllers/InternshipController.js';

import { loginUser, signUpUser } from './src/controllers/SignInController.js';
import { ROLES } from './src/constants/RoleConstants.js';
import { verifyToken, authorize } from './src/middlewares/VerifyToken.js';



const app = express();
app.use(express.json());
app.use(cors());

// The root url
app.get("/", (request, response) => {
    response.send("test express");
    console.log("get request processed");
});

// Api for Student
app.get("/student/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getAllStudents);
app.post("/student/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), addStudents);
app.put("/student/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), updateStudents);
app.delete("/student/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]), delStudents);
app.get("/student/:supervisor_id", verifyToken, authorize([ROLES.SUPERVISOR]), getStudentsBySupervisorID);


// // Api for Companies
app.get("/company/data", getAllCompanies);
app.post("/company/data", verifyToken, authorize([ROLES.COMPANY]), addCompanies);
app.put("/company/data/:id", verifyToken, authorize([ROLES.COMPANY]), updateCompanies);
app.delete("/company/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.COMPANY]), delCompanies);

// // Api for supervisor
app.get("/supervisor/data", getAllSupervisors);
app.post("/supervisor/data", verifyToken, authorize([ROLES.SUPERVISOR]), addSupervisors);
app.put("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]), updateSupervisors);
app.delete("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]), deleteSupervisors);

// Api for Internship
app.get("/internship/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getAllInternships);
app.post("/internship/data", verifyToken, authorize([ROLES.COMPANY]), addInternships);
app.put("/internship/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), updateInternships);
app.delete("/internship/data/:id", verifyToken, authorize([ROLES.COMPANY]), deleteInternships);
app.put("/internship/:internshipId", verifyToken, authorize([ROLES.COMPANY]), updateInternshipStatus);
app.get("/internship/:company_id", verifyToken, authorize([ROLES.COMPANY]), getInternshipsByCompanyID);

// Api for applications
app.get("/application/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getAllApplications);
app.get("/application/data/:studentId", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getApplicationsByStudent);
app.put("/application/data/:applicationId", verifyToken, authorize([ROLES.COMPANY]), updateApplicationStatus);
app.put("/application/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), updateApplication);
app.delete("/application/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), deleteApplication);
app.post("/application/create", verifyToken, authorize([ROLES.STUDENT]), createApplication);
app.get("/application/:company_id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getApplicationsByCompanyID);

// Api for skills
app.get("/skill/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getAllSkills);
app.get("/skills/:studentId", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getSkillsByStudentId);
app.post("/skill/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), addSkills);
app.put("/skill/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), updateSkills);
app.delete("/skill/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), deleteSkills);

// API for Login
app.post("/login", loginUser);

// ApI for Signup
app.post("/signup", signUpUser);







app.listen(4400, () => {
    connectDB();
    console.log("express server started");
});



// app.post("/student/hash-passwords", async (req, res) => {
//     try {
//         const conn = getConnectionObject();
//         const [students] = await conn.execute("SELECT student_id, password FROM student");
//         console.log(students);

//         for (const student of students) {
//             // Skip if already hashed (bcrypt hashes start with "$2")
//             const password = student.password;
//             if (!password.startsWith("$2")) {
//                 const hashed = await bcrypt.hash(password, 10);

//                 const result = await conn.execute("UPDATE student SET password = ? WHERE student_id = ?", [
//                     hashed,
//                     student.student_id,
//                 ]);

//                 console.log(result);
//             }
//         }

//         res.json({ message: "Passwords hashed successfully!" });
//     } catch (error) {
//         console.error(error);
//         res.status(500).json({ error: "Error hashing passwords" });
//     }
// });

// app.post("/supervisor/hash-passwords", async (req, res) => {
//   try {
//     const conn = getConnectionObject();
//     const [supervisors] = await conn.execute("SELECT supervisor_id, password FROM supervisor");

//     for (const supervisor of supervisors) {
//       const password = supervisor.password;

//       if (!password || typeof password !== "string") {
//         console.log(`⚠️ Skipping supervisor ID ${supervisor.supervisor_id}: invalid password`);
//         continue;
//       }

//       if (!password.startsWith("$2")) {
//         const hashed = await bcrypt.hash(password, 10);
//         await conn.execute("UPDATE supervisor SET password = ? WHERE supervisor_id = ?", [
//           hashed,
//           supervisor.supervisor_id,
//         ]);
//         console.log(`✅ Updated supervisor ID ${supervisor.supervisor_id}`);
//       }
//     }

//     res.json({ message: "Supervisor passwords hashed successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error hashing supervisor passwords" });
//   }
// });

// app.post("/company/hash-passwords", async (req, res) => {
//   try {
//     const conn = getConnectionObject();
//     const [companies] = await conn.execute("SELECT company_id, password FROM company");

//     for (const company of companies) {
//       const password = company.password;

//       if (!password || typeof password !== "string") {
//         console.log(`⚠️ Skipping company ID ${company.company_id}: invalid password`);
//         continue;
//       }

//       if (!password.startsWith("$2")) {
//         const hashed = await bcrypt.hash(password, 10);
//         await conn.execute("UPDATE company SET password = ? WHERE company_id = ?", [
//           hashed,
//           company.company_id,
//         ]);
//         console.log(`✅ Updated company ID ${company.company_id}`);
//       }
//     }

//     res.json({ message: "Company passwords hashed successfully!" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error hashing company passwords" });
//   }
// });
       