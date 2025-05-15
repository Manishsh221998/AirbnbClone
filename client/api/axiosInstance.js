import axios from "axios";
import BASE_URL from "./endpoints";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

// Add Authorization token only when needed
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  // Only add token if it exists AND endpoint is not `/user-register`
  if (token && !config.url.includes("/user-register")) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
