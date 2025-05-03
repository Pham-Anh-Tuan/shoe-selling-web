import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";

const attachAuthToken = (axiosInstance: AxiosInstance): void => {
    // Gắn token cho mọi request
    axiosInstance.interceptors.request.use(
        (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
            const token = localStorage.getItem("token");
            console.log("token la: ", token);
            // console.log("config.headersweb.cors la: ", config.headers);
            if (token && config.headers) {
                config.headers["Authorization"] = `Bearer ${token}`;
            }
            return config;
        },
        (error) => {
            return Promise.reject(error);
        }
    );

    // Tự động logout nếu token hết hạn
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error: AxiosError) => {
            if (error.response?.status === 401) {
                // Token hết hạn hoặc không hợp lệ
                console.warn("Token expired or unauthorized. Logging out...");
                localStorage.removeItem("token");

                // Optional: chuyển hướng về trang login
                window.location.href = "/login"; // hoặc sử dụng react-router
            }

            return Promise.reject(error);
        }
    );
};

export default attachAuthToken;