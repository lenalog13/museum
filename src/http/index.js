import axios from 'axios';

export const API_URL = `http://localhost:8080/api/v1`

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use(function (config) {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    } else {
        delete config.headers.Authorization;
    }
    return config;
}, function(error) {
    return Promise.reject(error);
});
export default $api;