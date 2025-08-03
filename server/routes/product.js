const express = require('express');
const router = express.Router();
const productController = require('../controllers/product');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/products
 * @desc    Create a new product
 * @access  Admin
 */
router.post('/', authenticate, authorize('admin'), productController.createProduct);

/**
 * @route   GET /api/products
 * @desc    Get all products with filtering and pagination
 * @access  Public
 */
router.get('/', productController.getProducts);

/**
 * @route   GET /api/products/featured
 * @desc    Get featured products
 * @access  Public
 */
router.get('/featured', productController.getFeaturedProducts);

/**
 * @route   GET /api/products/categories
 * @desc    Get product categories
 * @access  Public
 */
router.get('/categories', productController.getCategories);

/**
 * @route   GET /api/products/:id
 * @desc    Get product by ID
 * @access  Public
 */
router.get('/:id', productController.getProductById);

/**
 * @route   PUT /api/products/:id
 * @desc    Update product
 * @access  Admin
 */
router.put('/:id', authenticate, authorize('admin'), productController.updateProduct);

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete product
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('admin'), productController.deleteProduct);

/**
 * @route   PATCH /api/products/:id/stock
 * @desc    Update product stock
 * @access  Admin
 */
router.patch('/:id/stock', authenticate, authorize('admin'), productController.updateStock);

module.exports = router;