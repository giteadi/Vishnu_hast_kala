# Vishnu Hast Kala - Server


sudo /Applications/XAMPP/xamppfiles/xampp start

## Technologies Used

- Node.js
- Express.js
- MySQL (with mysql2/promise)
- JWT for authentication
- Bcrypt for password hashing
- Multer for file uploads
- Cloudinary for image storage
- CORS for cross-origin resource sharing
- Dotenv for environment variables

## Project Structure

```
server/
├── config/             # Configuration files
│   ├── db.js           # Database configuration
│   └── cloudinary.js   # Cloudinary configuration
├── controllers/        # Request handlers
│   ├── user.js         # User controller
│   ├── product.js      # Product controller
│   ├── order.js        # Order controller
│   ├── blog.js         # Blog controller
│   ├── testimonial.js  # Testimonial controller
│   ├── contact.js      # Contact controller
│   └── upload.js       # File upload controller
├── middleware/         # Middleware functions
│   ├── auth.js         # Authentication middleware
│   ├── error.js        # Error handling middleware
│   └── upload.js       # File upload middleware
├── models/             # Database models
│   ├── user.js         # User model
│   ├── product.js      # Product model
│   ├── order.js        # Order model
│   ├── blog.js         # Blog model
│   ├── testimonial.js  # Testimonial model
│   └── contact.js      # Contact model
├── routes/             # API routes
│   ├── user.js         # User routes
│   ├── product.js      # Product routes
│   ├── order.js        # Order routes
│   ├── blog.js         # Blog routes
│   ├── testimonial.js  # Testimonial routes
│   ├── contact.js      # Contact routes
│   └── upload.js       # File upload routes
├── uploads/            # Temporary storage for uploads
├── .env                # Environment variables
├── index.js            # Entry point
└── package.json        # Project dependencies
```

## API Endpoints

### User Routes
- `POST /api/users/register` - Register a new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (authenticated)
- `PUT /api/users/profile` - Update user profile (authenticated)
- `PUT /api/users/password` - Change password (authenticated)
- `GET /api/users` - Get all users (admin only)
- `GET /api/users/:id` - Get user by ID (admin only)
- `PUT /api/users/:id` - Update user (admin only)
- `DELETE /api/users/:id` - Delete user (admin only)

### Product Routes
- `POST /api/products` - Create a new product (admin only)
- `GET /api/products` - Get all products with filtering and pagination
- `GET /api/products/featured` - Get featured products
- `GET /api/products/categories` - Get product categories
- `GET /api/products/:id` - Get product by ID
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)
- `PATCH /api/products/:id/stock` - Update product stock (admin only)

### Order Routes
- `POST /api/orders` - Create a new order (authenticated)
- `GET /api/orders` - Get all orders (admin) or user orders (customer)
- `GET /api/orders/stats` - Get order statistics (admin only)
- `GET /api/orders/:id` - Get order by ID (authenticated)
- `PATCH /api/orders/:id/status` - Update order status (admin only)
- `DELETE /api/orders/:id` - Delete order (admin only)

### Blog Routes
- `POST /api/blogs` - Create a new blog post (admin only)
- `GET /api/blogs` - Get all blog posts with filtering and pagination
- `GET /api/blogs/featured` - Get featured blog posts
- `GET /api/blogs/stats` - Get blog statistics (admin only)
- `POST /api/blogs/categories` - Create a new blog category (admin only)
- `GET /api/blogs/categories` - Get all blog categories
- `DELETE /api/blogs/categories/:id` - Delete blog category (admin only)
- `GET /api/blogs/slug/:slug` - Get blog post by slug
- `GET /api/blogs/:id` - Get blog post by ID
- `PUT /api/blogs/:id` - Update blog post (admin only)
- `DELETE /api/blogs/:id` - Delete blog post (admin only)

### Testimonial Routes
- `POST /api/testimonials` - Create a new testimonial (authenticated)
- `GET /api/testimonials` - Get all testimonials (admin only)
- `GET /api/testimonials/approved` - Get approved testimonials
- `GET /api/testimonials/stats` - Get testimonial statistics (admin only)
- `GET /api/testimonials/:id` - Get testimonial by ID
- `PUT /api/testimonials/:id` - Update testimonial (authenticated)
- `PATCH /api/testimonials/:id/status` - Update testimonial status (admin only)
- `DELETE /api/testimonials/:id` - Delete testimonial (authenticated)

### Contact Routes
- `POST /api/contacts` - Submit a new contact message
- `GET /api/contacts` - Get all contact messages (admin only)
- `GET /api/contacts/stats` - Get contact statistics (admin only)
- `GET /api/contacts/:id` - Get contact by ID (admin only)
- `PATCH /api/contacts/:id/status` - Update contact status (admin only)
- `DELETE /api/contacts/:id` - Delete contact (admin only)

### Upload Routes
- `POST /api/upload/single` - Upload a single file (authenticated)
- `POST /api/upload/multiple` - Upload multiple files (authenticated)
- `DELETE /api/upload/:public_id` - Delete a file (authenticated)

## Setup and Installation

1. Clone the repository
2. Navigate to the server directory: `cd server`
3. Install dependencies: `npm install`
4. Set up MySQL database:
   - Make sure MySQL server is running
   - Create a database: `CREATE DATABASE vishnu_hast_kala;`
5. Create a `.env` file with the following variables:
   ```
   PORT=5000
   NODE_ENV=development
   
   # Database
   DB_HOST=localhost
   DB_USER=your_db_user
   DB_PASSWORD=your_db_password
   DB_NAME=vishnu_hast_kala
   
   # JWT
   JWT_SECRET=your_jwt_secret
   JWT_EXPIRES_IN=30d
   
   # Cloudinary
   CLOUDINARY_CLOUD_NAME=your_cloud_name
   CLOUDINARY_API_KEY=your_api_key
   CLOUDINARY_API_SECRET=your_api_secret
   ```
6. Start the server:
   - Development mode: `npm run dev`
   - Production mode: `npm start`

## Database Setup

The application will automatically create the necessary tables when started. An admin user will be created with the following credentials:

- Email: admin@example.com
- Password: admin123

Make sure to change these credentials after the first login.