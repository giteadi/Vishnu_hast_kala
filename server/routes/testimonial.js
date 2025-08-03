const express = require('express');
const router = express.Router();
const testimonialController = require('../controllers/testimonial');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/testimonials
 * @desc    Create a new testimonial
 * @access  Private
 */
router.post('/', authenticate, testimonialController.createTestimonial);

/**
 * @route   GET /api/testimonials
 * @desc    Get all testimonials with filtering and pagination
 * @access  Admin
 */
router.get('/', authenticate, authorize('admin'), testimonialController.getTestimonials);

/**
 * @route   GET /api/testimonials/approved
 * @desc    Get approved testimonials for public display
 * @access  Public
 */
router.get('/approved', testimonialController.getApprovedTestimonials);

/**
 * @route   GET /api/testimonials/stats
 * @desc    Get testimonial statistics
 * @access  Admin
 */
router.get('/stats', authenticate, authorize('admin'), testimonialController.getTestimonialStats);

/**
 * @route   GET /api/testimonials/:id
 * @desc    Get testimonial by ID
 * @access  Mixed
 */
router.get('/:id', testimonialController.getTestimonialById);

/**
 * @route   PUT /api/testimonials/:id
 * @desc    Update testimonial
 * @access  Mixed
 */
router.put('/:id', authenticate, testimonialController.updateTestimonial);

/**
 * @route   PATCH /api/testimonials/:id/status
 * @desc    Update testimonial status
 * @access  Admin
 */
router.patch('/:id/status', authenticate, authorize('admin'), testimonialController.updateTestimonialStatus);

/**
 * @route   DELETE /api/testimonials/:id
 * @desc    Delete testimonial
 * @access  Mixed
 */
router.delete('/:id', authenticate, testimonialController.deleteTestimonial);

module.exports = router;