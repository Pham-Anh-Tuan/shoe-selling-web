import { axiosClient, axiosServer } from './axiosClient';

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

export const managerProductsApi = {
    getAll() {
        return axiosClient.get('/api/managerProducts');
    },
}

export const addProductApi = {
    addProduct(formData: FormData) {
        return axiosServer.post('/api/addProduct', formData);
    },
}

export const deleteProductApi = {
    getById(id: String) {
        return axiosClient.get('/api/productDetail/' + id);
    },
}