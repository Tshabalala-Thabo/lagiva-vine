import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret

export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; // Get token from Authorization header
    if (!token) return res.status(403).json({ message: 'No token provided' });

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
      if (err) return res.status(401).json({ message: 'Unauthorized' });
      if (!roles.includes(decoded.role)) return res.status(403).json({ message: 'Forbidden' });
      req.user = decoded; // Attach user info to request
      next();
    });
  };
};