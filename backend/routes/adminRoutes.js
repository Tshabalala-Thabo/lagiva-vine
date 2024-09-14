import express from 'express';
import { authorizeRoles } from '../middleware/roleMiddleware.js';

const router = express.Router();

// Example protected route
router.get('/admin', authorizeRoles('admin'), (req, res) => {
  res.status(200).json({ message: 'Welcome Admin!' });
});

export default router;