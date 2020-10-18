import axios from "axios";

const baseUrl = process.env.REACT_APP_URL_USER;


const apiUser =  axios.create({
    baseURL: baseUrl,
});

export default apiUser;