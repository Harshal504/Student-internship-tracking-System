import axios from 'axios';


export function SignInUser(formData){
    return axios.post("http://localhost:4400/login", formData);
}

export const registerUser = (formdata) => {
  return axios.post("http://localhost:4400/signup", formdata);
};