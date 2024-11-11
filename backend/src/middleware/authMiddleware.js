import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

// Middleware to verify JWT token and add user to request
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ message: 'No token, authorization denied' });
    }

    // Verify token using the utility function
    const decoded = verifyToken(token);
    
    // Find user and add to request
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ 
        message: 'User not found:',
        userId: decoded.userId, 
        role: user.role,
      });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};

// Middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    // authenticate middleware should run first
    await authenticate(req, res, () => {
      if (req.user && req.user.role === 'admin') {
        next();
      } else {
        res.status(403).json({ message: 'Access denied. Admin only.' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}; 