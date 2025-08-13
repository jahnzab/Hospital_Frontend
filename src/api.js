// src/api.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://hospital-backend-1-ygmp.onrender.com",
});

export default api;
