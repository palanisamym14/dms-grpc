import axios from 'axios';
import { toast } from 'react-toastify';
const BASE_URL = `${process.env.REACT_APP_API_BASE_URL}:${process.env.REACT_APP_API_PORT}/api`;

const API = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

API.interceptors.request.use(handleRequest);
API.interceptors.response.use(handleSuccess, handleError);

function handleRequest(config) {
    try {
        const accessTokenObj = localStorage.getItem("token");
        if (accessTokenObj) {
            config.headers['authorization'] = accessTokenObj;
        }
    } catch (error) {
        console.log(error);
    }
    return config;
}

function handleSuccess(response) {
    // Success
    return response.data;
}

function handleError(error) {
    if (error.message === 'Network Error') {
        // The user doesn't have internet
        return Promise.reject(error);
    }
    let url = '';
    switch (error.response.status) {
        case 401:
            // Go to login
            localStorage.removeItem('token');
            toast.error("Token Expired")
            window.location.href = '/login';
            break;
        case 404:
            // Show 404 page
            break;
        case 500:
            toast.error(error?.response?.data?.message)
            return Promise.reject(error.response.data);
        default:
            // Unknown Error
            break;
    }
    toast.error(error?.response?.data?.message)
    return Promise.reject(error.response.data);
}

export default API;
