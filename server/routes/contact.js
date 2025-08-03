const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contact');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/contacts
 * @desc    Submit a new contact message
 * @access  Public
 */
router.post('/', contactController.submitContact);

/**
 * @route   GET /api/contacts
 * @desc    Get all contact messages
 * @access  Admin
 */
router.get('/', authenticate, authorize('admin'), contactController.getContacts);

/**
 * @route   GET /api/contacts/stats
 * @desc    Get contact statistics
 * @access  Admin
 */
router.get('/stats', authenticate, authorize('admin'), contactController.getContactStats);

/**
 * @route   GET /api/contacts/:id
 * @desc    Get contact by ID
 * @access  Admin
 */
router.get('/:id', authenticate, authorize('admin'), contactController.getContactById);

/**
 * @route   PATCH /api/contacts/:id/status
 * @desc    Update contact status
 * @access  Admin
 */
router.patch('/:id/status', authenticate, authorize('admin'), contactController.updateContactStatus);

/**
 * @route   DELETE /api/contacts/:id
 * @desc    Delete contact
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('admin'), contactController.deleteContact);

module.exports = router;