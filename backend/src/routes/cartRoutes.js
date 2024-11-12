import express from 'express'
import { addItemToCart, removeItemFromCart, getCart } from '../controllers/cartController.js'
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/cart/add', authenticate, addItemToCart);
router.post('/cart/remove', authenticate, removeItemFromCart);
router.get('/cart', authenticate, getCart);

//router.get('/admin/route', adminProtected, controller);


export default router 