import { useState } from 'react';
import api from '../config/axiosConfig';

const useAuth = (fetchCart) => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchCsrfToken = async () => {
    try {
      const response = await api.get('/csrf-token'); // Backend endpoint to fetch the CSRF token
      document.cookie = `CSRF-Token=${response.data.csrfToken}; path=/; SameSite=Strict; Secure`;
    } catch (error) {
      console.error('Failed to fetch CSRF token:', error);
    }
  };

  const register = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/register', formData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set token in Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch CSRF token
      await fetchCsrfToken();

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    setLoading(true);
    setError(null);
    try {
      const response = await api.post('/auth/login', { email, password });
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('token', token);

      // Set token in Authorization header
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      // Fetch CSRF token
      await fetchCsrfToken();

      // Fetch cart after successful login
      if (fetchCart) {
        await fetchCart();
      }

      return response.data;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  };


  const logout = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('token');

      // Remove token from Authorization header
      delete api.defaults.headers.common['Authorization'];

      // Call logout endpoint
      await api.post('/auth/logout');

      // Clear CSRF cookie
      document.cookie = 'CSRF-Token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; SameSite=Strict; Secure';
    } catch (err) {
      setError('Error logging out');
    }
  };


  return { register, login, logout, error, loading };
};

export default useAuth;