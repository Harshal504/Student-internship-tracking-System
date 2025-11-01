import express from 'express';

import { connectDB } from "./src/configs/dbConfig.js";
import { getAllSupervisors } from './src/controllers/SupervisorController.js';
import { getAllStudents } from './src/controllers/StudentController.js';
import { getAllCompanies } from './src/controllers/CompanyController.js';

const app = express();

// The root url
app.get("/", (request, response) => {
    response.send("test express");
    console.log("get request processed");
});

// Api for Student
app.get("/student/data", getAllStudents);
app.post("/student/data", addStudents);
app.put("/student/data", updateStudents);
app.delete("/student/data", delStudents);


// Api for Companies
app.get("/company/data", getAllCompanies);
app.post("/company/data", addCompanies);
app.put("/company/data", updateCompanies);
app.delete("/company/data", delCompanies);





// Api for supervisor
app.get("/supervisor/data", getAllSupervisors);
app.post("/supervisor/data", addSupervisors);
app.put("/supervisor/data", updateSupervisors);
app.delete("/supervisor/data", deleteSupervisors);


app.listen(4400, () => {
    connectDB();
    console.log("express server started");
});