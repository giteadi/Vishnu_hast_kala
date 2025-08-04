const express = require("express")
const router = express.Router()
const productController = require("../controllers/product")

router.get("/", productController.getAllProducts)
router.get("/:id", productController.getProductById)
router.post("/", productController.createProduct)
router.put("/:id", productController.updateProduct)
router.delete("/:id", productController.deleteProduct)

// Image upload routes (express-fileupload is global middleware, no need for 'upload' here)
router.post("/:productId/images", productController.uploadProductImage)
router.delete("/images/:imageId", productController.deleteProductImage)

module.exports = router
