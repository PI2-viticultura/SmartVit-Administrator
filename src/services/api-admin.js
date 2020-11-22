import axios from "axios";

const baseUrl = "https://smartvit-admin-dev.herokuapp.com/";


const apiAdmin =  axios.create({
    baseURL: baseUrl,
});

export default apiAdmin;