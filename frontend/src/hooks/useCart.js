import { useCallback } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const useCart = () => {
  const addItemToCart = useCallback(async (itemId, quantity) => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('token'); // Adjust key if different

      // Make the POST request with the Authorization header
      const response = await axios.post(
        '/cart/add',
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the JWT token
          },
        }
      );

      const cart = response.data; // Access the cart from the response
      return cart; // Return the updated cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }, []);

  return { addItemToCart };
};

export default useCart;
