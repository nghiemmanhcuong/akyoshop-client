import axiosClient from './axiosClient';

const blogApi = {
    getBlog: (params) => {
        const url = 'blog/get';
        return axiosClient.get(url, {params});
    },

    getBlogDetail: (slug) => {
        const url = `blog/get-detail/${slug}`;
        return axiosClient.get(url);
    },
    getBlogRandom: () => {
        const url = 'blog/get-random';
        return axiosClient.get(url);
    },
};

export default blogApi;
