import axios from "axios";

const baseUrl = process.env.REACT_APP_URL_ADMIN;


const apiAdmin =  axios.create({
    baseURL: baseUrl,
});

export default apiAdmin;