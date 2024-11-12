import express from 'express'
import { createCategory, updateCategory, deleteCategory,getCategories } from '../controllers/categoryController.js'
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/categories', authenticate, isAdmin, createCategory);
router.get('/categories', getCategories);
router.put('/categories/:id', authenticate, isAdmin, updateCategory);
router.delete('/categories/:id', authenticate, isAdmin, deleteCategory);

//router.get('/admin/route', adminProtected, controller);


export default router 