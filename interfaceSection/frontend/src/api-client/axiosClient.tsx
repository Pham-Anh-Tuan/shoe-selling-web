import axios from "axios";

export const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // cấu hình trong file .env
  headers: {
    "Content-Type": "application/json",
  },
});