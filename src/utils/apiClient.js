// src/utils/apiClient.js
import axios from "axios";
import API_BASE_URL from "../config/apiConfig";

// Create axios instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// Middleware to add token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // token from login
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
