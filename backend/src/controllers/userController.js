import User from '../models/User.js';

// Get all users except current user
export const getAllUsers = async (req, res) => {
  try {
    // req.user is set by the auth middleware
    const currentUserId = req.user._id;
    
    const users = await User.find({ 
      _id: { $ne: currentUserId } // $ne means "not equal"
    }).select('-password'); // Exclude password from response
    
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching users', error: error.message });
  }
};

// Update user
export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { email, role, isDisabled } = req.body;

    // Don't allow password updates through this endpoint for security
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { email, role, isDisabled },
      { new: true }
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}; 