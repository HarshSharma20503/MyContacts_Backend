// Importing the express-async-handler library to handle asynchronous errors in Express middleware
const asyncHandler = require("express-async-handler");

// Importing the jsonwebtoken library for working with JSON Web Tokens
const jwt = require("jsonwebtoken");

// Middleware function that validates a JWT token
const validateToken = asyncHandler(async (req, res, next) => {
  let token;

  // Get the authorization header from the request
  let authHeader = req.headers.Authorization || req.headers.authorization;

  // Checks if the authorization header has "Bearer" in it
  if (authHeader && authHeader.startsWith("Bearer")) {
    
    // Removes "Bearer" and extracts the JWT token
    token = authHeader.split(" ")[1];

    // Verifies the JWT token using the ACCESS_TOKEN_SECRET from the environment variables
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      // If there is an error during verification, send a 401 Unauthorized response
      if (err) {
        res.status(401);
        throw new Error("User is not authorized");
      }
      
      // If the token is successfully verified, attach the decoded user information to the request
      req.user = decoded.user;

      // Call the next middleware function in the request-response cycle
      next();
    });

    // If there is no token, send a 401 Unauthorized response and throw an error
    if (!token) {
      res.status(401);
      throw new Error("User is not authorized or token is missing");
    }
  }
  else {
    res.status(401);
    throw new Error("User is not using proper format to send req");
  }
});

// Exporting the validateToken middleware for use in other parts of the application
module.exports = validateToken;