import axios from 'axios';

export function getAllStudents(){
    return axios.get("http://localhost:4400/student/data");
}