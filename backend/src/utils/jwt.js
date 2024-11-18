import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET environment variable is not set");
}

// Generate JWT token
export const generateToken = (user) => {
  return jwt.sign(
    { 
      userId: user._id,
      role: user.role 
    }, 
    JWT_SECRET, 
    { 
      expiresIn: '1h', // You might increase this for production
      audience: 'your-app-audience', // Replace with your app’s audience if needed
      issuer: 'your-app-name'        // Replace with your app's name or domain
    }
  );
};

// Verify JWT token
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET, {
      audience: 'your-app-audience', // Same as in generateToken
      issuer: 'your-app-name',       // Same as in generateToken
    });
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error('Token has expired');
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error('Invalid token');
    } else {
      throw new Error('Token verification error');
    }
  }
};
