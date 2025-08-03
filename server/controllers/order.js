const Order = require('../models/order');

/**
 * Order controller with request handlers
 */
const orderController = {
  /**
   * Create a new order
   * @route POST /api/orders
   * @access Private
   */
  createOrder: async (req, res) => {
    try {
      const { total_amount, shipping_address, phone, email, items, payment_method, notes } = req.body;
      const user_id = req.user.id;
      
      // Validate required fields
      if (!total_amount || !shipping_address || !phone || !email || !items || !items.length) {
        return res.status(400).json({ message: 'Missing required fields' });
      }
      
      // Create order
      const order = await Order.create({
        user_id,
        total_amount,
        shipping_address,
        phone,
        email,
        items,
        payment_method,
        notes
      });
      
      res.status(201).json(order);
    } catch (error) {
      console.error('Create order error:', error.message);
      res.status(500).json({ message: 'Server error while creating order' });
    }
  },
  
  /**
   * Get all orders (admin) or user orders (customer)
   * @route GET /api/orders
   * @access Private
   */
  getOrders: async (req, res) => {
    try {
      const { 
        status, 
        payment_status, 
        start_date, 
        end_date,
        limit = 10,
        page = 1
      } = req.query;
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Build filters
      const filters = {};
      
      // If user is not admin, only show their orders
      if (req.user.role !== 'admin') {
        filters.user_id = req.user.id;
      }
      
      if (status) filters.status = status;
      if (payment_status) filters.payment_status = payment_status;
      if (start_date) filters.start_date = start_date;
      if (end_date) filters.end_date = end_date;
      
      // Get orders
      const result = await Order.findAll(
        filters,
        parseInt(limit),
        offset
      );
      
      res.json({
        orders: result.orders,
        pagination: {
          ...result.pagination,
          page: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Get orders error:', error.message);
      res.status(500).json({ message: 'Server error while fetching orders' });
    }
  },
  
  /**
   * Get order by ID
   * @route GET /api/orders/:id
   * @access Private
   */
  getOrderById: async (req, res) => {
    try {
      const orderId = req.params.id;
      
      const order = await Order.findById(orderId);
      if (!order) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Check if user is authorized to view this order
      if (req.user.role !== 'admin' && order.user_id !== req.user.id) {
        return res.status(403).json({ message: 'Not authorized to view this order' });
      }
      
      res.json(order);
    } catch (error) {
      console.error('Get order by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching order' });
    }
  },
  
  /**
   * Update order status
   * @route PATCH /api/orders/:id/status
   * @access Admin
   */
  updateOrderStatus: async (req, res) => {
    try {
      const orderId = req.params.id;
      const { status, payment_status } = req.body;
      
      if (!status && !payment_status) {
        return res.status(400).json({ message: 'Status or payment status is required' });
      }
      
      // Check if order exists
      const existingOrder = await Order.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Update order status
      const updatedOrder = await Order.updateStatus(orderId, status, payment_status);
      
      res.json(updatedOrder);
    } catch (error) {
      console.error('Update order status error:', error.message);
      res.status(500).json({ message: 'Server error while updating order status' });
    }
  },
  
  /**
   * Delete order (admin only)
   * @route DELETE /api/orders/:id
   * @access Admin
   */
  deleteOrder: async (req, res) => {
    try {
      const orderId = req.params.id;
      
      // Check if order exists
      const existingOrder = await Order.findById(orderId);
      if (!existingOrder) {
        return res.status(404).json({ message: 'Order not found' });
      }
      
      // Delete order
      await Order.delete(orderId);
      
      res.json({ message: 'Order deleted successfully' });
    } catch (error) {
      console.error('Delete order error:', error.message);
      res.status(500).json({ message: 'Server error while deleting order' });
    }
  },
  
  /**
   * Get order statistics (admin only)
   * @route GET /api/orders/stats
   * @access Admin
   */
  getOrderStats: async (req, res) => {
    try {
      const stats = await Order.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Get order stats error:', error.message);
      res.status(500).json({ message: 'Server error while fetching order statistics' });
    }
  }
};

module.exports = orderController;