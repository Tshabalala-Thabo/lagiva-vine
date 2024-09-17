import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const useFetchProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Fetch products from the backend
        setProducts(response.data);
      } catch (err) {
        setError(err);
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return { products, isLoading, error };
};

export default useFetchProducts;