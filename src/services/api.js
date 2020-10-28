import axios from "axios";

const api =  axios.create({
    baseURL: "https://smartvit-winery-dev.herokuapp.com/",
});

export default api;