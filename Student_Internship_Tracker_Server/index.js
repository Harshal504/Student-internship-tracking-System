import express from 'express';
import cors from 'cors';

import { connectDB } from "./src/configs/dbConfig.js";
import { getAllSupervisors, addSupervisors, updateSupervisors, deleteSupervisors } from './src/controllers/SupervisorController.js';
import { getAllStudents, addStudents, updateStudents, delStudents, getStudentsBySupervisorID } from './src/controllers/StudentController.js';
import { getAllCompanies, addCompanies, updateCompanies, delCompanies } from './src/controllers/CompanyController.js';
import { getAllInternships, addInternships, updateInternships, deleteInternships, getInternshipsByCompanyID } from './src/controllers/InternshipController.js';
import { createApplication, deleteApplication, getAllApplications, getApplicationsByCompanyID, getApplicationsByStudent, updateApplication, updateApplicationStatus } from "./src/controllers/ApplicationController.js";
import {getAllSkills, addSkills, updateSkills, deleteSkills, getSkillsByStudentId} from './src/controllers/SkillsController.js'
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
app.post("/student/data", verifyToken,authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), addStudents);
app.put("/student/data/:id", verifyToken,authorize([ROLES.SUPERVISOR, ROLES.STUDENT]), updateStudents);
app.delete("/student/data/:id", verifyToken,authorize([ROLES.SUPERVISOR]), delStudents);
app.get("/student/:supervisor_id", verifyToken,authorize([ROLES.SUPERVISOR]), getStudentsBySupervisorID);


// // Api for Companies
app.get("/company/data", getAllCompanies);
app.post("/company/data", verifyToken,authorize([ROLES.COMPANY]), addCompanies);
app.put("/company/data/:id", verifyToken,authorize([ROLES.COMPANY]), updateCompanies);
app.delete("/company/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.COMPANY]), delCompanies);

// // Api for supervisor
app.get("/supervisor/data", getAllSupervisors);
app.post("/supervisor/data", verifyToken, authorize([ROLES.SUPERVISOR]), addSupervisors);
app.put("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]), updateSupervisors);
app.delete("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]), deleteSupervisors);

// Api for Internship
app.get("/internship/data", verifyToken , authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), getAllInternships);
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




// verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]), 


// import express from 'express';
// import cors from 'cors';

// import { connectDB } from "./src/configs/dbConfig.js";
// import { getAllSupervisors, addSupervisors, updateSupervisors, deleteSupervisors } from './src/controllers/SupervisorController.js';
// import { getAllStudents, addStudents, updateStudents, delStudents } from './src/controllers/StudentController.js';
// import { getAllCompanies, addCompanies, updateCompanies, delCompanies } from './src/controllers/CompanyController.js';
// import { getAllInternships, addInternships, updateInternships, deleteInternships } from './src/controllers/InternshipController.js';
// import { deleteApplication, getAllApplications, getApplicationsByStudent, updateApplication, updateApplicationStatus } from "./src/controllers/ApplicationController.js";
// import { loginUser, signUpUser } from './src/controllers/SignInController.js';
// import { ROLES } from './src/constants/RoleConstants.js';
// import { verifyToken, authorize } from './src/middlewares/VerifyToken.js';



// const app = express();
// app.use(express.json());
// app.use(cors());

// // The root url
// app.get("/", (request, response) => {
//     response.send("test express");
//     console.log("get request processed");
// });

// // Api for Student
// app.get("/student/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]),getAllStudents);
// app.post("/student/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]),addStudents);
// app.put("/student/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]),updateStudents);
// app.delete("/student/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]),delStudents);

// // // Api for Companies
// app.get("/company/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]),getAllCompanies);
// app.post("/company/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.COMPANY]),addCompanies);
// app.put("/company/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.COMPANY]),updateCompanies);
// app.delete("/company/data/:id", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.COMPANY]),delCompanies);

// // // Api for supervisor
// app.get("/supervisor/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT]),getAllSupervisors);
// app.post("/supervisor/data", verifyToken, authorize([ROLES.SUPERVISOR]),addSupervisors);
// app.put("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]),updateSupervisors);
// app.delete("/supervisor/data/:id", verifyToken, authorize([ROLES.SUPERVISOR]),deleteSupervisors);

// // Api for Internship
// app.get("/internship/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]),verifyToken ,getAllInternships);
// app.post("/internship/data", verifyToken, authorize([ROLES.COMPANY]),addInternships);
// app.put("/internship/data/:id", verifyToken, authorize([ROLES.COMPANY]),updateInternships);
// app.delete("/internship/data/:id", verifyToken, authorize([ROLES.COMPANY]),deleteInternships);

// // Api for applications
// app.get("/application/data", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]),getAllApplications);
// app.get("/application/data/:studentId", verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]),getApplicationsByStudent);
// app.put("/application/data/:applicationId", verifyToken, authorize([ROLES.STUDENT]),updateApplicationStatus);
// app.put("/application/data/:id", verifyToken, authorize([ROLES.STUDENT]),updateApplication);
// app.delete("/application/data/:id", verifyToken, authorize([ROLES.STUDENT]), deleteApplication);


// // API for Login
// app.post("/login", loginUser);

// // ApI for Signup
// app.post("/signup", signUpUser);


// app.listen(4400, () => {
//     connectDB();
//     console.log("express server started");
// });




// // verifyToken, authorize([ROLES.SUPERVISOR, ROLES.STUDENT, ROLES.COMPANY]) 
