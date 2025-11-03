import axios from "axios";
export function getAllInternships() {
    return axios.get("http://localhost:4400/internship/data");
}
