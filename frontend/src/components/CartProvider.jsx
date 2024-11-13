import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'
import axios from '../config/axiosConfig'

// Create Context
const CartContext = createContext()

// Provider Component
export const CartProvider = ({ children }) => {
  const [cartItemCount, setCartItemCount] = useState(0)

  const fetchCartItemCount = useCallback(async () => {
    try {
      const token = localStorage.getItem('token')
      if (!token) return

      const response = await axios.get('/cart', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      const cart = response.data
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalCount)
    } catch (error) {
      console.error('Error fetching cart item count:', error)
    }
  }, [])

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

      const cart = response.data
      const totalCount = cart.reduce((total, item) => total + item.quantity, 0)
      setCartItemCount(totalCount)
      return cart
    } catch (error) {
      console.error('Error adding item to cart:', error)
      throw error
    }
  }, [])

  useEffect(() => {
    if (localStorage.getItem('token')) {
      fetchCartItemCount()
    }
  }, [fetchCartItemCount])

  return (
    <CartContext.Provider value={{ cartItemCount, addItemToCart, fetchCartItemCount }}>
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