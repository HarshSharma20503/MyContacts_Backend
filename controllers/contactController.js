// Importing the express-async-handler library to handle asynchronous errors in Express middleware
const asyncHandler = require("express-async-handler");

// Importing the Contact model
const Contact = require("../models/contactModel");

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  // Fetching all contacts associated with the user_id from the request object
  const contacts = await Contact.find({ user_id: req.user.id });
  // Responding with the fetched contacts
  res.status(200).json(contacts);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req, res) => {
  console.log("The request body is :", req.body);
  // Destructuring values from the request body
  const { name, email, phone } = req.body;

  // Checking if mandatory fields are provided
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }

  // Creating a new contact in the database
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  // Responding with the created contact
  res.status(201).json(contact);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
const getContact = asyncHandler(async (req, res) => {
  // Finding a contact by its ID
  const contact = await Contact.findById(req.params.id);

  // Responding with a 404 status if the contact is not found
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Responding with the fetched contact
  res.status(200).json(contact);
});

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  // Finding a contact by its ID
  const contact = await Contact.findById(req.params.id);

  // Responding with a 404 status if the contact is not found
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Checking if the user has permission to update the contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to update other user contacts");
  }

  // Updating the contact in the database
  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  // Responding with the updated contact
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  // Finding a contact by its ID
  const contact = await Contact.findById(req.params.id);

  // Responding with a 404 status if the contact is not found
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  // Checking if the user has permission to delete the contact
  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User doesn't have permission to delete other user contacts");
  }

  // Deleting the contact from the database
  await Contact.deleteOne({ _id: req.params.id });

  // Responding with the deleted contact
  res.status(200).json(contact);
});

// Exporting the controller methods for use in other parts of the application
module.exports = {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
};
