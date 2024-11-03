import { useState } from 'react';
import axios from 'axios';

// Set the base URL for Axios
axios.defaults.baseURL = process.env.REACT_APP_API_BASE_URL; // Update this if your backend runs on a different port

const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async ( formData ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/register', { formData });
      return response.data; // Return the response data
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.post('/auth/login', { email, password });
      localStorage.setItem('token', response.data.token); // Store token
      return response.data; // Return the response data
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err; // Rethrow the error for further handling
    } finally {
      setLoading(false);
    }
  };

  return { register, login, error, loading };
};

export default useAuth;