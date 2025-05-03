import { LoginData, RegisterData } from '../components/SignInOut/authTypes';
import { axiosClient, axiosServer } from './axiosClient';

export const homeProductsApi = {
    getAll() {
        return axiosClient.get('/api/public/homeProducts');
    },
}

export const productDetailApi = {
    getById(id: String) {
        return axiosClient.get('/api/public/productDetail/' + id);
    },
}

export const managerProductsApi = {
    getAll() {
        return axiosClient.get('/api/admin/managerProducts');
    },
}

export const addProductApi = {
    addProduct(formData: FormData) {
        return axiosServer.post('/api/admin/addProduct', formData);
    },
}

export const updateProductApi = {
    updateProduct(formData: FormData) {
        return axiosServer.put('/api/admin/updateProduct', formData);
    },
}

export const deleteProductApi = {
    deleteById(id: String) {
        return axiosClient.delete(`/api/admin/deleteProduct/${id}`);
    },
}

export const authApi = {
    login(loginData: LoginData) {
        return axiosClient.post('/api/public/login', loginData);
    },
    register(registerData: RegisterData) {
        return axiosClient.post('/api/public/register', registerData);
    },

    logout() {
        return axiosClient.post('/logout');
    },

    getProfile() {
        return axiosClient.get('/profile');
    },
};