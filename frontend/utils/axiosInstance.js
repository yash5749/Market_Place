// src/utils/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // change when deployed
  withCredentials: true, // so cookies (tokens) are sent
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
