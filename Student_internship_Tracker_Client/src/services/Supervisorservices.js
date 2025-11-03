import axios from 'axios';

export function getAllSupervisors(){
    return axios.get("http://localhost:4400/supervisor/data");
}
