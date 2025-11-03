import axios from 'axios';

export function getAllCompanies(){
    return axios.get("http://localhost:4400/company/data");
}
