import axiosClient from './axiosClient';

const orderApi = {
    addOrder: (info) => {
        const url = '/order/add';
        return axiosClient.post(url, info);
    },
};

export default orderApi;