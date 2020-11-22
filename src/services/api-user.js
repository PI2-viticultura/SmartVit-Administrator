import axios from "axios";

const baseUrl = "https://smartvit-user-dev.herokuapp.com/";


const apiUser =  axios.create({
    baseURL: baseUrl,
});

export default apiUser;