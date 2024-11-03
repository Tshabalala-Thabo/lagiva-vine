import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id,
      role: user.role 
    }, 
    JWT_SECRET, 
    { expiresIn: '1h' }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error('Invalid token');
  }
}; 