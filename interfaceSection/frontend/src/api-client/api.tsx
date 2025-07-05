import { OrderUpdate } from '../components/Admin/OrderManager/OrderContext';
import { CartItem } from '../components/Cart/CartContext';
import { Order } from '../components/Payment/OrderInterface';
import { LoginData, RegisterData } from '../components/SignInOut/authTypes';
import { axiosClient, axiosServer } from './axiosClient';

export const productDetailApi = {
    getById(id: String) {
        return axiosClient.get('/api/public/productDetail/' + id);
    },
}

export const addProductApi = {
    addProduct(formData: FormData) {
        return axiosServer.post('/api/staff/addProduct', formData);
    },
}

export const updateProductApi = {
    updateProduct(formData: FormData) {
        return axiosServer.put('/api/staff/updateProduct', formData);
    },
}

export const deleteProductApi = {
    deleteById(id: String) {
        return axiosClient.delete(`/api/staff/deleteProduct/${id}`);
    },
}

export const productApi = {
    getProductByType(types: number[], page: number, size: number) {
        const params = new URLSearchParams();

        types.forEach((type) => {
            params.append("types", type.toString());
        });

        params.append("page", page.toString());
        params.append("size", size.toString());

        return axiosClient.get(`/api/public/getProductsByType`, { params });
    },

    getManagerProducts(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());

        return axiosClient.get(`/api/staff/managerProducts`, { params });
    },

    searchManagerProducts(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/staff/searchManagerProducts`, { params });
    },

    searchProducts(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/public/search`, { params });
    },

    getRelatedProducts(types: number[], excludedId: string, page: number, size: number) {
        const params = new URLSearchParams();

        types.forEach((type) => {
            params.append("types", type.toString());
        });

        params.append("excludedId", excludedId);
        params.append("page", page.toString());
        params.append("size", size.toString());

        return axiosClient.get(`/api/public/related`, { params });
    }
};


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

export const accountApi = {
    addAccount(formData: FormData) {
        return axiosServer.post('/api/admin/addAccount', formData);
    },

    updateAccount(formData: FormData) {
        return axiosServer.put('/api/admin/updateAccount', formData);
    },

    getAccountDetail(id: String) {
        return axiosClient.get('/api/admin/getAccountDetail/' + id);
    },

    getManagerAccounts(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get('/api/admin/managerAccounts', { params });
    },

    searchManagerAccounts(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/admin/searchManagerAccounts`, { params });
    },
}

export const cartApi = {
    getNewestCartItem(updatedCart: CartItem[]) {
        return axiosClient.post('/api/public/getNewestCartItem', updatedCart);
    },
}

export const bannerApi = {
    getBannerDetail(id: String) {
        return axiosClient.get('/api/staff/bannerDetail/' + id);
    },

    getHomeBanners() {
        return axiosClient.get('/api/public/homeBanners');
    },

    getManagerBanners(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get('/api/staff/managerBanners', { params });
    },

    searchManagerBanners(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/staff/searchManagerBanners`, { params });
    },

    createBanner(formData: FormData) {
        return axiosServer.post('/api/staff/createBanner', formData);
    },

    updateBanner(formData: FormData) {
        return axiosServer.post('/api/staff/updateBanner', formData);
    },

    deleteBannerById(id: String) {
        return axiosClient.delete(`/api/staff/deleteBannerById/${id}`);
    },
}

export const blogApi = {
    createBlog(formData: FormData) {
        return axiosServer.post('/api/staff/createBlog', formData);
    },

    updateBlog(formData: FormData) {
        return axiosServer.put('/api/staff/updateBlog', formData);
    },

    deleteBlogById(id: String) {
        return axiosClient.delete(`/api/staff/deleteBlogById/${id}`);
    },

    getSumBlogs(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get('/api/public/sumBlogs', { params });
    },
    
    getManagerBlogs(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get('/api/staff/managerBlogs', { params });
    },

    searchManagerBlogs(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/staff/searchManagerBlogs`, { params });
    },

    getBlogPage(id: String) {
        return axiosClient.get('/api/public/blogPage/' + id);
    },

    getBlogDetail(id: String) {
        return axiosClient.get('/api/staff/blogDetail/' + id);
    },
}

export const orderApi = {
    createOrder(order: Order) {
        return axiosClient.post('/api/user/createOrder', order);
    },

    getManagerOrders(page: number, size: number) {
        const params = new URLSearchParams();
        params.append("page", page.toString());
        params.append("size", size.toString());

        return axiosClient.get('/api/staff/managerOrders', { params });
    },

    searchManagerOrders(keyword: string, page: number, size: number) {
        const params = new URLSearchParams();
        params.append("keyword", keyword);
        params.append("page", page.toString());
        params.append("size", size.toString());
        return axiosClient.get(`/api/staff/searchManagerOrders`, { params });
    },

    getById(id: String) {
        return axiosClient.get('/api/staff/orderDetail/' + id);
    },
    getUpdationById(id: String) {
        return axiosClient.get('/api/staff/orderUpdation/' + id);
    },
    updateOrder(orderUpdate: OrderUpdate) {
        return axiosClient.post('/api/staff/updateOrder', orderUpdate);
    },
    deleteById(id: String) {
        return axiosClient.delete(`/api/staff/cancelOrder/${id}`);
    },
}