import axios from 'axios';
import { getAuthHeader } from "./TokenService";

const API_BASE_URL = "http://localhost:4400/application/data";

export const getAllApplications = async () => {
  return axios.get(API_BASE_URL,getAuthHeader());
};

export function updateApplication(id, updatedData) {
  return axios.put(`${API_BASE_URL}/${id}`, updatedData, getAuthHeader());
}

export function deleteApplication(id) {
  return axios.delete(`${API_BASE_URL}/${id}`, getAuthHeader());
}

export const updateApplicationStatus = async (applicationId, newStatus) => {
  return axios.put(`${API_BASE_URL}/${applicationId}`, { status: newStatus }, getAuthHeader());
};