// Importing the requried files
const express = require("express");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

// Calling the connectDb function to establish a connection with the MongoDB database
connectDb();

// Creating an instance of the Express application
const app = express();

// Defining the port variable, either from the environment variable or defaulting to 5000
const port = process.env.PORT || 5000;

// Middleware to parse incoming JSON data in the request body
app.use(express.json());

// Middleware to use contactRoutes for handling routes starting with /api/contacts
app.use("/api/contacts", require("./routes/contactRoutes"));

// Middleware to use userRoutes for handling routes starting with /api/users
app.use("/api/users", require("./routes/userRoutes"));

app.get('/', (req, res) =>{
  res.send('Home route')
})

// Using the errorHandler middleware to handle errors in the application
app.use(errorHandler);

// Starting the server and listening on the specified port
app.listen(port, () => {
  // Logging a message indicating that the server is running on a specific port
  console.log(`Server running on port ${port}`);
});