import axiosClient from './axiosClient';

const blogApi = {
    getBlog: (params) => {
        const url = 'blog/get';
        return axiosClient.get(url,{params})
    },
};

export default blogApi;
