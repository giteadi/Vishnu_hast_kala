const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

/**
 * User controller with request handlers
 */
const userController = {
  /**
   * Register a new user
   * @route POST /api/users/register
   * @access Public
   */
  register: async (req, res) => {
    try {
      const { name, email, password, phone, address } = req.body;
      
      // Check if user already exists
      const existingUser = await User.findByEmail(email);
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists with this email' });
      }
      
      // Create new user
      const user = await User.create({
        name,
        email,
        password,
        phone,
        address,
        role: 'customer' // Default role
      });
      
      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.status(201).json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Registration error:', error.message);
      res.status(500).json({ message: 'Server error during registration' });
    }
  },
  
  /**
   * Login user
   * @route POST /api/users/login
   * @access Public
   */
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      
      // Find user by email
      const user = await User.findByEmail(email);
      if (!user) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Verify password
      const isPasswordValid = await User.verifyPassword(user.id, password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }
      
      // Generate token
      const token = jwt.sign(
        { id: user.id, email: user.email, role: user.role },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
      );
      
      // Remove password from response
      const { password: _, ...userWithoutPassword } = user;
      
      res.json({
        ...userWithoutPassword,
        token
      });
    } catch (error) {
      console.error('Login error:', error.message);
      res.status(500).json({ message: 'Server error during login' });
    }
  },
  
  /**
   * Get user profile
   * @route GET /api/users/profile
   * @access Private
   */
  getProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get profile error:', error.message);
      res.status(500).json({ message: 'Server error while fetching profile' });
    }
  },
  
  /**
   * Update user profile
   * @route PUT /api/users/profile
   * @access Private
   */
  updateProfile: async (req, res) => {
    try {
      const userId = req.user.id;
      const { name, phone, address } = req.body;
      
      // Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Update user
      const updatedUser = await User.update(userId, {
        name,
        phone,
        address
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Update profile error:', error.message);
      res.status(500).json({ message: 'Server error while updating profile' });
    }
  },
  
  /**
   * Change password
   * @route PUT /api/users/password
   * @access Private
   */
  changePassword: async (req, res) => {
    try {
      const userId = req.user.id;
      const { currentPassword, newPassword } = req.body;
      
      // Verify current password
      const isPasswordValid = await User.verifyPassword(userId, currentPassword);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Current password is incorrect' });
      }
      
      // Update password
      await User.updatePassword(userId, newPassword);
      
      res.json({ message: 'Password updated successfully' });
    } catch (error) {
      console.error('Change password error:', error.message);
      res.status(500).json({ message: 'Server error while changing password' });
    }
  },
  
  /**
   * Get all users (admin only)
   * @route GET /api/users
   * @access Admin
   */
  getAllUsers: async (req, res) => {
    try {
      const users = await User.findAll();
      
      // Remove passwords from response
      const usersWithoutPasswords = users.map(user => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
      
      res.json(usersWithoutPasswords);
    } catch (error) {
      console.error('Get all users error:', error.message);
      res.status(500).json({ message: 'Server error while fetching users' });
    }
  },
  
  /**
   * Get user by ID (admin only)
   * @route GET /api/users/:id
   * @access Admin
   */
  getUserById: async (req, res) => {
    try {
      const userId = req.params.id;
      
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Remove password from response
      const { password, ...userWithoutPassword } = user;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Get user by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching user' });
    }
  },
  
  /**
   * Update user (admin only)
   * @route PUT /api/users/:id
   * @access Admin
   */
  updateUser: async (req, res) => {
    try {
      const userId = req.params.id;
      const { name, email, phone, address, role } = req.body;
      
      // Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // If email is being changed, check if it's already in use
      if (email && email !== existingUser.email) {
        const userWithEmail = await User.findByEmail(email);
        if (userWithEmail) {
          return res.status(400).json({ message: 'Email is already in use' });
        }
      }
      
      // Update user
      const updatedUser = await User.update(userId, {
        name,
        email,
        phone,
        address,
        role
      });
      
      // Remove password from response
      const { password, ...userWithoutPassword } = updatedUser;
      
      res.json(userWithoutPassword);
    } catch (error) {
      console.error('Update user error:', error.message);
      res.status(500).json({ message: 'Server error while updating user' });
    }
  },
  
  /**
   * Delete user (admin only)
   * @route DELETE /api/users/:id
   * @access Admin
   */
  deleteUser: async (req, res) => {
    try {
      const userId = req.params.id;
      
      // Check if user exists
      const existingUser = await User.findById(userId);
      if (!existingUser) {
        return res.status(404).json({ message: 'User not found' });
      }
      
      // Prevent deleting the last admin
      if (existingUser.role === 'admin') {
        const [adminUsers] = await pool.query(
          'SELECT COUNT(*) as count FROM users WHERE role = "admin"'
        );
        
        if (adminUsers[0].count <= 1) {
          return res.status(400).json({ message: 'Cannot delete the last admin user' });
        }
      }
      
      // Delete user
      await User.delete(userId);
      
      res.json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error('Delete user error:', error.message);
      res.status(500).json({ message: 'Server error while deleting user' });
    }
  }
};

module.exports = userController;