const Testimonial = require('../models/testimonial');
const cloudinary = require('../config/cloudinary');

/**
 * Testimonial controller with request handlers
 */
const testimonialController = {
  /**
   * Create a new testimonial
   * @route POST /api/testimonials
   * @access Public/Admin
   */
  createTestimonial: async (req, res) => {
    try {
      const { name, role, content, rating, image_url } = req.body;
      
      // Validate required fields
      if (!name || !content || !rating) {
        return res.status(400).json({ message: 'Name, content, and rating are required' });
      }
      
      // Validate rating
      if (rating < 1 || rating > 5) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
      
      // Set status based on user role
      const status = req.user && req.user.role === 'admin' ? 'approved' : 'pending';
      
      // Create testimonial
      const testimonial = await Testimonial.create({
        name,
        role,
        content,
        rating,
        image_url,
        status
      });
      
      res.status(201).json({
        message: req.user && req.user.role === 'admin' 
          ? 'Testimonial created successfully' 
          : 'Thank you for your testimonial! It will be reviewed shortly.',
        testimonial
      });
    } catch (error) {
      console.error('Create testimonial error:', error.message);
      res.status(500).json({ message: 'Server error while creating testimonial' });
    }
  },
  
  /**
   * Get all testimonials with filtering and pagination (admin)
   * @route GET /api/testimonials
   * @access Admin
   */
  getTestimonials: async (req, res) => {
    try {
      const { 
        status, 
        rating, 
        search,
        limit = 10,
        page = 1
      } = req.query;
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Build filters
      const filters = {};
      
      if (status) filters.status = status;
      if (rating) filters.rating = parseInt(rating);
      if (search) filters.search = search;
      
      // Get testimonials
      const result = await Testimonial.findAll(
        filters,
        parseInt(limit),
        offset
      );
      
      res.json({
        testimonials: result.testimonials,
        pagination: {
          ...result.pagination,
          page: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Get testimonials error:', error.message);
      res.status(500).json({ message: 'Server error while fetching testimonials' });
    }
  },
  
  /**
   * Get approved testimonials for public display
   * @route GET /api/testimonials/approved
   * @access Public
   */
  getApprovedTestimonials: async (req, res) => {
    try {
      const limit = req.query.limit || 6;
      
      const testimonials = await Testimonial.getApproved(parseInt(limit));
      
      res.json(testimonials);
    } catch (error) {
      console.error('Get approved testimonials error:', error.message);
      res.status(500).json({ message: 'Server error while fetching approved testimonials' });
    }
  },
  
  /**
   * Get testimonial by ID
   * @route GET /api/testimonials/:id
   * @access Admin
   */
  getTestimonialById: async (req, res) => {
    try {
      const testimonialId = req.params.id;
      
      const testimonial = await Testimonial.findById(testimonialId);
      if (!testimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      res.json(testimonial);
    } catch (error) {
      console.error('Get testimonial by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching testimonial' });
    }
  },
  
  /**
   * Update testimonial
   * @route PUT /api/testimonials/:id
   * @access Admin
   */
  updateTestimonial: async (req, res) => {
    try {
      const testimonialId = req.params.id;
      const { name, role, content, rating, image_url } = req.body;
      
      // Check if testimonial exists
      const existingTestimonial = await Testimonial.findById(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      // Validate rating if provided
      if (rating !== undefined && (rating < 1 || rating > 5)) {
        return res.status(400).json({ message: 'Rating must be between 1 and 5' });
      }
      
      // Update testimonial
      const updatedTestimonial = await Testimonial.update(testimonialId, {
        name,
        role,
        content,
        rating,
        image_url
      });
      
      res.json(updatedTestimonial);
    } catch (error) {
      console.error('Update testimonial error:', error.message);
      res.status(500).json({ message: 'Server error while updating testimonial' });
    }
  },
  
  /**
   * Update testimonial status
   * @route PATCH /api/testimonials/:id/status
   * @access Admin
   */
  updateTestimonialStatus: async (req, res) => {
    try {
      const testimonialId = req.params.id;
      const { status } = req.body;
      
      if (!status || !['pending', 'approved', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Valid status is required (pending, approved, or rejected)' });
      }
      
      // Check if testimonial exists
      const existingTestimonial = await Testimonial.findById(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      // Update testimonial status
      const updatedTestimonial = await Testimonial.updateStatus(testimonialId, status);
      
      res.json(updatedTestimonial);
    } catch (error) {
      console.error('Update testimonial status error:', error.message);
      res.status(500).json({ message: 'Server error while updating testimonial status' });
    }
  },
  
  /**
   * Delete testimonial
   * @route DELETE /api/testimonials/:id
   * @access Admin
   */
  deleteTestimonial: async (req, res) => {
    try {
      const testimonialId = req.params.id;
      
      // Check if testimonial exists
      const existingTestimonial = await Testimonial.findById(testimonialId);
      if (!existingTestimonial) {
        return res.status(404).json({ message: 'Testimonial not found' });
      }
      
      // Delete testimonial image from Cloudinary if exists
      if (existingTestimonial.image_url && existingTestimonial.image_url.includes('cloudinary')) {
        try {
          // Extract public_id from Cloudinary URL
          const publicId = existingTestimonial.image_url.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with testimonial deletion even if image deletion fails
        }
      }
      
      // Delete testimonial
      await Testimonial.delete(testimonialId);
      
      res.json({ message: 'Testimonial deleted successfully' });
    } catch (error) {
      console.error('Delete testimonial error:', error.message);
      res.status(500).json({ message: 'Server error while deleting testimonial' });
    }
  },
  
  /**
   * Get testimonial statistics (admin only)
   * @route GET /api/testimonials/stats
   * @access Admin
   */
  getTestimonialStats: async (req, res) => {
    try {
      const stats = await Testimonial.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Get testimonial stats error:', error.message);
      res.status(500).json({ message: 'Server error while fetching testimonial statistics' });
    }
  }
};

module.exports = testimonialController;