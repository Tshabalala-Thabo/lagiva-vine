import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'; // Updated import

const router = express.Router();

// Register route
router.post('/register', registerUser); // Register a new user

// Login route
router.post('/login', loginUser); // Login user

// Logout route
router.post('/logout', logoutUser); // Logout user

export default router;