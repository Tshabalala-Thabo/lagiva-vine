import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
});

// Store CSRF token
let csrfToken = null;

// Function to fetch CSRF token
const fetchCsrfToken = async () => {
  if (csrfToken) return csrfToken;
  
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
    // Skip CSRF token for GET requests and auth endpoints
    if (
      config.method?.toLowerCase() === 'get' || 
      config.url?.includes('/auth/')
    ) {
      return config;
    }

    try {
      const token = await fetchCsrfToken();
      config.headers['CSRF-Token'] = token;
      return config;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Handle CSRF token expiration/invalidation
    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      csrfToken = null; // Clear stored token
      
      try {
        // Fetch new token and retry the original request
        await fetchCsrfToken();
        return axiosInstance(error.config);
      } catch (retryError) {
        return Promise.reject(retryError);
      }
    }
    return Promise.reject(error);
  }
);

// Helper methods for common API operations
export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  
  // Add new token to headers (useful for auth)
  setAuthToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },
  
  // Clear CSRF token (useful for logout)
  clearCsrfToken: () => {
    csrfToken = null;
  }
};

export default axiosInstance;