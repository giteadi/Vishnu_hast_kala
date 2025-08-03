const { db } = require('../config/db');

/**
 * Blog model with database operations
 */
class Blog {
  /**
   * Create table if it doesn't exist
   */
  static async initTable() {
    const createBlogTableQuery = `
      CREATE TABLE IF NOT EXISTS blogs (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL UNIQUE,
        content TEXT NOT NULL,
        image_url VARCHAR(255),
        author_id INT NOT NULL,
        status ENUM('draft', 'published') DEFAULT 'draft',
        featured BOOLEAN DEFAULT false,
        views INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;
    
    const createBlogCategoriesTableQuery = `
      CREATE TABLE IF NOT EXISTS blog_categories (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    const createBlogCategoryRelationTableQuery = `
      CREATE TABLE IF NOT EXISTS blog_category_relation (
        blog_id INT NOT NULL,
        category_id INT NOT NULL,
        PRIMARY KEY (blog_id, category_id),
        FOREIGN KEY (blog_id) REFERENCES blogs(id) ON DELETE CASCADE,
        FOREIGN KEY (category_id) REFERENCES blog_categories(id) ON DELETE CASCADE
      )
    `;
    
    try {
      await db.query(createBlogTableQuery);
      await db.query(createBlogCategoriesTableQuery);
      await db.query(createBlogCategoryRelationTableQuery);
      console.log('Blog tables initialized');
      return true;
    } catch (error) {
      console.error('Error initializing blog tables:', error.message);
      return false;
    }
  }
  
  /**
   * Create a new blog post
   */
  static async create(blogData) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const { title, slug, content, image_url, author_id, status, featured, categories } = blogData;
      
      // Create blog post
      const [blogResult] = await connection.query(
        'INSERT INTO blogs (title, slug, content, image_url, author_id, status, featured) VALUES (?, ?, ?, ?, ?, ?, ?)',
        [title, slug, content, image_url, author_id, status || 'draft', featured || false]
      );
      
      const blogId = blogResult.insertId;
      
      // Add categories if provided
      if (categories && categories.length > 0) {
        for (const categoryId of categories) {
          await connection.query(
            'INSERT INTO blog_category_relation (blog_id, category_id) VALUES (?, ?)',
            [blogId, categoryId]
          );
        }
      }
      
      await connection.commit();
      
      return await this.findById(blogId);
    } catch (error) {
      await connection.rollback();
      console.error('Error creating blog post:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
  
  /**
   * Find blog by ID with categories
   */
  static async findById(id) {
    try {
      // Get blog
      const [blogs] = await db.query(
        `SELECT b.*, u.name as author_name, u.email as author_email 
         FROM blogs b 
         JOIN users u ON b.author_id = u.id 
         WHERE b.id = ?`,
        [id]
      );
      
      if (blogs.length === 0) {
        return null;
      }
      
      const blog = blogs[0];
      
      // Get categories
      const [categories] = await db.query(
        `SELECT c.* 
         FROM blog_categories c 
         JOIN blog_category_relation r ON c.id = r.category_id 
         WHERE r.blog_id = ?`,
        [id]
      );
      
      blog.categories = categories;
      
      return blog;
    } catch (error) {
      console.error('Error finding blog by ID:', error.message);
      return null;
    }
  }
  
  /**
   * Find blog by slug with categories
   */
  static async findBySlug(slug) {
    try {
      // Get blog
      const [blogs] = await db.query(
        `SELECT b.*, u.name as author_name, u.email as author_email 
         FROM blogs b 
         JOIN users u ON b.author_id = u.id 
         WHERE b.slug = ?`,
        [slug]
      );
      
      if (blogs.length === 0) {
        return null;
      }
      
      const blog = blogs[0];
      
      // Get categories
      const [categories] = await db.query(
        `SELECT c.* 
         FROM blog_categories c 
         JOIN blog_category_relation r ON c.id = r.category_id 
         WHERE r.blog_id = ?`,
        [blog.id]
      );
      
      blog.categories = categories;
      
      // Increment view count
      await db.query('UPDATE blogs SET views = views + 1 WHERE id = ?', [blog.id]);
      
      return blog;
    } catch (error) {
      console.error('Error finding blog by slug:', error.message);
      return null;
    }
  }
  
  /**
   * Update blog post
   */
  static async update(id, blogData) {
    const connection = await db.getConnection();
    
    try {
      await connection.beginTransaction();
      
      const { title, slug, content, image_url, status, featured, categories } = blogData;
      
      // Update blog fields
      let updateQuery = 'UPDATE blogs SET ';
      const updateFields = [];
      const updateValues = [];
      
      if (title !== undefined) {
        updateFields.push('title = ?');
        updateValues.push(title);
      }
      
      if (slug !== undefined) {
        updateFields.push('slug = ?');
        updateValues.push(slug);
      }
      
      if (content !== undefined) {
        updateFields.push('content = ?');
        updateValues.push(content);
      }
      
      if (image_url !== undefined) {
        updateFields.push('image_url = ?');
        updateValues.push(image_url);
      }
      
      if (status !== undefined) {
        updateFields.push('status = ?');
        updateValues.push(status);
      }
      
      if (featured !== undefined) {
        updateFields.push('featured = ?');
        updateValues.push(featured);
      }
      
      if (updateFields.length > 0) {
        updateQuery += updateFields.join(', ') + ' WHERE id = ?';
        updateValues.push(id);
        
        await connection.query(updateQuery, updateValues);
      }
      
      // Update categories if provided
      if (categories !== undefined) {
        // Remove existing category relations
        await connection.query('DELETE FROM blog_category_relation WHERE blog_id = ?', [id]);
        
        // Add new category relations
        if (categories && categories.length > 0) {
          for (const categoryId of categories) {
            await connection.query(
              'INSERT INTO blog_category_relation (blog_id, category_id) VALUES (?, ?)',
              [id, categoryId]
            );
          }
        }
      }
      
      await connection.commit();
      
      return await this.findById(id);
    } catch (error) {
      await connection.rollback();
      console.error('Error updating blog post:', error.message);
      throw error;
    } finally {
      connection.release();
    }
  }
  
  /**
   * Delete blog post
   */
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM blogs WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting blog post:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all blogs with filtering and pagination
   */
  static async findAll(filters = {}, limit = 10, offset = 0) {
    try {
      const { status, featured, category_id, author_id, search } = filters;
      
      // Build WHERE clause
      let whereConditions = [];
      let queryParams = [];
      
      if (status) {
        whereConditions.push('b.status = ?');
        queryParams.push(status);
      }
      
      if (featured !== undefined) {
        whereConditions.push('b.featured = ?');
        queryParams.push(featured);
      }
      
      if (author_id) {
        whereConditions.push('b.author_id = ?');
        queryParams.push(author_id);
      }
      
      if (search) {
        whereConditions.push('(b.title LIKE ? OR b.content LIKE ?)');
        const searchTerm = `%${search}%`;
        queryParams.push(searchTerm, searchTerm);
      }
      
      // Construct WHERE clause if conditions exist
      let whereClause = whereConditions.length > 0 
        ? `WHERE ${whereConditions.join(' AND ')}` 
        : '';
      
      // Handle category filter separately as it requires a JOIN
      let categoryJoin = '';
      if (category_id) {
        categoryJoin = 'JOIN blog_category_relation bcr ON b.id = bcr.blog_id';
        whereClause += whereConditions.length > 0 ? ' AND ' : ' WHERE ';
        whereClause += 'bcr.category_id = ?';
        queryParams.push(category_id);
      }
      
      // Add pagination params
      queryParams.push(limit, offset);
      
      // Execute query
      const [rows] = await db.query(
        `SELECT DISTINCT b.*, u.name as author_name 
         FROM blogs b 
         JOIN users u ON b.author_id = u.id 
         ${categoryJoin} 
         ${whereClause} 
         ORDER BY b.created_at DESC 
         LIMIT ? OFFSET ?`,
        queryParams
      );
      
      // Count total matching records
      const countParams = queryParams.slice(0, -2); // Remove limit and offset
      const [countResult] = await db.query(
        `SELECT COUNT(DISTINCT b.id) as total 
         FROM blogs b 
         ${categoryJoin} 
         ${whereClause}`,
        countParams
      );
      
      const total = countResult[0].total;
      
      // Get categories for each blog
      const blogs = [];
      for (const blog of rows) {
        const [categories] = await db.query(
          `SELECT c.* 
           FROM blog_categories c 
           JOIN blog_category_relation r ON c.id = r.category_id 
           WHERE r.blog_id = ?`,
          [blog.id]
        );
        
        blog.categories = categories;
        blogs.push(blog);
      }
      
      return {
        blogs,
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total
        }
      };
    } catch (error) {
      console.error('Error finding blogs:', error.message);
      throw error;
    }
  }
  
  /**
   * Get featured blogs
   */
  static async getFeatured(limit = 5) {
    try {
      const [rows] = await db.query(
        `SELECT b.*, u.name as author_name 
         FROM blogs b 
         JOIN users u ON b.author_id = u.id 
         WHERE b.featured = true AND b.status = 'published' 
         ORDER BY b.created_at DESC 
         LIMIT ?`,
        [limit]
      );
      
      // Get categories for each blog
      const blogs = [];
      for (const blog of rows) {
        const [categories] = await db.query(
          `SELECT c.* 
           FROM blog_categories c 
           JOIN blog_category_relation r ON c.id = r.category_id 
           WHERE r.blog_id = ?`,
          [blog.id]
        );
        
        blog.categories = categories;
        blogs.push(blog);
      }
      
      return blogs;
    } catch (error) {
      console.error('Error getting featured blogs:', error.message);
      return [];
    }
  }
  
  /**
   * Create a new blog category
   */
  static async createCategory(name) {
    try {
      const [result] = await db.query(
        'INSERT INTO blog_categories (name) VALUES (?)',
        [name]
      );
      
      if (result.insertId) {
        const [categories] = await db.query(
          'SELECT * FROM blog_categories WHERE id = ?',
          [result.insertId]
        );
        
        return categories[0];
      }
      
      return null;
    } catch (error) {
      console.error('Error creating blog category:', error.message);
      throw error;
    }
  }
  
  /**
   * Get all blog categories
   */
  static async getAllCategories() {
    try {
      const [rows] = await db.query('SELECT * FROM blog_categories ORDER BY name');
      return rows;
    } catch (error) {
      console.error('Error getting blog categories:', error.message);
      return [];
    }
  }
  
  /**
   * Delete a blog category
   */
  static async deleteCategory(id) {
    try {
      const [result] = await db.query('DELETE FROM blog_categories WHERE id = ?', [id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error('Error deleting blog category:', error.message);
      throw error;
    }
  }
  
  /**
   * Get blog statistics
   */
  static async getStats() {
    try {
      // Total blogs
      const [totalBlogs] = await db.query('SELECT COUNT(*) as count FROM blogs');
      
      // Blogs by status
      const [blogsByStatus] = await db.query(
        'SELECT status, COUNT(*) as count FROM blogs GROUP BY status'
      );
      
      // Most viewed blogs
      const [mostViewed] = await db.query(
        'SELECT id, title, views FROM blogs ORDER BY views DESC LIMIT 5'
      );
      
      // Recent blogs
      const [recentBlogs] = await db.query(
        'SELECT id, title, created_at FROM blogs ORDER BY created_at DESC LIMIT 5'
      );
      
      return {
        totalBlogs: totalBlogs[0].count,
        blogsByStatus,
        mostViewed,
        recentBlogs
      };
    } catch (error) {
      console.error('Error getting blog statistics:', error.message);
      throw error;
    }
  }
}

module.exports = Blog;