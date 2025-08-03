const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/users/register
 * @desc    Register a new user
 * @access  Public
 */
router.post('/register', userController.register);

/**
 * @route   POST /api/users/login
 * @desc    Login user
 * @access  Public
 */
router.post('/login', userController.login);

/**
 * @route   GET /api/users/profile
 * @desc    Get user profile
 * @access  Private
 */
router.get('/profile', authenticate, userController.getProfile);

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', authenticate, userController.updateProfile);

/**
 * @route   PUT /api/users/password
 * @desc    Change password
 * @access  Private
 */
router.put('/password', authenticate, userController.changePassword);

/**
 * @route   GET /api/users
 * @desc    Get all users
 * @access  Admin
 */
router.get('/', authenticate, authorize('admin'), userController.getAllUsers);

/**
 * @route   GET /api/users/:id
 * @desc    Get user by ID
 * @access  Admin
 */
router.get('/:id', authenticate, authorize('admin'), userController.getUserById);

/**
 * @route   PUT /api/users/:id
 * @desc    Update user
 * @access  Admin
 */
router.put('/:id', authenticate, authorize('admin'), userController.updateUser);

/**
 * @route   DELETE /api/users/:id
 * @desc    Delete user
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('admin'), userController.deleteUser);

module.exports = router;