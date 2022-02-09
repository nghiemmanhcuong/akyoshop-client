import axiosClient from './axiosClient';

const authApi = {
    loginUser: (loginForm) => {
        const url = '/auth/login';
        return axiosClient.post(url, loginForm);
    },
    registerUser: (registerForm) => {
        const url = '/auth/register';
        return axiosClient.post(url, registerForm);
    },
    setLoginAuth: () => {
        const url = '/auth/get';
        return axiosClient.get(url);
    }
};

export default authApi;
