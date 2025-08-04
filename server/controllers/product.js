const { db } = require("../config/db")
const cloudinary = require("../config/cloudinary")

// Helper function to fetch product with images
const getProductWithImages = (productId, callback) => {
  db.query("SELECT * FROM products WHERE id = ?", [productId], (err, productResults) => {
    if (err) return callback(err)
    if (productResults.length === 0) return callback(null, null)

    const product = productResults[0]
    db.query(
      "SELECT id, image_url, cloudinary_id FROM product_images WHERE product_id = ?",
      [productId],
      (err, imageResults) => {
        if (err) return callback(err)
        product.images = imageResults
        callback(null, product)
      },
    )
  })
}

// Get all products
exports.getAllProducts = (req, res) => {
  db.query("SELECT * FROM products", (err, products) => {
    if (err) {
      console.error("Error fetching products:", err)
      return res.status(500).json({ message: "Error fetching products", error: err.message })
    }

    if (products.length === 0) {
      return res.status(200).json([])
    }

    const productsWithImages = []
    let completed = 0

    products.forEach((product, index) => {
      db.query(
        "SELECT id, image_url, cloudinary_id FROM product_images WHERE product_id = ?",
        [product.id],
        (err, images) => {
          if (err) {
            console.error("Error fetching images for product:", err)
            // Continue even if image fetching fails for one product
          }
          product.images = images || []
          productsWithImages.push(product)
          completed++

          if (completed === products.length) {
            res.status(200).json(productsWithImages)
          }
        },
      )
    })
  })
}

// Get product by ID
exports.getProductById = (req, res) => {
  const { id } = req.params
  getProductWithImages(id, (err, product) => {
    if (err) {
      console.error("Error fetching product:", err)
      return res.status(500).json({ message: "Error fetching product", error: err.message })
    }
    if (!product) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json(product)
  })
}

// Create new product
exports.createProduct = (req, res) => {
  const { name, category, stock, price } = req.body

  if (!name || !price) {
    return res.status(400).json({ message: "Name and price are required" })
  }

  const newProduct = { name, category, stock, price }
  db.query("INSERT INTO products SET ?", newProduct, (err, result) => {
    if (err) {
      console.error("Error creating product:", err)
      return res.status(500).json({ message: "Error creating product", error: err.message })
    }
    res.status(201).json({ message: "Product created successfully", productId: result.insertId })
  })
}

// Update product
exports.updateProduct = (req, res) => {
  const { id } = req.params
  const { name, category, stock, price } = req.body
  const updatedProduct = { name, category, stock, price }

  db.query("UPDATE products SET ? WHERE id = ?", [updatedProduct, id], (err, result) => {
    if (err) {
      console.error("Error updating product:", err)
      return res.status(500).json({ message: "Error updating product", error: err.message })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({ message: "Product updated successfully" })
  })
}

// Delete product
exports.deleteProduct = (req, res) => {
  const { id } = req.params

  // First, get all images associated with the product to delete from Cloudinary
  db.query("SELECT cloudinary_id FROM product_images WHERE product_id = ?", [id], (err, images) => {
    if (err) {
      console.error("Error fetching product images for deletion:", err)
      return res.status(500).json({ message: "Error deleting product", error: err.message })
    }

    // Delete images from Cloudinary
    const deletePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(image.cloudinary_id, (error, result) => {
          if (error) {
            console.error(`Error deleting image ${image.cloudinary_id} from Cloudinary:`, error)
            // Don't reject, just log and continue, as product deletion is primary
            resolve()
          } else {
            console.log(`Cloudinary image ${image.cloudinary_id} deleted:`, result)
            resolve()
          }
        })
      })
    })

    Promise.all(deletePromises)
      .then(() => {
        // Then, delete the product (and its images from DB via CASCADE)
        db.query("DELETE FROM products WHERE id = ?", [id], (err, result) => {
          if (err) {
            console.error("Error deleting product:", err)
            return res.status(500).json({ message: "Error deleting product", error: err.message })
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Product not found" })
          }
          res.status(200).json({ message: "Product and associated images deleted successfully" })
        })
      })
      .catch((error) => {
        console.error("Error during Cloudinary image deletion process:", error)
        res.status(500).json({ message: "Error deleting product images", error: error.message })
      })
  })
}

// Upload product image
exports.uploadProductImage = (req, res) => {
  const { productId } = req.params

  if (!req.files || Object.keys(req.files).length === 0 || !req.files.image) {
    return res.status(400).json({ message: "No image file provided" })
  }

  const imageFile = req.files.image

  // Check file type
  const filetypes = /jpeg|jpg|png|gif/
  const extname = filetypes.test(imageFile.name.toLowerCase())
  const mimetype = filetypes.test(imageFile.mimetype)

  if (!mimetype || !extname) {
    return res.status(400).json({ message: "Only image files (jpg, jpeg, png, gif) are allowed!" })
  }

  // Check if product exists
  db.query("SELECT id FROM products WHERE id = ?", [productId], (err, results) => {
    if (err) {
      console.error("Error checking product existence:", err)
      return res.status(500).json({ message: "Error uploading image", error: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Product not found" })
    }

    // Upload to Cloudinary using tempFilePath
    cloudinary.uploader.upload(imageFile.tempFilePath, { folder: "product_images" }, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error)
        return res.status(500).json({ message: "Image upload failed", error: error.message })
      }

      const imageUrl = result.secure_url
      const cloudinaryId = result.public_id

      db.query(
        "INSERT INTO product_images (product_id, image_url, cloudinary_id) VALUES (?, ?, ?)",
        [productId, imageUrl, cloudinaryId],
        (err, dbResult) => {
          if (err) {
            console.error("Error saving image to DB:", err)
            // Optionally delete from Cloudinary if DB save fails
            cloudinary.uploader.destroy(cloudinaryId, () => {})
            return res.status(500).json({ message: "Error saving image to database", error: err.message })
          }
          res
            .status(201)
            .json({ message: "Image uploaded and saved successfully", imageId: dbResult.insertId, imageUrl })
        },
      )
    })
  })
}

// Delete product image
exports.deleteProductImage = (req, res) => {
  const { imageId } = req.params

  db.query("SELECT cloudinary_id FROM product_images WHERE id = ?", [imageId], (err, results) => {
    if (err) {
      console.error("Error fetching image for deletion:", err)
      return res.status(500).json({ message: "Error deleting image", error: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Image not found" })
    }

    const { cloudinary_id } = results[0]

    cloudinary.uploader.destroy(cloudinary_id, (error, result) => {
      if (error) {
        console.error("Cloudinary deletion error:", error)
        return res.status(500).json({ message: "Image deletion from Cloudinary failed", error: error.message })
      }
      console.log("Cloudinary deletion result:", result)

      db.query("DELETE FROM product_images WHERE id = ?", [imageId], (err, dbResult) => {
        if (err) {
          console.error("Error deleting image from DB:", err)
          return res.status(500).json({ message: "Error deleting image from database", error: err.message })
        }
        res.status(200).json({ message: "Image deleted successfully" })
      })
    })
  })
}
