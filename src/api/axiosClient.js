import axios from 'axios';
import {LOCAL_STORE_ACCESS_TOKEN} from '../context/constants';
import queryString from 'query-string';

const axiosClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
    const token = JSON.parse(localStorage.getItem(LOCAL_STORE_ACCESS_TOKEN));
    if (token) {
        config.headers.Authorization = 'Bearer ' + token;
    }
    return config;
});

axiosClient.interceptors.response.use(
    (response) => {
        if (response && response.data) {
            return response.data;
        } else {
            return response;
        }
    },
    (error) => {
        throw error;
    },
);

export default axiosClient;
