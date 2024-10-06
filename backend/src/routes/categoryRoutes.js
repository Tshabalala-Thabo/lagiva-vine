import express from 'express';
import { createCategory, getCategories, updateCategory, deleteCategory } from '../controllers/categoryController.js';

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);
router.put('/:id', updateCategory); // Route for updating a category
router.delete('/:id', deleteCategory); // Route for deleting a category

// Additional routes (if any) can be added here

export default router;