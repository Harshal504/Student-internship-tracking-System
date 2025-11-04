import axios from 'axios';
import { getAuthHeader } from "./TokenService";


export function getAllStudents(){
    return axios.get("http://localhost:4400/student/data", getAuthHeader());
}