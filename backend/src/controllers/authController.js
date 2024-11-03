import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js'; // Import the generateToken function

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, role } = req.body; // Include role in the request body
  try {
    const newUser = new User({ email, password, role: role || 'user' }); // Default to 'user' if no role is provided
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(400).json({ message: 'Error registering user', error });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

    const token = generateToken(user);
    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error });
  }
};

// Logout user
export const logoutUser = (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: 'Error logging out', error: err });
    }
    res.status(200).json({ message: 'User logged out successfully' });
  });
};