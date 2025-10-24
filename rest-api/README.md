# Book CRUD API

# Description

This is a simple REST API built with Node.js and Express for performing CRUD (Create, Read, Update, Delete) operations on books. The data is stored in memory using an array, so it resets on server restart. No database is required.

# Features
GET /books: Retrieve all books.
POST /books: Add a new book (provide title and author in the request body).
PUT /books/:id: Update an existing book by its ID.
DELETE /books/:id: Delete a book by its ID.

# Prerequisites
Node.js (version 14 or higher) installed on your system.
VS Code (for editing code, optional).
Postman (for testing API endpoints, optional).
Installation
Clone or download this project to your local machine.
Open a terminal and navigate to the project directory.
Run npm init -y to initialize the project (if not already done).
Install Express: npm install express.
(Optional) Install nodemon for auto-restart during development: npm install --save-dev nodemon.
Running the Server
Ensure your main server file is named server.js (or update package.json accordingly).
Start the server:
For development (with nodemon): npx nodemon server.js
Or simply: node server.js
The server will run on http://localhost:3000.
API Endpoints
Use tools like Postman to test these endpoints. Set the request type (GET, POST, etc.) and URL accordingly.

GET /books

# Description: Returns a list of all books.
Response: JSON array of book objects.
POST /books

Description: Adds a new book.
Request Body (JSON):
Response: The newly added book object with an auto-generated ID.
PUT /books/:id

Description: Updates an existing book by ID.
URL Parameter: id (e.g., /books/1)
Request Body (JSON): Updated fields (e.g., title and/or author).
Response: The updated book object, or an error if the ID is not found.
DELETE /books/:id

Description: Deletes a book by ID.
URL Parameter: id (e.g., /books/1)
Response: Success message, or an error if the ID is not found.
Testing
Use Postman to send requests to http://localhost:3000/books.
Example:
GET: http://localhost:3000/books
POST: http://localhost:3000/books with JSON body.
PUT: http://localhost:3000/books/1 with JSON body.
DELETE: http://localhost:3000/books/1
Technologies Used
Node.js
Express.js
License
This project is for educational purposes.

# Author
[Shubham Singh] - Built as per the project requirements. If you have questions, refer to the code in server.js.