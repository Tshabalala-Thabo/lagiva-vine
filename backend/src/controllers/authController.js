import User from '../models/User.js';
import { generateToken } from '../utils/jwt.js'; // Import the generateToken function

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret'; // Use a secure secret

// Register a new user
export const registerUser = async (req, res) => {
  const { email, password, firstName, lastName, phone } = req.body.formData;
  
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email',
      });
    }

    const newUser = new User({
      email,
      password,
      firstName,
      lastName,
      phone,
      role: 'user',
      isDisabled: false
    });

    await newUser.save();
    
    res.status(201).json({ 
      message: 'User registered successfully',
      user: {
        id: newUser._id,
        email: newUser.email,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        phone: newUser.phone,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(400).json({ 
      message: 'Error registering user', 
      error: error.message,
    });
  }
};

// Login user
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: 'Invalid email or password',
        requestBody: req.body // Return the request body
      });
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ 
        message: 'Invalid email or password',
        requestBody: req.body // Return the request body
      });
    }

    const token = generateToken(user);
    res.status(200).json({ 
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
        firstName: user.firstName,
        lastName: user.lastName,
        phone: user.phone
      }
    });
  } catch (error) {
    res.status(500).json({ 
      message: 'Error logging in', 
      error: error.message,
      requestBody: req.body // Return the request body
    });
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