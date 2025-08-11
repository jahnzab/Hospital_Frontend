// src/config/apiConfig.js
const API_BASE_URL =
  process.env.NODE_ENV === "development"
  ? "https://hospital-backend-1-ygmp.onrender.com"
    : "http://localhost:8000" // FastAPI backend locally
   

export default API_BASE_URL;
