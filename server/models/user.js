const { db } = require('../config/db');
const bcrypt = require('bcrypt');

/**
 * User model with database operations
 */
class User {
  /**
   * Create tables if they don't exist
   */
  static async initTable() {
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'customer') DEFAULT 'customer',
        profile_image VARCHAR(255),
        phone VARCHAR(20),
        address TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await db.query(createTableQuery);
      console.log('Users table initialized');
      
      // Check if admin user exists, if not create one
      const [adminExists] = await db.query('SELECT * FROM users WHERE role = "admin" LIMIT 1');
      
      if (adminExists.length === 0) {
        // Create default admin user
        const hashedPassword = await bcrypt.hash('admin123', 10);
        await db.query(
          'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
          ['Admin User', 'admin@vishnuhastkala.com', hashedPassword, 'admin']
        );
        console.log('Default admin user created');
      }
      
      return true;
    } catch (error) {
      console.error('Error initializing users table:', error.message);
      return false;
    }
  }
  
  /**
   * Find user by ID
   */
  static async findById(id) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, profile_image, phone, address, created_at, updated_at FROM users WHERE id = ?',
        [id]
      );
      
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Find user by email
   */
  static async findByEmail(email) {
    try {
      const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
      return rows[0] || null;
    } catch (error) {
      console.error('Error finding user by email:', error.message);
      return null;
    }
  }
  
  /**
   * Create a new user
   */
  static async create(userData) {
    try {
      const { name, email, password, role = 'customer', phone, address } = userData;
      
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      const [result] = await db.query(
        'INSERT INTO users (name, email, password, role, phone, address) VALUES (?, ?, ?, ?, ?, ?)',
        [name, email, hashedPassword, role, phone, address]
      );
      
      if (result.insertId) {
        return await this.findById(result.insertId);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating user:', error.message);
      throw error;
    }
  }
  
  /**
   * Update user
   */
  static async update(id, userData) {
    try {
      const { name, email, phone, address, profile_image } = userData;
      
      const [result] = await db.query(
        'UPDATE users SET name = ?, email = ?, phone = ?, address = ?, profile_image = ? WHERE id = ?',
        [name, email, phone, address, profile_image, id]
      );
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  }
  
  /**
   * Update password
   */
  static async updatePassword(id, newPassword) {
    try {
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      const [result] = await db.query(
        'UPDATE users SET password = ? WHERE id = ?',
        [hashedPassword, id]
      );
      
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error updating password:', error.message);
      throw error;
    }
  }
  
  /**
   * Delete user
   */
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM users WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting user:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all users
   */
  static async findAll(limit = 10, offset = 0) {
    try {
      const [rows] = await db.query(
        'SELECT id, name, email, role, profile_image, phone, created_at FROM users LIMIT ? OFFSET ?',
        [limit, offset]
      );
      
      const [countResult] = await db.query('SELECT COUNT(*) as total FROM users');
      const total = countResult[0].total;
      
      return {
        users: rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding all users:', error.message);
      throw error;
    }
  }
  
  /**
   * Verify password
   */
  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User;