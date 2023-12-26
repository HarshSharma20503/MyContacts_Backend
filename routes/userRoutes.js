// Importing the Express library to create a router
const express = require("express");

// Importing controller methods for handling user-related operations
const { registerUser, currentUser, loginUser } = require("../controllers/userController");

// Importing the validateToken middleware for validating tokens before accessing these routes
const validateToken = require("../middleware/validateTokenHandler");

// Creating an instance of the Express router
const router = express.Router();

// Defining routes and associating them with controller methods
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);

// Exporting the router for use in other parts of the application
module.exports = router;
