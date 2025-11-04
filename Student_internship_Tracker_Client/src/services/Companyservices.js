import axios from 'axios';
import { getAuthHeader } from './TokenService';

export function getAllCompanies(){
    return axios.get("http://localhost:4400/company/data",getAuthHeader());
}
