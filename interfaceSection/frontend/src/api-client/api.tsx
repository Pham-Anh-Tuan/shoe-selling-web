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

export const updateProductApi = {
    updateProduct(formData: FormData) {
        return axiosServer.put('/api/updateProduct', formData);
    },
}

export const deleteProductApi = {
    deleteById(id: String) {
        return axiosClient.delete(`/api/deleteProduct/${id}`);
    },
}