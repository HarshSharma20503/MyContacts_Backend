// Importing the mongoose library for MongoDB connectivity
const mongoose = require("mongoose");

// Function to connect to the MongoDB database
const connectDb = async () => {
  try {
    // Attempting to connect to the MongoDB database using the provided connection string
    const connection = await mongoose.connect(process.env.CONNECTION_STRING);

    // Logging a message upon successful database connection
    console.log(
      "Database connected:",
      connection.connection.host,
      connection.connection.name
    );
  } catch (err) {
    // Logging an error message and exiting the process with an error code if the connection attempt fails
    console.log(err);
    process.exit(1);
  }
};

// Exporting the connectDb function for use in other parts of the application
module.exports = connectDb;
