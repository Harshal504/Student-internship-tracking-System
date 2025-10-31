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


// Api for Companies
app.get("/company/data", getAllCompanies);


// Api for supervisor
app.get("/supervisor/data", getAllSupervisors);

app.listen(4400, () => {
    connectDB();
    console.log("express server started");
});