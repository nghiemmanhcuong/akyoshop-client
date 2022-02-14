import axiosClient from './axiosClient';

const userApi = {
    addTocart: (info) => {
        const url = '/cart/add';
        return axiosClient.post(url, info);
    },
    getCart: () => {
        const url = '/cart/get';
        return axiosClient.get(url);
    },
    deleteCart: (id) => {
        const url = `cart/delete/${id}`;
        return axiosClient.delete(url);
    },
    deleteMany: () => {
        const url = '/cart/delete-many';
        return axiosClient.delete(url);
    },
};

export default userApi;
