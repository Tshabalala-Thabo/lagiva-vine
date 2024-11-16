import { useState, useEffect } from 'react';
import api from '../../config/axiosConfig'; // This imports your configured axios instance

const useProducts = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products'); // Fetch products from the backend
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

  const fetchProductById = async (id) => {
    try {
      const response = await api.get(`/products/${id}`); // Fetch a single product by ID
      return response.data;
    } catch (err) {
      console.error('Error fetching product:', err);
      throw new Error('Failed to fetch product');
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await api.delete(`/products/${productId}`); // Delete the product from the backend
      setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId)); // Update state
      return response.data.message; // Return success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to delete product. Please try again.'); // Fetch error from backend
      console.error('Error deleting product:', err);
      throw new Error(err.response?.data?.message || 'Failed to delete product. Please try again.'); // Throw error for handling in the component
    }
  };

  const createProduct = async (newProductData) => {
    try {
      const response = await api.post('/products', newProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) => [...prevProducts, response.data.product]); // Add the created product to the state
      return response.data.message // Return success message and the created product
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create product. Please try again.'); // Fetch error from backend
      console.error('Error creating product:', err);
      throw new Error(err.response?.data?.message || 'Failed to create product. Please try again.'); // Throw error for handling in the component
    }
  };

  const updateProduct = async (productId, updatedProductData) => {
    try {
      const response = await api.put(`/products/${productId}`, updatedProductData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set the content type for file upload
        },
      });
      setProducts((prevProducts) =>
        prevProducts.map((product) => (product._id === productId ? response.data.product : product))
      ); // Update the product in the state
      return response.data.message; // Return success message
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update product. Please try again.'); // Fetch error from backend
      console.error('Error updating product:', err);
      throw new Error(err.response?.data?.message || 'Failed to update product. Please try again.'); // Throw error for handling in the component
    }
  };

  return { products, isLoading, error, fetchProductById, deleteProduct, createProduct, updateProduct }; // Return fetchProductById
};

export default useProducts;
