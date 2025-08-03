const express = require('express');
const router = express.Router();
const orderController = require('../controllers/order');
const { authenticate, authorize } = require('../middleware/auth');

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', authenticate, orderController.createOrder);

/**
 * @route   GET /api/orders
 * @desc    Get all orders (admin) or user orders (customer)
 * @access  Private
 */
router.get('/', authenticate, orderController.getOrders);

/**
 * @route   GET /api/orders/stats
 * @desc    Get order statistics
 * @access  Admin
 */
router.get('/stats', authenticate, authorize('admin'), orderController.getOrderStats);

/**
 * @route   GET /api/orders/:id
 * @desc    Get order by ID
 * @access  Private
 */
router.get('/:id', authenticate, orderController.getOrderById);

/**
 * @route   PATCH /api/orders/:id/status
 * @desc    Update order status
 * @access  Admin
 */
router.patch('/:id/status', authenticate, authorize('admin'), orderController.updateOrderStatus);

/**
 * @route   DELETE /api/orders/:id
 * @desc    Delete order
 * @access  Admin
 */
router.delete('/:id', authenticate, authorize('admin'), orderController.deleteOrder);

module.exports = router;