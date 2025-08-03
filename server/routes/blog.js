const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blog');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/blogs
 * @desc    Create a new blog post
 * @access  Admin
 */
router.post('/', authenticate, authorize('admin'), blogController.createBlog);

/**
 * @route   GET /api/blogs
 * @desc    Get all blog posts with filtering and pagination
 * @access  Public
 */
router.get('/', blogController.getBlogs);

/**
 * @route   GET /api/blogs/featured
 * @desc    Get featured blog posts
 * @access  Public
 */
router.get('/featured', blogController.getFeaturedBlogs);

/**
 * @route   GET /api/blogs/stats
 * @desc    Get blog statistics
 * @access  Admin
 */
router.get('/stats', authenticate, authorize('admin'), blogController.getBlogStats);

/**
 * @route   POST /api/blogs/categories
 * @desc    Create a new blog category
 * @access  Admin
 */
router.post('/categories', authenticate, authorize('admin'), blogController.createCategory);

/**
 * @route   GET /api/blogs/categories
 * @desc    Get all blog categories
 * @access  Public
 */
router.get('/categories', blogController.getCategories);

/**
 * @route   DELETE /api/blogs/categories/:id
 * @desc    Delete blog category
 * @access  Admin
 */
router.delete('/categories/:id', authenticate, authorize('admin'), blogController.deleteCategory);

/**
 * @route   GET /api/blogs/slug/:slug
 * @desc    Get blog post by slug
 * @access  Mixed
 */
router.get('/slug/:slug', blogController.getBlogBySlug);

/**
 * @route   GET /api/blogs/:id
 * @desc    Get blog post by ID
 * @access  Mixed
 */
router.get('/:id', blogController.getBlogById);

/**
 * @route   PUT /api/blogs/:id
 * @desc    Update blog post
 * @access  Admin
 */
router.put('/:id', authenticate, authorize('admin'), blogController.updateBlog);

/**
 * @route   DELETE /api/blogs/:id
 * @desc    Delete blog post
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('admin'), blogController.deleteBlog);

module.exports = router;