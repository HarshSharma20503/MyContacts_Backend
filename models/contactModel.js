// Importing the mongoose library for MongoDB schema creation
const mongoose = require("mongoose");

// Creating a Mongoose schema for the Contact model
const contactSchema = mongoose.Schema(
  {
    // Defining a field for user_id as an ObjectId reference to the User model
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User", // Referencing the User model
    },
    // Defining a field for the contact's name as a required string
    name: {
      type: String,
      required: [true, "Please add the contact name"],
    },
    // Defining a field for the contact's email as a required string
    email: {
      type: String,
      required: [true, "Please add the contact email address"],
    },
    // Defining a field for the contact's phone number as a required string
    phone: {
      type: String,
      required: [true, "Please add the contact phone number"],
    },
  },
  {
    // Adding timestamps to automatically track the creation and modification dates of the contact
    timestamps: true,
  }
);

// Exporting the mongoose model for the Contact schema
module.exports = mongoose.model("Contact", contactSchema);
