// src/services/dashboardServices.js
import axios from "axios";

// 🔹 Student
export const getStudentSkills = (studentId) =>
  axios.get(`http://localhost:4400/skills/${studentId}`);

export const getStudentApplications = (studentId) =>
  axios.get(`http://localhost:4400/application/data/${studentId}`);

export const getAllInternships = () =>
  axios.get(`http://localhost:4400/internship/data`);

// 🔹 Company
export const getCompanyInternships = (companyId) =>
  axios.get(`http://localhost:4400/internship/${companyId}`);

export const getCompanyApplications = (companyId) =>
  axios.get(`http://localhost:4400/application/${companyId}`);

// 🔹 Supervisor
export const getStudentsBySupervisor = (supervisorId) =>
  axios.get(`http://localhost:4400/student/${supervisorId}`);
