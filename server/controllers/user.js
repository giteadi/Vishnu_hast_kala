const { db } = require("../config/db")
const bcrypt = require("bcryptjs")

// Get all users
exports.getAllUsers = (req, res) => {
  db.query(
    "SELECT id, name, email, phone, address, role, profile_image, created_at, updated_at FROM users",
    (err, results) => {
      if (err) {
        console.error("Error fetching users:", err)
        return res.status(500).json({ message: "Error fetching users", error: err.message })
      }
      res.status(200).json(results)
    },
  )
}

// Get user by ID
exports.getUserById = (req, res) => {
  const { id } = req.params
  db.query(
    "SELECT id, name, email, phone, address, role, profile_image, created_at, updated_at FROM users WHERE id = ?",
    [id],
    (err, results) => {
      if (err) {
        console.error("Error fetching user:", err)
        return res.status(500).json({ message: "Error fetching user", error: err.message })
      }
      if (results.length === 0) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json(results[0])
    },
  )
}

// Create new user
exports.createUser = (req, res) => {
  const { name, email, phone, address, password, role } = req.body

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Name, email, and password are required" })
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err)
      return res.status(500).json({ message: "Error creating user", error: err.message })
    }

    const newUser = { name, email, phone, address, password: hashedPassword, role }
    db.query("INSERT INTO users SET ?", newUser, (err, result) => {
      if (err) {
        console.error("Error creating user:", err)
        return res.status(500).json({ message: "Error creating user", error: err.message })
      }
      res.status(201).json({ message: "User created successfully", userId: result.insertId })
    })
  })
}

// Update user
exports.updateUser = (req, res) => {
  const { id } = req.params
  const { name, email, phone, address, password, role, profile_image } = req.body
  const updatedUser = { name, email, phone, address, role, profile_image }

  if (password) {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error("Error hashing password:", err)
        return res.status(500).json({ message: "Error updating user", error: err.message })
      }
      updatedUser.password = hashedPassword
      db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id], (err, result) => {
        if (err) {
          console.error("Error updating user:", err)
          return res.status(500).json({ message: "Error updating user", error: err.message })
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: "User not found" })
        }
        res.status(200).json({ message: "User updated successfully" })
      })
    })
  } else {
    db.query("UPDATE users SET ? WHERE id = ?", [updatedUser, id], (err, result) => {
      if (err) {
        console.error("Error updating user:", err)
        return res.status(500).json({ message: "Error updating user", error: err.message })
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" })
      }
      res.status(200).json({ message: "User updated successfully" })
    })
  }
}

// Delete user
exports.deleteUser = (req, res) => {
  const { id } = req.params
  db.query("DELETE FROM users WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error("Error deleting user:", err)
      return res.status(500).json({ message: "Error deleting user", error: err.message })
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" })
    }
    res.status(200).json({ message: "User deleted successfully" })
  })
}
