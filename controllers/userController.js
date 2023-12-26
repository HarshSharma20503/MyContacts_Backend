// Importing the express-async-handler library to handle asynchronous errors in Express middleware
const asyncHandler = require("express-async-handler");

// Importing the bcrypt library for password hashing
const bcrypt = require("bcrypt");

// Importing the jsonwebtoken library for working with JSON Web Tokens
const jwt = require("jsonwebtoken");

// Importing the User model
const User = require("../models/userModel");

//@desc Register a user
//@route POST /api/users/register
//@access public
const registerUser = asyncHandler(async (req, res) => {
  // Destructuring values from the request body
  const { username, email, password } = req.body;

  // Checking if mandatory fields are provided
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Checking if the user is already registered
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("User already registered!");
  }

  // Hashing the password before storing it
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("Hashed Password: ", hashedPassword);

  // Creating a new user in the database
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  console.log(`User created ${user}`);
  
  // Responding with the user data if successfully created
  if (user) {
    res.status(201).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("User data is not valid");
  }

  // This line will never be reached, as the function will either respond with user data or throw an error before reaching here
  res.json({ message: "Register the user" });
});

//@desc Login user
//@route POST /api/users/login
//@access public
const loginUser = asyncHandler(async (req, res) => {
  // Destructuring values from the request body
  const { email, password } = req.body;

  // Checking if mandatory fields are provided
  if (!email || !password) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }

  // Finding the user in the database based on the provided email
  const user = await User.findOne({ email });

  // Comparing the provided password with the hashed password in the database
  if (user && (await bcrypt.compare(password, user.password))) {
    // Creating a JWT token for the user
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    // Responding with the access token
    res.status(200).json({ accessToken });
  } else {
    // Responding with an unauthorized status if email or password is not valid
    res.status(401);
    throw new Error("Email or password is not valid");
  }
});

//@desc Current user info
//@route POST /api/users/current
//@access private
const currentUser = asyncHandler(async (req, res) => {
  // Responding with the user information stored in the request object
  res.json(req.user);
});

// Exporting the controller methods for use in other parts of the application
module.exports = { registerUser, loginUser, currentUser };
