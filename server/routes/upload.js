const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/upload');
const { authenticate, authorize } = require('../middleware/auth');
const upload = require('../middleware/upload');

/**
 * @route   POST /api/upload/single
 * @desc    Upload a single file to Cloudinary
 * @access  Private
 */
router.post('/single', authenticate, upload.single('file'), uploadController.uploadSingleFile);

/**
 * @route   POST /api/upload/multiple
 * @desc    Upload multiple files to Cloudinary
 * @access  Private
 */
router.post('/multiple', authenticate, upload.array('files', 10), uploadController.uploadMultipleFiles);

/**
 * @route   DELETE /api/upload/:public_id
 * @desc    Delete a file from Cloudinary
 * @access  Private
 */
router.delete('/:public_id', authenticate, uploadController.deleteFile);

module.exports = router;