import axios from "axios";

const baseUrl = "https://smartvit-winery-dev.herokuapp.com/";

const apiWinery =  axios.create({
    baseURL: baseUrl,
});

export default apiWinery;