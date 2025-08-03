const Blog = require('../models/blog');
const cloudinary = require('../config/cloudinary');

/**
 * Blog controller with request handlers
 */
const blogController = {
  /**
   * Create a new blog post
   * @route POST /api/blogs
   * @access Admin
   */
  createBlog: async (req, res) => {
    try {
      const { title, slug, content, image_url, status, featured, categories } = req.body;
      const author_id = req.user.id;
      
      // Validate required fields
      if (!title || !content) {
        return res.status(400).json({ message: 'Title and content are required' });
      }
      
      // Generate slug if not provided
      const finalSlug = slug || title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      
      // Create blog post
      const blog = await Blog.create({
        title,
        slug: finalSlug,
        content,
        image_url,
        author_id,
        status,
        featured,
        categories
      });
      
      res.status(201).json(blog);
    } catch (error) {
      console.error('Create blog error:', error.message);
      res.status(500).json({ message: 'Server error while creating blog post' });
    }
  },
  
  /**
   * Get all blog posts with filtering and pagination
   * @route GET /api/blogs
   * @access Public
   */
  getBlogs: async (req, res) => {
    try {
      const { 
        status, 
        featured, 
        category_id, 
        author_id, 
        search,
        limit = 10,
        page = 1
      } = req.query;
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Build filters
      const filters = {};
      
      // If not admin and not explicitly requesting drafts, only show published
      if (!req.user || req.user.role !== 'admin') {
        filters.status = 'published';
      } else if (status) {
        filters.status = status;
      }
      
      if (featured === 'true') filters.featured = true;
      if (category_id) filters.category_id = parseInt(category_id);
      if (author_id) filters.author_id = parseInt(author_id);
      if (search) filters.search = search;
      
      // Get blogs
      const result = await Blog.findAll(
        filters,
        parseInt(limit),
        offset
      );
      
      res.json({
        blogs: result.blogs,
        pagination: {
          ...result.pagination,
          page: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Get blogs error:', error.message);
      res.status(500).json({ message: 'Server error while fetching blogs' });
    }
  },
  
  /**
   * Get featured blog posts
   * @route GET /api/blogs/featured
   * @access Public
   */
  getFeaturedBlogs: async (req, res) => {
    try {
      const limit = req.query.limit || 5;
      
      const blogs = await Blog.getFeatured(parseInt(limit));
      
      res.json(blogs);
    } catch (error) {
      console.error('Get featured blogs error:', error.message);
      res.status(500).json({ message: 'Server error while fetching featured blogs' });
    }
  },
  
  /**
   * Get blog post by ID
   * @route GET /api/blogs/:id
   * @access Mixed
   */
  getBlogById: async (req, res) => {
    try {
      const blogId = req.params.id;
      
      const blog = await Blog.findById(blogId);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // If blog is draft and user is not admin, deny access
      if (blog.status === 'draft' && (!req.user || req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Not authorized to view this blog post' });
      }
      
      res.json(blog);
    } catch (error) {
      console.error('Get blog by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching blog post' });
    }
  },
  
  /**
   * Get blog post by slug
   * @route GET /api/blogs/slug/:slug
   * @access Mixed
   */
  getBlogBySlug: async (req, res) => {
    try {
      const slug = req.params.slug;
      
      const blog = await Blog.findBySlug(slug);
      if (!blog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // If blog is draft and user is not admin, deny access
      if (blog.status === 'draft' && (!req.user || req.user.role !== 'admin')) {
        return res.status(403).json({ message: 'Not authorized to view this blog post' });
      }
      
      res.json(blog);
    } catch (error) {
      console.error('Get blog by slug error:', error.message);
      res.status(500).json({ message: 'Server error while fetching blog post' });
    }
  },
  
  /**
   * Update blog post
   * @route PUT /api/blogs/:id
   * @access Admin
   */
  updateBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      const { title, slug, content, image_url, status, featured, categories } = req.body;
      
      // Check if blog exists
      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // Generate slug if title changed and slug not provided
      let finalSlug = slug;
      if (title && title !== existingBlog.title && !slug) {
        finalSlug = title.toLowerCase().replace(/[^\w\s]/gi, '').replace(/\s+/g, '-');
      }
      
      // Update blog post
      const updatedBlog = await Blog.update(blogId, {
        title,
        slug: finalSlug,
        content,
        image_url,
        status,
        featured,
        categories
      });
      
      res.json(updatedBlog);
    } catch (error) {
      console.error('Update blog error:', error.message);
      res.status(500).json({ message: 'Server error while updating blog post' });
    }
  },
  
  /**
   * Delete blog post
   * @route DELETE /api/blogs/:id
   * @access Admin
   */
  deleteBlog: async (req, res) => {
    try {
      const blogId = req.params.id;
      
      // Check if blog exists
      const existingBlog = await Blog.findById(blogId);
      if (!existingBlog) {
        return res.status(404).json({ message: 'Blog post not found' });
      }
      
      // Delete blog image from Cloudinary if exists
      if (existingBlog.image_url && existingBlog.image_url.includes('cloudinary')) {
        try {
          // Extract public_id from Cloudinary URL
          const publicId = existingBlog.image_url.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with blog deletion even if image deletion fails
        }
      }
      
      // Delete blog post
      await Blog.delete(blogId);
      
      res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
      console.error('Delete blog error:', error.message);
      res.status(500).json({ message: 'Server error while deleting blog post' });
    }
  },
  
  /**
   * Create a new blog category
   * @route POST /api/blogs/categories
   * @access Admin
   */
  createCategory: async (req, res) => {
    try {
      const { name } = req.body;
      
      if (!name) {
        return res.status(400).json({ message: 'Category name is required' });
      }
      
      const category = await Blog.createCategory(name);
      
      res.status(201).json(category);
    } catch (error) {
      console.error('Create category error:', error.message);
      res.status(500).json({ message: 'Server error while creating category' });
    }
  },
  
  /**
   * Get all blog categories
   * @route GET /api/blogs/categories
   * @access Public
   */
  getCategories: async (req, res) => {
    try {
      const categories = await Blog.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get categories error:', error.message);
      res.status(500).json({ message: 'Server error while fetching categories' });
    }
  },
  
  /**
   * Delete blog category
   * @route DELETE /api/blogs/categories/:id
   * @access Admin
   */
  deleteCategory: async (req, res) => {
    try {
      const categoryId = req.params.id;
      
      const result = await Blog.deleteCategory(categoryId);
      
      if (!result) {
        return res.status(404).json({ message: 'Category not found' });
      }
      
      res.json({ message: 'Category deleted successfully' });
    } catch (error) {
      console.error('Delete category error:', error.message);
      res.status(500).json({ message: 'Server error while deleting category' });
    }
  },
  
  /**
   * Get blog statistics (admin only)
   * @route GET /api/blogs/stats
   * @access Admin
   */
  getBlogStats: async (req, res) => {
    try {
      const stats = await Blog.getStats();
      res.json(stats);
    } catch (error) {
      console.error('Get blog stats error:', error.message);
      res.status(500).json({ message: 'Server error while fetching blog statistics' });
    }
  }
};

module.exports = blogController;