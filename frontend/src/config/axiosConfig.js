import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Set your backend base URL here
  timeout: 10000, // Optional: Set a timeout for requests
});

// Optional: Add interceptors for requests or responses if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // You can add headers or other configurations here
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;