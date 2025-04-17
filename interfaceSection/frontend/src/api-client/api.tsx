import { axiosClient } from './axiosClient';

export const homeProductsApi = {
    getAll() {
        return axiosClient.get('/api/homeProducts');
    },
}

export const productDetailApi = {
    getById(id: String) {
        return axiosClient.get('/api/productDetail/' + id);
    },
}