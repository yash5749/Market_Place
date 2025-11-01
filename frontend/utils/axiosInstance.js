// // src/utils/axiosInstance.js
// import axios from "axios";

// const axiosInstance = axios.create({
//   baseURL: import.meta.env.VITE_API_BASE_URL, // change when deployed
//   withCredentials: true, // so cookies (tokens) are sent
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default axiosInstance;

import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true, // still allows cookies, if ever used
  headers: { "Content-Type": "application/json" },
});

// Automatically attach token from localStorage
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
