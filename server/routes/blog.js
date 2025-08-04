const express = require("express")
const router = express.Router()
const blogController = require("../controllers/blog")

router.get("/", blogController.getAllBlogs)
router.get("/:id", blogController.getBlogById)
router.post("/", blogController.createBlog)
router.put("/:id", blogController.updateBlog)
router.delete("/:id", blogController.deleteBlog)

// Image upload routes (express-fileupload is global middleware, no need for 'upload' here)
router.post("/:blogId/images", blogController.uploadBlogImage)
router.delete("/images/:imageId", blogController.deleteBlogImage)

module.exports = router
