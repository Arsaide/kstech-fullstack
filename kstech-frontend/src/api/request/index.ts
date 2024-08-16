import axios from 'axios';

// const API_URL = `https://kstech-backend.onrender.com`;
// const API_URL = 'http://localhost:7000';
const API_URL = process.env.API_URL || 'http://localhost/api';

const $api = axios.create({
    // withCredentials: true,
    baseURL: API_URL,
});

$api.interceptors.request.use(config => {
    // config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
    return config;
});

export default $api;
