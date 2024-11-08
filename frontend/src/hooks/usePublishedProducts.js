import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const usePublishedProducts = () => {
  const [publishedProducts, setPublishedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPublishedProducts = async () => {
      try {
        const response = await axios.get('/products/published'); // Fetch published products from the backend
        setPublishedProducts(response.data);
      } catch (err) {
        setError('Failed to fetch published products');
        console.error('Error fetching published products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPublishedProducts();
  }, []);

  return { publishedProducts, isLoading, error };
};

export default usePublishedProducts; 