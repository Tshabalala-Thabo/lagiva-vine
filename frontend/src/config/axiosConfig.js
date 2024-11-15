import axios from 'axios';

const api = axios.create({
  // Use environment variable for API URL
  baseURL: process.env.REACT_APP_API_URL || 'https://mrn-b453.vercel.app/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use(
  async (config) => {
    // Get token from localStorage (if you're using JWT)
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Handle unauthorized access (optional)
      localStorage.removeItem('token');
      // Redirect to login or handle as needed
    }
    return Promise.reject(error);
  }
);

export default api;