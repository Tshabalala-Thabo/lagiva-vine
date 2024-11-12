import { verifyToken } from '../utils/jwt.js';
import User from '../models/User.js';

// Middleware to verify JWT token and add user to request
export const authenticate = async (req, res, next) => {
  try {
    // Get token from header
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token || typeof token !== 'string') {
      return res.status(401).json({ message: 'Authentication required' });
    }

    // Verify token using the utility function
    const decoded = verifyToken(token);
    
    if (!decoded?.userId) {
      return res.status(401).json({ message: 'Invalid token format' });
    }

    // Find user and add to request
    const user = await User.findById(decoded.userId).select('-password');
    if (!user) {
      return res.status(401).json({ message: 'Authentication failed' });
    }

    req.user = user;
    next();
  } catch (error) {
    // Log the actual error internally but don't expose it
    console.error('Auth error:', error);
    res.status(401).json({ message: 'Authentication failed' });
  }
};

// Middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  if (req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

// Example of how to use them together
export const adminProtected = [authenticate, isAdmin];

// Usage in routes:
// router.get('/admin/dashboard', adminProtected, dashboardController);