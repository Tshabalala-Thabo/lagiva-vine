import express from 'express'
import { addItemToCart, removeItemFromCart, getCart } from '../controllers/cartController.js'
import { verifyToken } from '../utils/jwt.js'

const router = express.Router()

// Route to add item to cart
router.post('/add', verifyToken, addItemToCart)

// Route to remove item from cart
router.delete('/remove', verifyToken, removeItemFromCart)

// Route to get user's cart
router.get('/:userId', verifyToken, getCart)

export default router 