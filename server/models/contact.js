const {db } = require('../config/db');

/**
 * Contact model with database operations
 */
class Contact {
  /**
   * Create table if it doesn't exist
   */
  static async initTable() {
    const createContactTableQuery = `
      CREATE TABLE IF NOT EXISTS contacts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) NOT NULL,
        phone VARCHAR(20),
        message TEXT NOT NULL,
        status ENUM('new', 'read', 'replied') DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      awaitdb.query(createContactTableQuery);
      console.log('Contacts table initialized');
      return true;
    } catch (error) {
      console.error('Error initializing contacts table:', error.message);
      return false;
    }
  }
  
  /**
   * Create a new contact message
   */
  static async create(contactData) {
    try {
      const { name, email, phone, message } = contactData;
      
      const [result] = awaitdb.query(
        'INSERT INTO contacts (name, email, phone, message) VALUES (?, ?, ?, ?)',
        [name, email, phone, message]
      );
      
      if (result.insertId) {
        return await this.findById(result.insertId);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating contact message:', error.message);
      throw error;
    }
  }
  
  /**
   * Find contact by ID
   */
  static async findById(id) {
    try {
      const [rows] = awaitdb.query('SELECT * FROM contacts WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding contact by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Update contact status
   */
  static async updateStatus(id, status) {
    try {
      const [result] = awaitdb.query(
        'UPDATE contacts SET status = ? WHERE id = ?',
        [status, id]
      );
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating contact status:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all contacts with filtering and pagination
   */
  static async findAll(filters = {}, limit = 10, offset = 0) {
    try {
      const { status, search } = filters;
      
      // Build WHERE clause
      let whereConditions = [];
      let queryParams = [];
      
      if (status) {
        whereConditions.push('status = ?');
        queryParams.push(status);
      }
      
      if (search) {
        whereConditions.push('(name LIKE ? OR email LIKE ? OR message LIKE ?)');
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm, searchTerm);
      }
      
      // Construct WHERE clause if conditions exist
      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}` 
        : '';
      
      // Add pagination params
      queryParams.push(limit, offset);
      
      // Execute query
      const [rows] = awaitdb.query(
        `SELECT * FROM contacts ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        queryParams
      );
      
      // Count total matching records
      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const [countResult] = awaitdb.query(
        `SELECT COUNT(*) as total FROM contacts ${whereClause}`,
        countParams
      );
      
      const total = countResult[0].total;
      
      return {
        contacts: rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding contacts:', error.message);
      throw error;
    }
  }
  
  /**
   * Delete contact
   */
  static async delete(id) {
    try {
      const [result] = awaitdb.query('DELETE FROM contacts WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting contact:', error.message);
      throw error;
    }
  }
  
  /**
   * Get contact statistics
   */
  static async getStats() {
    try {
      // Total contacts
      const [totalContacts] = awaitdb.query('SELECT COUNT(*) as count FROM contacts');
      
      // Contacts by status
      const [contactsByStatus] = awaitdb.query(
        'SELECT status, COUNT(*) as count FROM contacts GROUP BY status'
      );
      
      // Recent contacts
      const [recentContacts] = awaitdb.query(
        'SELECT * FROM contacts ORDER BY created_at DESC LIMIT 5'
      );
      
      return {
        totalContacts: totalContacts[0].count,
        contactsByStatus,
        recentContacts
      };
    } catch (error) {
      console.error('Error getting contact statistics:', error.message);
      throw error;
    }
  }
}

module.exports = Contact;