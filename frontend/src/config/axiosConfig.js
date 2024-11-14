import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
  timeout: 10000,
  withCredentials: true, // Enable sending cookies with requests
});

// Store CSRF token in memory
let csrfToken = null;

// Fetch CSRF token if it hasn't been fetched already or is invalid
const fetchCsrfToken = async () => {
  if (csrfToken) {
    console.log('Using cached CSRF token');
    return csrfToken;
  }

  try {
    const response = await axiosInstance.get('/csrf-token');
    csrfToken = response.data.csrfToken;
    console.log('Fetched new CSRF token:', csrfToken);
    return csrfToken;
  } catch (error) {
    console.error('Error fetching CSRF token:', error);
    throw error;
  }
};

// Request interceptor to attach CSRF token to non-GET requests
axiosInstance.interceptors.request.use(
  async (config) => {
    // Exclude GET requests and auth-related endpoints from CSRF token
    if (config.method?.toLowerCase() === 'get' || config.url?.includes('/auth/')) {
      return config;
    }

    try {
      // Ensure CSRF token is fetched and included in the headers
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

// Response interceptor for handling CSRF-related errors
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Check if CSRF token needs to be refreshed
    if (error.response?.status === 403 && error.response?.data?.message?.includes('CSRF')) {
      csrfToken = null; // Clear stored token

      try {
        // Fetch new CSRF token and retry the original request
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

// Helper methods for API operations
export const api = {
  get: (url, config = {}) => axiosInstance.get(url, config),
  post: (url, data = {}, config = {}) => axiosInstance.post(url, data, config),
  put: (url, data = {}, config = {}) => axiosInstance.put(url, data, config),
  delete: (url, config = {}) => axiosInstance.delete(url, config),
  
  // Function to set auth token in headers
  setAuthToken: (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  },
  
  // Clear CSRF token manually (useful for logout)
  clearCsrfToken: () => {
    csrfToken = null;
  }
};

export default axiosInstance;
