const { db } = require("../config/db")

// Get all contacts
exports.getAllContacts = (req, res) => {
  db.query("SELECT * FROM contacts", (err, results) => {
    if (err) {
      console.error("Error fetching contacts:", err)
      return res.status(500).json({ message: "Error fetching contacts", error: err.message })
    }
    res.status(200).json(results)
  })
}

// Get contact by ID
exports.getContactById = (req, res) => {
  const { id } = req.params
  db.query("SELECT * FROM contacts WHERE id = ?", [id], (err, results) => {
    if (err) {
      console.error("Error fetching contact:", err)
      return res.status(500).json({ message: "Error fetching contact", error: err.message })
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Contact not found" })
    }
    res.status(200).json(results[0])
  })
}

// Create new contact
exports.createContact = (req, res) => {
  const { name, email, phone, address, message } = req.body

  if (!name || !email || !message) {
    return res.status(400).json({ message: "Name, email, and message are required" })
  }

  const newContact = { name, email, phone, address, message }
  db.query("INSERT INTO contacts SET ?", newContact, (err, result) => {
    if (err) {
      console.error("Error creating contact:", err)
      return res.status(500).json({ message: "Error creating contact", error: err.message })
    }
    res.status(201).json({ message: "Contact message sent successfully", contactId: result.insertId })
  })
}

// Delete contact
exports.deleteContact = (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM contacts WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting contact:", err)
      return res.status(500).json({ message: "Error deleting contact", error: err.message })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Contact not found" })
    }
    res.status(200).json({ message: "Contact deleted successfully" })
  })
}
