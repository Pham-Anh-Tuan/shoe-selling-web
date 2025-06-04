import { OrderUpdate } from '../components/Admin/OrderManager/OrderContext';
import { CartItem } from '../components/Cart/CartContext';
import { Order } from '../components/Payment/OrderInterface';
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
};

export const profileApi = {
    getByEmail(email: String) {
        return axiosClient.get('/api/user/getProfileByEmail/' + email);
    },

    updateProfile(formData: FormData) {
        return axiosServer.put('/api/user/updateProfile', formData);
    },

    getProfileSumByEmail(email: String) {
        return axiosClient.get('/api/user/getProfileSumByEmail/' + email);
    },
}

export const cartApi = {
    getNewestCartItem(updatedCart: CartItem[]) {
        return axiosClient.post('/api/public/getNewestCartItem', updatedCart);
    },
}

export const orderApi = {
    createOrder(order: Order) {
        return axiosClient.post('/api/user/createOrder', order);
    },
    getManagerProducts() {
        return axiosClient.get('/api/admin/managerOrders');
    },
    getById(id: String) {
        return axiosClient.get('/api/admin/orderDetail/' + id);
    },
    getUpdationById(id: String) {
        return axiosClient.get('/api/admin/orderUpdation/' + id);
    },
    updateOrder(orderUpdate: OrderUpdate) {
        return axiosClient.post('/api/admin/updateOrder', orderUpdate);
    },
    deleteById(id: String) {
        return axiosClient.delete(`/api/admin/cancelOrder/${id}`);
    },
}