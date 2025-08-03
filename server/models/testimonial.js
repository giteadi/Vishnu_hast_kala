const { db } = require('../config/db');

/**
 * Testimonial model with database operations
 */
class Testimonial {
  /**
   * Create table if it doesn't exist
   */
  static async initTable() {
    const createTestimonialTableQuery = `
      CREATE TABLE IF NOT EXISTS testimonials (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        role VARCHAR(100),
        content TEXT NOT NULL,
        rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
        image_url VARCHAR(255),
        status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `;
    
    try {
      await db.query(createTestimonialTableQuery);
      console.log('Testimonials table initialized');
      return true;
    } catch (error) {
      console.error('Error initializing testimonials table:', error.message);
      return false;
    }
  }
  
  /**
   * Create a new testimonial
   */
  static async create(testimonialData) {
    try {
      const { name, role, content, rating, image_url, status } = testimonialData;
      
      const [result] = await db.query(
        'INSERT INTO testimonials (name, role, content, rating, image_url, status) VALUES (?, ?, ?, ?, ?, ?)',
        [name, role, content, rating, image_url, status || 'pending']
      );
      
      if (result.insertId) {
        return await this.findById(result.insertId);
      }
      
      return null;
    } catch (error) {
      console.error('Error creating testimonial:', error.message);
      throw error;
    }
  }
  
  /**
   * Find testimonial by ID
   */
  static async findById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM testimonials WHERE id = ?', [id]);
      return rows.length ? rows[0] : null;
    } catch (error) {
      console.error('Error finding testimonial by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Update testimonial
   */
  static async update(id, testimonialData) {
    try {
      const { name, role, content, rating, image_url, status } = testimonialData;
      
      // Build update query
      let updateQuery = 'UPDATE testimonials SET ';
      const updateFields = [];
      const updateValues = [];
      
      if (name !== undefined) {
        updateFields.push('name = ?');
        updateValues.push(name);
      }
      
      if (role !== undefined) {
        updateFields.push('role = ?');
        updateValues.push(role);
      }
      
      if (content !== undefined) {
        updateFields.push('content = ?');
        updateValues.push(content);
      }
      
      if (rating !== undefined) {
        updateFields.push('rating = ?');
        updateValues.push(rating);
      }
      
      if (image_url !== undefined) {
        updateFields.push('image_url = ?');
        updateValues.push(image_url);
      }
      
      if (status !== undefined) {
        updateFields.push('status = ?');
        updateValues.push(status);
      }
      
      if (updateFields.length === 0) {
        return await this.findById(id);
      }
      
      updateQuery += updateFields.join(', ') + ' WHERE id = ?';
      updateValues.push(id);
      
      const [result] = await db.query(updateQuery, updateValues);
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating testimonial:', error.message);
      throw error;
    }
  }
  
  /**
   * Update testimonial status
   */
  static async updateStatus(id, status) {
    try {
      const [result] = await db.query(
        'UPDATE testimonials SET status = ? WHERE id = ?',
        [status, id]
      );
      
      if (result.affectedRows) {
        return await this.findById(id);
      }
      
      return null;
    } catch (error) {
      console.error('Error updating testimonial status:', error.message);
      throw error;
    }
  }
  
  /**
   * Delete testimonial
   */
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM testimonials WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting testimonial:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all testimonials with filtering and pagination
   */
  static async findAll(filters = {}, limit = 10, offset = 0) {
    try {
      const { status, rating, search } = filters;
      
      // Build WHERE clause
      let whereConditions = [];
      let queryParams = [];
      
      if (status) {
        whereConditions.push('status = ?');
        queryParams.push(status);
      }
      
      if (rating) {
        whereConditions.push('rating = ?');
        queryParams.push(rating);
      }
      
      if (search) {
        whereConditions.push('(name LIKE ? OR content LIKE ?)');
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm);
      }
      
      // Construct WHERE clause if conditions exist
      const whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}` 
        : '';
      
      // Add pagination params
      queryParams.push(limit, offset);
      
      // Execute query
      const [rows] = await db.query(
        `SELECT * FROM testimonials ${whereClause} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
        queryParams
      );
      
      // Count total matching records
      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const [countResult] = await db.query(
        `SELECT COUNT(*) as total FROM testimonials ${whereClause}`,
        countParams
      );
      
      const total = countResult[0].total;
      
      return {
        testimonials: rows,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding testimonials:', error.message);
      throw error;
    }
  }
  
  /**
   * Get approved testimonials
   */
  static async getApproved(limit = 6) {
    try {
      const [rows] = await db.query(
        'SELECT * FROM testimonials WHERE status = "approved" ORDER BY created_at DESC LIMIT ?',
        [limit]
      );
      
      return rows;
    } catch (error) {
      console.error('Error getting approved testimonials:', error.message);
      return [];
    }
  }
  
  /**
   * Get testimonial statistics
   */
  static async getStats() {
    try {
      // Total testimonials
      const [totalTestimonials] = await db.query('SELECT COUNT(*) as count FROM testimonials');
      
      // Testimonials by status
      const [testimonialsByStatus] = await db.query(
        'SELECT status, COUNT(*) as count FROM testimonials GROUP BY status'
      );
      
      // Average rating
      const [avgRating] = await db.query(
        'SELECT AVG(rating) as average FROM testimonials WHERE status = "approved"'
      );
      
      // Rating distribution
      const [ratingDistribution] = await db.query(
        'SELECT rating, COUNT(*) as count FROM testimonials GROUP BY rating ORDER BY rating'
      );
      
      return {
        totalTestimonials: totalTestimonials[0].count,
        testimonialsByStatus,
        averageRating: avgRating[0].average || 0,
        ratingDistribution
      };
    } catch (error) {
      console.error('Error getting testimonial statistics:', error.message);
      throw error;
    }
  }
}

module.exports = Testimonial;