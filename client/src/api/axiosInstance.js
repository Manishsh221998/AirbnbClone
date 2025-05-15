import axios from "axios";
import { BASE_URL } from "./endpoints";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});

// Request interceptor to add auth token and dynamically set content type
axiosInstance.interceptors.request.use(
  (config) => {
    const token = window.localStorage.getItem("usertoken");

    if (token) {
      config.headers.Authorization = token;
    }

    // Automatically set Content-Type based on request data
    if (config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
