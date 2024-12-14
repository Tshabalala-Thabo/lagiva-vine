import axios from 'axios';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
  headers: {
    "X-CSRF-TOKEN": document.querySelector('meta[name="csrf-token"]')?.content,
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Add CSRF token from cookies (or fetch it if not available)
    const csrfToken = document.cookie
      .split('; ')
      .find((row) => row.startsWith('CSRF-Token='))
      ?.split('=')[1];
    if (csrfToken) {
      config.headers['CSRF-Token'] = csrfToken;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
    }
    return Promise.reject(error);
  }
);

export default api;
