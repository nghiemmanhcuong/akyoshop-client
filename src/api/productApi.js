import axiosClient from './axiosClient';

const productApi = {
    getNewProduct: () => {
        const url = '/product/new-product';
        return axiosClient.get(url);
    },
    getPopularProduct: () => {
        const url = '/product/popular-product';
        return axiosClient.get(url);
    },
    getTrousers: (params) => {
        const url = '/product/get-trouser';
        return axiosClient.get(url, {params});
    },
    getShirst: (params) => {
        const url = '/product/get-shirst';
        return axiosClient.get(url, {params});
    },
    getCategory: () => {
        const url = '/category/get';
        return axiosClient.get(url);
    },
    getProductBySlug: (slug) => {
        const url = `/product/get/${slug}`;
        return axiosClient.get(url);
    },
    getProductRandom: () => {
        const url = '/product/get-random';
        return axiosClient.get(url);
    }
};

export default productApi;
