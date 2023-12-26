# MyContacts_Backend

## Description
**MyContacts_Backend** is a Node.js and Express.js-based REST API project that provides endpoints for managing user contacts. It includes functionality for retrieving all contacts, getting a specific contact, and adding/deleting contacts by ID. Additionally, it features user authentication with endpoints for user registration, login, and token-based authentication using JSON Web Tokens (JWT). The project uses MongoDB as the database.

## Installation
1. **Clone the repository:**
    ```bash
    git clone https://github.com/HarshSharma20503/MyContacts_Backend.git
    ```
2. **Navigate to the project directory:**
    ```bash
    cd MyContacts_Backend
    ```
3. **Install dependencies:**
    ```bash
    npm install
    ```
4. **Set up MongoDB:**
    - Install MongoDB on your system if not already installed.
    - Create a new MongoDB database for this project.
    - Update the MongoDB connection string in a `.env` file:
    ```env
    # .env
    MONGO_URI=your_mongodb_connection_string
    PORT = your port
    ACCESS_TOKEN_SECRET = any token secret
    ```

## Usage
1. **Start the server:**
    ```bash
    npm run dev
    ```
2. The API will be accessible at `http://localhost:5000` by default or at the port you choose to be in .env.

## Endpoints
- **GET /api/contacts** Get all contacts.
- **GET /api/contacts/:id** Get a specific contact by ID.
- **POST /contacts/** Add a new contact.
- **DELETE /api/contacts/:id** Delete a contact by ID.
- **POST /api/users/register** To register a user send a JSON with username, email, password
- **POST /api/users/login** To login and get a JWT web token in response

## Database
The project uses MongoDB as its database. Make sure to configure your MongoDB connection in the `.env` file.

## Contributing
If you'd like to contribute to the project, please follow these steps:

- Fork the repository.
- Create a new branch for your feature or bug fix.
- Make your changes and submit a pull request.
