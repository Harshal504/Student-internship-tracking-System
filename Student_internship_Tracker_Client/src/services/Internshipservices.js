import axios from "axios";
export function getAllInternships() {
    return axios.get("http://localhost:4400/internship/data");
}

export function postInternship(data) {
    return axios.post(`http://localhost:4400/internship/data`, data);
}

export function applyToInternship(data) {
    return axios.post(`http://localhost:4400/application/create`, data);
}

export const updateInternshipStatus = async (internshipId, newStatus) => {
  return axios.put(`http://localhost:4400/status/${internshipId}`, {
    status: newStatus,
  });
};
