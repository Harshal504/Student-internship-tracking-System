import express from 'express';
import cors from 'cors';

import { connectDB } from "./src/configs/dbConfig.js";
import { getAllSupervisors, addSupervisors, updateSupervisors, deleteSupervisors } from './src/controllers/SupervisorController.js';
import { getAllStudents, addStudents, updateStudents, delStudents } from './src/controllers/StudentController.js';
import { getAllCompanies, addCompanies, updateCompanies, delCompanies } from './src/controllers/CompanyController.js';

const app = express();
app.use(express.json());
app.use(cors());

// The root url
app.get("/", (request, response) => {
    response.send("test express");
    console.log("get request processed");
});

// Api for Student
app.get("/student/data", getAllStudents);
app.post("/student/data", addStudents);
app.put("/student/data/:id", updateStudents);
app.delete("/student/data/:id", delStudents);


// Api for Companies
app.get("/company/data", getAllCompanies);
app.post("/company/data", addCompanies);
app.put("/company/data/:id", updateCompanies);
app.delete("/company/data/:id", delCompanies);





// // Api for supervisor
app.get("/supervisor/data", getAllSupervisors);
app.post("/supervisor/data", addSupervisors);
app.put("/supervisor/data/:id", updateSupervisors);
app.delete("/supervisor/data/:id", deleteSupervisors);


app.listen(4400, () => {
    connectDB();
    console.log("express server started");
});
