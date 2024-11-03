import express from 'express';
import { getAllUsers, updateUser } from '../controllers/userController.js';
import { authenticate, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Protect these routes with authentication and admin middleware
router.get('/', authenticate, isAdmin, getAllUsers);
router.put('/:id', authenticate, isAdmin, updateUser);

export default router; 