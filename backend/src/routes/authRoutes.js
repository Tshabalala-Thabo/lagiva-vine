import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/authController.js'; // Updated import

const router = express.Router();

// Register route
router.post('/register', registerUser); // Register a new user

// Login route
router.post('/login', async (req, res) => {
    try {
      // Your login logic here
      res.set({
        'Access-Control-Allow-Origin': process.env.FRONTEND_URL,
        'Access-Control-Allow-Credentials': 'true'
      });
      // Rest of your response
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
// Logout route
router.post('/logout', logoutUser); // Logout user

export default router;