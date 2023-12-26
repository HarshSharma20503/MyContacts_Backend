// Importing the mongoose library for MongoDB schema creation
const mongoose = require("mongoose");

// Creating a Mongoose schema for the User model
const userSchema = mongoose.Schema(
  {
    // Defining a field for the user's username as a required string
    username: {
      type: String,
      required: [true, "Please add the user name"],
    },
    // Defining a field for the user's email as a required and unique string
    email: {
      type: String,
      required: [true, "Please add the user email address"],
      unique: [true, "Email address already taken"],
    },
    // Defining a field for the user's password as a required string
    password: {
      type: String,
      required: [true, "Please add the user password"],
    },
  },
  {
    // Adding timestamps to automatically track the creation and modification dates of the user
    timestamps: true,
  }
);

// Exporting the mongoose model for the User schema
module.exports = mongoose.model("User", userSchema);
