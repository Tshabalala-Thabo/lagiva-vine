import express from 'express'
import { createCategory, updateCategory, deleteCategory,getCategories } from '../controllers/categoryController.js'
import { adminProtected } from '../middleware/authMiddleware.js';
const router = express.Router()

router.post('/', adminProtected, createCategory);
router.get('/', getCategories);
router.put('/:id', adminProtected, updateCategory);
router.delete('/:id', adminProtected, deleteCategory);

//router.get('/admin/route', adminProtected, controller);


export default router 