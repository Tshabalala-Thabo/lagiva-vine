import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import api from '../config/axiosConfig'; // This imports your configured axios instance

// Create Context
const CartContext = createContext();

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);

  // Function to fetch the cart items
  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const response = await api.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(response.data);
      console.log('Retrieved cart object:', response.data);
      console.log('Current cart state after fetch:', cart);
    } catch (error) {
      console.error('Error fetching cart:', error);
    }
  }, [cart]);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCart();
    }
  }, [fetchCart]);

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0);
    setCartItemCount(totalCount);
    console.log('Updated cart state:', cart);
  }, [cart]);

  const addItemToCart = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token');
      const response = await api.post(
        '/cart/add',
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedCart = response.data;
      setCart(updatedCart);
      console.log('Current cart state after adding item:', updatedCart);

      const totalCount = updatedCart.reduce((total, item) => total + item.quantity, 0);
      setCartItemCount(totalCount);

      return updatedCart;
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  }, []);

  const clearCart = () => {
    setCart([]);
    setCartItemCount(0);
  };

  return (
    <CartContext.Provider value={{ cart, cartItemCount, addItemToCart, fetchCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook for Cart Context
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
