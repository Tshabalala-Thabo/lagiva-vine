import { useState, useEffect } from 'react';
import api from '../config/axiosConfig'; // Import the configured Axios instance

const usePublishedProducts = () => {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedProducts = async () => {
      try {
        setIsLoading(true);
        const token = localStorage.getItem('token');
        const response = await api.get('/products/published', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setPublishedProducts(response.data);
      } catch (err) {
        if (err.response) {
          // Server responded with a status other than 2xx
          console.error('Server error:', err.response.status, err.response.data);
        } else if (err.request) {
          // No response was received from the server
          console.error('Network error: No response received', err.request);
        } else {
          // Other error during request setup
          console.error('Error setting up request:', err.message);
        }
        setError('Failed to fetch published products');
      } finally {
        setIsLoading(false);
      }
    };


    fetchPublishedProducts();
  }, []);

  // New function to fetch a published product by ID
  const fetchPublishedProductById = async (id) => {
    const response = await axios.get(`/products/published/${id}`); // Fetch published product by ID
    return response.data;
  };

  return { publishedProducts, isLoading, error, fetchPublishedProductById }; // Return the new function
};

export default usePublishedProducts; 