const Product = require('../models/product');
const cloudinary = require('../config/cloudinary');

/**
 * Product controller with request handlers
 */
const productController = {
  /**
   * Create a new product
   * @route POST /api/products
   * @access Admin
   */
  createProduct: async (req, res) => {
    try {
      const { name, description, price, category, stock, featured } = req.body;
      
      // Create product
      const product = await Product.create({
        name,
        description,
        price,
        category,
        stock: stock || 0,
        featured: featured || false,
        image_url: req.body.image_url || null
      });
      
      res.status(201).json(product);
    } catch (error) {
      console.error('Create product error:', error.message);
      res.status(500).json({ message: 'Server error while creating product' });
    }
  },
  
  /**
   * Get all products with filtering and pagination
   * @route GET /api/products
   * @access Public
   */
  getProducts: async (req, res) => {
    try {
      const { 
        category, 
        featured, 
        min_price, 
        max_price, 
        search,
        sort_by = 'created_at',
        sort_order = 'desc',
        limit = 10,
        page = 1
      } = req.query;
      
      // Calculate offset
      const offset = (page - 1) * limit;
      
      // Build filters
      const filters = {};
      
      if (category) filters.category = category;
      if (featured === 'true') filters.featured = true;
      if (min_price) filters.min_price = parseFloat(min_price);
      if (max_price) filters.max_price = parseFloat(max_price);
      if (search) filters.search = search;
      
      // Get products
      const result = await Product.findAll(
        filters,
        parseInt(limit),
        offset,
        sort_by,
        sort_order
      );
      
      res.json({
        products: result.products,
        pagination: {
          ...result.pagination,
          page: parseInt(page)
        }
      });
    } catch (error) {
      console.error('Get products error:', error.message);
      res.status(500).json({ message: 'Server error while fetching products' });
    }
  },
  
  /**
   * Get featured products
   * @route GET /api/products/featured
   * @access Public
   */
  getFeaturedProducts: async (req, res) => {
    try {
      const limit = req.query.limit || 6;
      
      const products = await Product.getFeatured(parseInt(limit));
      
      res.json(products);
    } catch (error) {
      console.error('Get featured products error:', error.message);
      res.status(500).json({ message: 'Server error while fetching featured products' });
    }
  },
  
  /**
   * Get product by ID
   * @route GET /api/products/:id
   * @access Public
   */
  getProductById: async (req, res) => {
    try {
      const productId = req.params.id;
      
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      res.json(product);
    } catch (error) {
      console.error('Get product by ID error:', error.message);
      res.status(500).json({ message: 'Server error while fetching product' });
    }
  },
  
  /**
   * Update product
   * @route PUT /api/products/:id
   * @access Admin
   */
  updateProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      const { name, description, price, category, stock, featured, image_url } = req.body;
      
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Update product
      const updatedProduct = await Product.update(productId, {
        name,
        description,
        price,
        category,
        stock,
        featured,
        image_url
      });
      
      res.json(updatedProduct);
    } catch (error) {
      console.error('Update product error:', error.message);
      res.status(500).json({ message: 'Server error while updating product' });
    }
  },
  
  /**
   * Delete product
   * @route DELETE /api/products/:id
   * @access Admin
   */
  deleteProduct: async (req, res) => {
    try {
      const productId = req.params.id;
      
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Delete product image from Cloudinary if exists
      if (existingProduct.image_url && existingProduct.image_url.includes('cloudinary')) {
        try {
          // Extract public_id from Cloudinary URL
          const publicId = existingProduct.image_url.split('/').pop().split('.')[0];
          await cloudinary.uploader.destroy(publicId);
        } catch (cloudinaryError) {
          console.error('Error deleting image from Cloudinary:', cloudinaryError);
          // Continue with product deletion even if image deletion fails
        }
      }
      
      // Delete product
      await Product.delete(productId);
      
      res.json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Delete product error:', error.message);
      res.status(500).json({ message: 'Server error while deleting product' });
    }
  },
  
  /**
   * Update product stock
   * @route PATCH /api/products/:id/stock
   * @access Admin
   */
  updateStock: async (req, res) => {
    try {
      const productId = req.params.id;
      const { stock } = req.body;
      
      if (stock === undefined) {
        return res.status(400).json({ message: 'Stock value is required' });
      }
      
      // Check if product exists
      const existingProduct = await Product.findById(productId);
      if (!existingProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      // Update stock
      const updatedProduct = await Product.updateStock(productId, stock);
      
      res.json(updatedProduct);
    } catch (error) {
      console.error('Update stock error:', error.message);
      res.status(500).json({ message: 'Server error while updating stock' });
    }
  },
  
  /**
   * Get product categories
   * @route GET /api/products/categories
   * @access Public
   */
  getCategories: async (req, res) => {
    try {
      const categories = await Product.getCategories();
      res.json(categories);
    } catch (error) {
      console.error('Get categories error:', error.message);
      res.status(500).json({ message: 'Server error while fetching categories' });
    }
  }
};

module.exports = productController;