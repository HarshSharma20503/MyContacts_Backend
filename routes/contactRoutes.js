// Importing the Express library to create a router
const express = require("express");

// Creating an instance of the Express router
const router = express.Router();

// Importing controller methods for handling contact-related operations
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
} = require("../controllers/contactController");

// Importing the validateToken middleware for validating tokens before accessing these routes
const validateToken = require("../middleware/validateTokenHandler");

// Using the validateToken middleware to validate tokens before using these routes
router.use(validateToken);

// Defining routes and associating them with controller methods
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

// Exporting the router for use in other parts of the application
module.exports = router;