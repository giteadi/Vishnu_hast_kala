const express = require("express")
const router = express.Router()
const contactController = require("../controllers/contact")

router.get("/", contactController.getAllContacts)
router.get("/:id", contactController.getContactById)
router.post("/", contactController.createContact)
router.delete("/:id", contactController.deleteContact)

module.exports = router
