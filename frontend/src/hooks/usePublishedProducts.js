import { useState, useEffect } from 'react';
import api from '../config/axiosConfig';

const usePublishedProducts = () => {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedProducts = async () => {
      try {
        setIsLoading(true);
        // Note the /api prefix for Express routes
        const response = await api.get('/products/published');
        setPublishedProducts(response.data);
      } catch (err) {
        if (err.response) {
          console.error('Server error:', err.response.status, err.response.data);
        } else if (err.request) {
          console.error('Network error: No response received', err.request);
        } else {
          console.error('Error setting up request:', err.message);
        }
        setError('Failed to fetch published products');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedProducts();
  }, []);

  // Function to fetch a published product by ID
  const fetchPublishedProductById = async (id) => {
    try {
      // Note the /api prefix for Express routes
      const response = await api.get(`/products/published/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw err;
    }
  };

  return { publishedProducts, isLoading, error, fetchPublishedProductById };
};

export default usePublishedProducts;