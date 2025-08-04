const { db } = require("../config/db") 
const cloudinary = require("../cloudinary")

// Helper function to fetch blog with images
const getBlogWithImages = (blogId, callback) => {
  db.query("SELECT * FROM blogs WHERE id = ?", [blogId], (err, blogResults) => {
    if (err) return callback(err)
    if (blogResults.length === 0) return callback(null, null)

    const blog = blogResults[0]
    db.query(
      "SELECT id, image_url, cloudinary_id FROM blog_images WHERE blog_id = ?",
      [blogId],
      (err, imageResults) => {
        if (err) return callback(err)
        blog.images = imageResults
        callback(null, blog)
      },
    )
  })
}

// Get all blogs
exports.getAllBlogs = (req, res) => {
  db.query("SELECT * FROM blogs", (err, blogs) => {
    if (err) {
      console.error("Error fetching blogs:", err)
      return res.status(500).json({ message: "Error fetching blogs", error: err.message })
    }

    if (blogs.length === 0) {
      return res.status(200).json([])
    }

    const blogsWithImages = []
    let completed = 0

    blogs.forEach((blog, index) => {
      db.query("SELECT id, image_url, cloudinary_id FROM blog_images WHERE blog_id = ?", [blog.id], (err, images) => {
        if (err) {
          console.error("Error fetching images for blog:", err)
          // Continue even if image fetching fails for one blog
        }
        blog.images = images || []
        blogsWithImages.push(blog)
        completed++

        if (completed === blogs.length) {
          res.status(200).json(blogsWithImages)
        }
      })
    })
  })
}

// Get blog by ID
exports.getBlogById = (req, res) => {
  const { id } = req.params
  getBlogWithImages(id, (err, blog) => {
    if (err) {
      console.error("Error fetching blog:", err)
      return res.status(500).json({ message: "Error fetching blog", error: err.message })
    }
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" })
    }
    res.status(200).json(blog)
  })
}

// Create new blog
exports.createBlog = (req, res) => {
  const { title, author, date, status } = req.body

  if (!title || !author || !date) {
    return res.status(400).json({ message: "Title, author, and date are required" })
  }

  const newBlog = { title, author, date, status }
  db.query("INSERT INTO blogs SET ?", newBlog, (err, result) => {
    if (err) {
      console.error("Error creating blog:", err)
      return res.status(500).json({ message: "Error creating blog", error: err.message })
    }
    res.status(201).json({ message: "Blog created successfully", blogId: result.insertId })
  })
}

// Update blog
exports.updateBlog = (req, res) => {
  const { id } = req.params
  const { title, author, date, status } = req.body
  const updatedBlog = { title, author, date, status }

  db.query("UPDATE blogs SET ? WHERE id = ?", [updatedBlog, id], (err, result) => {
    if (err) {
      console.error("Error updating blog:", err)
      return res.status(500).json({ message: "Error updating blog", error: err.message })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Blog not found" })
    }
    res.status(200).json({ message: "Blog updated successfully" })
  })
}

// Delete blog
exports.deleteBlog = (req, res) => {
  const { id } = req.params

  // First, get all images associated with the blog to delete from Cloudinary
  db.query("SELECT cloudinary_id FROM blog_images WHERE blog_id = ?", [id], (err, images) => {
    if (err) {
      console.error("Error fetching blog images for deletion:", err)
      return res.status(500).json({ message: "Error deleting blog", error: err.message })
    }

    // Delete images from Cloudinary
    const deletePromises = images.map((image) => {
      return new Promise((resolve, reject) => {
        cloudinary.uploader.destroy(image.cloudinary_id, (error, result) => {
          if (error) {
            console.error(`Error deleting image ${image.cloudinary_id} from Cloudinary:`, error)
            // Don't reject, just log and continue, as blog deletion is primary
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
        // Then, delete the blog (and its images from DB via CASCADE)
        db.query("DELETE FROM blogs WHERE id = ?", [id], (err, result) => {
          if (err) {
            console.error("Error deleting blog:", err)
            return res.status(500).json({ message: "Error deleting blog", error: err.message })
          }
          if (result.affectedRows === 0) {
            return res.status(404).json({ message: "Blog not found" })
          }
          res.status(200).json({ message: "Blog and associated images deleted successfully" })
        })
      })
      .catch((error) => {
        console.error("Error during Cloudinary image deletion process:", error)
        res.status(500).json({ message: "Error deleting blog images", error: error.message })
      })
  })
}

// Upload blog image
exports.uploadBlogImage = (req, res) => {
  const { blogId } = req.params

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

  // Check if blog exists
  db.query("SELECT id FROM blogs WHERE id = ?", [blogId], (err, results) => {
    if (err) {
      console.error("Error checking blog existence:", err)
      return res.status(500).json({ message: "Error uploading image", error: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Blog not found" })
    }

    // Upload to Cloudinary using tempFilePath
    cloudinary.uploader.upload(imageFile.tempFilePath, { folder: "blog_images" }, (error, result) => {
      if (error) {
        console.error("Cloudinary upload error:", error)
        return res.status(500).json({ message: "Image upload failed", error: error.message })
      }

      const imageUrl = result.secure_url
      const cloudinaryId = result.public_id

      db.query(
        "INSERT INTO blog_images (blog_id, image_url, cloudinary_id) VALUES (?, ?, ?)",
        [blogId, imageUrl, cloudinaryId],
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

// Delete blog image
exports.deleteBlogImage = (req, res) => {
  const { imageId } = req.params

  db.query("SELECT cloudinary_id FROM blog_images WHERE id = ?", [imageId], (err, results) => {
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

      db.query("DELETE FROM blog_images WHERE id = ?", [imageId], (err, dbResult) => {
        if (err) {
          console.error("Error deleting image from DB:", err)
          return res.status(500).json({ message: "Error deleting image from database", error: err.message })
        }
        res.status(200).json({ message: "Image deleted successfully" })
      })
    })
  })
}
