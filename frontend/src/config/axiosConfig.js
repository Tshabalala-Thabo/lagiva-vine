import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://mrn-b453.vercel.app/api',
  withCredentials: true,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Store CSRF token in memory
let csrfToken = null;

const fetchCsrfToken = async () => {
  try {
    const response = await axiosInstance.get('/csrf-token');
    csrfToken = response.data.csrfToken;
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    if (config.method !== 'get' && !config.url.includes('/auth/')) {
      try {
        const token = await fetchCsrfToken();
        config.headers['CSRF-Token'] = token;
      } catch (error) {
        console.error('Failed to fetch CSRF token:', error);
      }
    }
    
    const authToken = localStorage.getItem('token');
    if (authToken) {
      config.headers['Authorization'] = `Bearer ${authToken}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  response => response,
  async error => {
    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      csrfToken = null;
      try {
        const token = await fetchCsrfToken();
        error.config.headers['CSRF-Token'] = token;
        return axiosInstance(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;