import { useCallback, useEffect, useState } from 'react';
import axios from '../config/axiosConfig'; // Import the configured Axios instance

const useCart = () => {
  const [cartItemCount, setCartItemCount] = useState(0); // State to hold cart item count

  const addItemToCart = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
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
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total item count
      console.log('Total count after adding item:', totalCount); // Debug log
      setCartItemCount(totalCount); // Update the cart item count state based on server response
      return cart; // Return the updated cart
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error; // Rethrow the error for handling in the component
    }
  }, []);

  // Fetch cart item count from the backend
  const fetchCartItemCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token
        },
      });

      const cart = response.data; // Assuming the response contains the cart array
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0); // Calculate total item count
      console.log('Total count fetched from server:', totalCount); // Debug log
      setCartItemCount(totalCount); // Set the total item count
    } catch (error) {
      console.error('Error fetching cart item count:', error);
    }
  }, []);

  // Effect to fetch cart item count when the component mounts
  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCartItemCount(); // Fetch cart item count if logged in
    }
  }, [fetchCartItemCount]); // Dependency array includes fetchCartItemCount

  useEffect(() => {
    console.log('Current cart item count:', cartItemCount); // Debug log for cart item count
  }, [cartItemCount]); // Log whenever cartItemCount changes

  return { addItemToCart, cartItemCount }; // Return the cart item count along with the addItemToCart function
};
export default useCart;

