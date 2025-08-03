const { db } = require('../config/db');

/**
 * Product model with database operations
 */
class Product {
  /**
   * Create table if it doesn't exist
   */
  static async initTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS products (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        category VARCHAR(100) NOT NULL,
        stock INT DEFAULT 0,
        images JSON,
        featured BOOLEAN DEFAULT FALSE,
        status ENUM('active', 'out_of_stock', 'discontinued') DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await db.query(createTableQuery);
      console.log('Products table initialized');
      return true;
    } catch (error) {
      console.error('Error initializing products table:', error.message);
      return false;
    }
  }
  
  /**
   * Find product by ID
   */
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM products WHERE id = ?', [id]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding product by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Create a new product
   */
  static async create(productData) {
    try {
      const { name, description, price, category, stock, images, featured = false, status = 'active' } = productData;
      
      // Convert images array to JSON string
      const imagesJson = JSON.stringify(images || []);
      
      const [result] = await db.query(
        'INSERT INTO products (name, description, price, category, stock, images, featured, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
        [name, description, price, category, stock, imagesJson, featured, status]
      );
      
      if (result.insertId) {
        return await this.findById(result.insertId);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating product:', error.message);
      throw error;
    }
  }
  
  /**
   * Update product
   */
  static async update(id, productData) {
    try {
      const { name, description, price, category, stock, images, featured, status } = productData;
      
      // Convert images array to JSON string if provided
      const imagesJson = images ? JSON.stringify(images) : undefined;
      
      // Build dynamic update query
      let updateFields = [];
      let queryParams = [];
      
      if (name !== undefined) {
        updateFields.push('name = ?');
        queryParams.push(name);
      }
      
      if (description !== undefined) {
        updateFields.push('description = ?');
        queryParams.push(description);
      }
      
      if (price !== undefined) {
        updateFields.push('price = ?');
        queryParams.push(price);
      }
      
      if (category !== undefined) {
        updateFields.push('category = ?');
        queryParams.push(category);
      }
      
      if (stock !== undefined) {
        updateFields.push('stock = ?');
        queryParams.push(stock);
      }
      
      if (imagesJson !== undefined) {
        updateFields.push('images = ?');
        queryParams.push(imagesJson);
      }
      
      if (featured !== undefined) {
        updateFields.push('featured = ?');
        queryParams.push(featured);
      }
      
      if (status !== undefined) {
        updateFields.push('status = ?');
        queryParams.push(status);
      }
      
      if (updateFields.length === 0) {
        return await this.findById(id); // Nothing to update
      }
      
      // Add ID to params
      queryParams.push(id);
      
      const [result] = await db.query(
        `UPDATE products SET ${updateFields.join(', ')} WHERE id = ?`,
        queryParams
      );
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating product:', error.message);
      throw error;
    }
  }
  
  /**
   * Delete product
   */
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM products WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting product:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all products with filtering and pagination
   */
  static async findAll(filters = {}, limit = 10, offset = 0) {
    try {
      const { category, status, featured, search, minPrice, maxPrice } = filters;
      
      // Build WHERE clause
      let whereConditions = [];
      let queryParams = [];
      
      if (category) {
        whereConditions.push('category = ?');
        queryParams.push(category);
      }
      
      if (status) {
        whereConditions.push('status = ?');
        queryParams.push(status);
      }
      
      if (featured !== undefined) {
        whereConditions.push('featured = ?');
        queryParams.push(featured);
      }
      
      if (search) {
        whereConditions.push('(name LIKE ? OR description LIKE ?)');
        queryParams.push(`%${search}%`, `%${search}%`);
      }
      
      if (minPrice !== undefined) {
        whereConditions.push('price >= ?');
        queryParams.push(minPrice);
      }
      
      if (maxPrice !== undefined) {
        whereConditions.push('price <= ?');
        queryParams.push(maxPrice);
      }
      
      // Construct WHERE clause if conditions exist
      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}` 
        : '';
      
      // Add pagination params
      queryParams.push(limit, offset);
      
      // Execute query
      const [rows] = await db.query(
        `SELECT * FROM products ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        queryParams
      );
      
      // Count total matching records
      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const [countResult] = await db.query(
        `SELECT COUNT(*) as total FROM products ${whereClause}`,
        countParams
      );
      
      const total = countResult[0].total;
      
      return {
        products: rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding products:', error.message);
      throw error;
    }
  }
  
  /**
   * Get featured products
   */
  static async getFeatured(limit = 6) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM products WHERE featured = TRUE AND status = "active" ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      
      return rows;
    } catch (error) {
      console.error('Error getting featured products:', error.message);
      throw error;
    }
  }
  
  /**
   * Update product stock
   */
  static async updateStock(id, quantity) {
    try {
      const [result] = await db.query(
        'UPDATE products SET stock = stock + ? WHERE id = ?',
        [quantity, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating product stock:', error.message);
      throw error;
    }
  }
}

module.exports = Product;