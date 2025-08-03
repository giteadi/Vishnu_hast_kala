const { db } = require('../config/db');

/**
 * Order model with database operations
 */
class Order {
  /**
   * Create tables if they don't exist
   */
  static async initTable() {
    const createOrdersTableQuery = `
      CREATE TABLE IF NOT EXISTS orders (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        total_amount DECIMAL(10, 2) NOT NULL,
        shipping_address TEXT NOT NULL,
        phone VARCHAR(20) NOT NULL,
        email VARCHAR(100) NOT NULL,
        status ENUM('pending', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
        payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
        payment_method VARCHAR(50),
        notes TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    const createOrderItemsTableQuery = `
      CREATE TABLE IF NOT EXISTS order_items (
        id INT AUTO_INCREMENT PRIMARY KEY,
        order_id INT NOT NULL,
        product_id INT NOT NULL,
        quantity INT NOT NULL,
        price DECIMAL(10, 2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
        FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
      )
    `;
    
    try {
      await db.query(createOrdersTableQuery);
      await db.query(createOrderItemsTableQuery);
      console.log('Orders tables initialized');
      return true;
    } catch (error) {
      console.error('Error initializing orders tables:', error.message);
      return false;
    }
  }
  
  /**
   * Create a new order with items
   */
  static async create(orderData) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const { user_id, total_amount, shipping_address, phone, email, items, payment_method, notes } = orderData;
      
      // Create order
      const [orderResult] = await connection.query(
        'INSERT INTO orders (user_id, total_amount, shipping_address, phone, email, payment_method, notes) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [user_id, total_amount, shipping_address, phone, email, payment_method, notes]
      );
      
      const orderId = orderResult.insertId;
      
      // Create order items
      for (const item of items) {
        await connection.query(
          'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)',
          [orderId, item.product_id, item.quantity, item.price]
        );
        
        // Update product stock
        await connection.query(
          'UPDATE products SET stock = stock - ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
      
      await connection.commit();
      
      return await this.findById(orderId);
    } catch (error) {
      await connection.rollback();
      console.error('Error creating order:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
  
  /**
   * Find order by ID with items
   */
  static async findById(id) {
    try {
      // Get order
      const [orders] = await db.query('SELECT * FROM orders WHERE id = ?', [id]);
      
      if (orders.length === 0) {
        return null;
      }
      
      const order = orders[0];
      
      // Get order items
      const [items] = await db.query(
        `SELECT oi.*, p.name, p.category 
         FROM order_items oi 
         JOIN products p ON oi.product_id = p.id 
         WHERE oi.order_id = ?`,
        [id]
      );
      
      order.items = items;
      
      return order;
    } catch (error) {
      console.error('Error finding order by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Update order status
   */
  static async updateStatus(id, status, paymentStatus = null) {
    try {
      let query = 'UPDATE orders SET status = ?';
      let params = [status];
      
      if (paymentStatus) {
        query += ', payment_status = ?';
        params.push(paymentStatus);
      }
      
      query += ' WHERE id = ?';
      params.push(id);
      
      const [result] = await db.query(query, params);
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating order status:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all orders with filtering and pagination
   */
  static async findAll(filters = {}, limit = 10, offset = 0) {
    try {
      const { user_id, status, payment_status, start_date, end_date } = filters;
      
      // Build WHERE clause
      let whereConditions = [];
      let queryParams = [];
      
      if (user_id) {
        whereConditions.push('user_id = ?');
        queryParams.push(user_id);
      }
      
      if (status) {
        whereConditions.push('status = ?');
        queryParams.push(status);
      }
      
      if (payment_status) {
        whereConditions.push('payment_status = ?');
        queryParams.push(payment_status);
      }
      
      if (start_date) {
        whereConditions.push('created_at >= ?');
        queryParams.push(start_date);
      }
      
      if (end_date) {
        whereConditions.push('created_at <= ?');
        queryParams.push(end_date);
      }
      
      // Construct WHERE clause if conditions exist
      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}` 
        : '';
      
      // Add pagination params
      queryParams.push(limit, offset);
      
      // Execute query
      const [rows] = await db.query(
        `SELECT * FROM orders ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        queryParams
      );
      
      // Count total matching records
      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const [countResult] = await db.query(
        `SELECT COUNT(*) as total FROM orders ${whereClause}`,
        countParams
      );
      
      const total = countResult[0].total;
      
      // Get order items for each order
      const orders = [];
      for (const order of rows) {
        const [items] = await db.query(
          `SELECT oi.*, p.name, p.category 
           FROM order_items oi 
           JOIN products p ON oi.product_id = p.id 
           WHERE oi.order_id = ?`,
          [order.id]
        );
        
        order.items = items;
        orders.push(order);
      }
      
      return {
        orders,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding orders:', error.message);
      throw error;
    }
  }
  
  /**
   * Get order statistics
   */
  static async getStats() {
    try {
      // Total orders
      const [totalOrders] = await db.query('SELECT COUNT(*) as count FROM orders');
      
      // Orders by status
      const [ordersByStatus] = await db.query(
        'SELECT status, COUNT(*) as count FROM orders GROUP BY status'
      );
      
      // Recent orders
      const [recentOrders] = await db.query(
        'SELECT * FROM orders ORDER BY created_at DESC LIMIT 5'
      );
      
      // Total revenue
      const [revenue] = await db.query(
        'SELECT SUM(total_amount) as total FROM orders WHERE payment_status = "paid"'
      );
      
      return {
        totalOrders: totalOrders[0].count,
        ordersByStatus,
        recentOrders,
        totalRevenue: revenue[0].total || 0
      };
    } catch (error) {
      console.error('Error getting order statistics:', error.message);
      throw error;
    }
  }
  
  /**
   * Delete order
   */
  static async delete(id) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      // Get order items to restore product stock
      const [items] = await connection.query(
        'SELECT product_id, quantity FROM order_items WHERE order_id = ?',
        [id]
      );
      
      // Restore product stock
      for (const item of items) {
        await connection.query(
          'UPDATE products SET stock = stock + ? WHERE id = ?',
          [item.quantity, item.product_id]
        );
      }
      
      // Delete order (cascade will delete order_items)
      const [result] = await connection.query('DELETE FROM orders WHERE id = ?', [id]);
      
      await connection.commit();
      
      return result.affectedRows > 0;
    } catch (error) {
      await connection.rollback();
      console.error('Error deleting order:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
}

module.exports = Order;