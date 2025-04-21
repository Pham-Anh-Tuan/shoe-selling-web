import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cấu hình trong file .env
  headers: {
    "Content-Type": "application/json",
  },
});

export const axiosServer = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cấu hình trong file .env
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
