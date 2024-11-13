import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import axios from '../config/axiosConfig'

// Create Context
const CartContext = createContext()

// Provider Component
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([])
  const [cartItemCount, setCartItemCount] = useState(0)

  const fetchCart = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      setCart(response.data)
      console.log('Retrieved cart object:', response.data)
      console.log('Current cart state:', cart)

    } catch (error) {
      console.error('Error fetching cart:', error)
    }
  }, [])

  useEffect(() => {
    console.log("Current cart state:", cart);
  }, [cart]);
  

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCart()
    }
  }, [fetchCart])

  useEffect(() => {
    const totalCount = cart.reduce((total, item) => total + item.quantity, 0)
    setCartItemCount(totalCount)
  }, [cart])

  const addItemToCart = useCallback(async (itemId, quantity) => {
    try {
      const token = localStorage.getItem('token')
      const response = await axios.post(
        '/cart/add',
        { itemId, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )

      const updatedCart = response.data
      setCart(response.data)
      console.log('Current cart state:', cart)

      const totalCount = updatedCart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalCount)

      return updatedCart
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }, [])

  return (
    <CartContext.Provider value={{ cartItemCount, addItemToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  )
}

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
} 