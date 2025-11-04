import axios from "axios";
import { getAuthHeader } from "./TokenService";



export function getAllInternships() {
    return axios.get("http://localhost:4400/internship/data", getAuthHeader());
}
