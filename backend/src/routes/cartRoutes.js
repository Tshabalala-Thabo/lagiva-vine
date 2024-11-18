import express from 'express'
import { addItemToCart, removeItemFromCart, getCart } from '../controllers/cartController.js'
import { authenticate } from '../middleware/authMiddleware.js';

const router = express.Router()

router.post('/add', authenticate, addItemToCart);
router.post('/remove', authenticate, removeItemFromCart);
router.get('/', authenticate, getCart);

//router.get('/admin/route', adminProtected, controller);


export default router 