import axios from 'axios';

const API_BASE_URL = "http://localhost:4400/application/data";

export const getAllApplications = async () => {
  return axios.get(API_BASE_URL);
};

export function updateApplication(id, updatedData) {
  return axios.put(`${API_BASE_URL}/${id}`, updatedData);
}

export function deleteApplication(id) {
  return axios.delete(`${API_BASE_URL}/${id}`);
}

export const updateApplicationStatus = async (applicationId, newStatus) => {
  return axios.put(`${API_BASE_URL}/${applicationId}`, { status: newStatus });
};