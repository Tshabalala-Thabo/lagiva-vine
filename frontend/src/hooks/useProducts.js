import { useState, useEffect } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/products'); // Fetch products from the backend
        setProducts(response.data);
      } catch (err) {
        setError('Failed to fetch products');
        console.error('Error fetching products:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const deleteProduct = async (productId) => {
    try {
      await axios.delete(`/products/${productId}`); // Delete the product from the backend
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId)); // Update state
    } catch (err) {
      setError('Failed to delete product. Please try again.');
      console.error('Error deleting product:', err);
    }
  };

  const createProduct = async (newProductData) => {
    try {
      const response = await axios.post('/products', newProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data]); // Add the created product to the state
    } catch (err) {
      setError('Failed to create product. Please try again.');
      console.error('Error creating product:', err);
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await axios.put(`/products/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? response.data.product : product))
      ); // Update the product in the state
    } catch (err) {
      setError('Failed to update product. Please try again.');
      console.error('Error updating product:', err);
    }
  };

  return { products, isLoading, error, deleteProduct, createProduct, updateProduct }; // Return create and update functions
};

export default useProducts;
