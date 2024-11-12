import { useState } from 'react';
import axiosInstance, { api } from '../config/axiosConfig'; // Ensure correct path

const useAuth = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axiosInstance.post('/auth/register', formData);
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
      const response = await axiosInstance.post('/auth/login', { email, password });
      const token = response.data.token;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set token in Authorization header for future requests
      api.setAuthToken(token);

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
