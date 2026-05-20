# Backend Module

This is the API layer of our 3-tier application.

## Technologies Used
* Node.js
* Express.js
* MySQL2 (Promise-based)
* Bcryptjs (Password hashing)
* CORS

## Features
* Secure user registration with password hashing
* Login verification
* Health check endpoint
* Graceful database connection retry mechanism

## Environment Variables
Create a `.env` file based on `.env.example` if running locally without Docker.

## Endpoints
* `GET /` - Root endpoint
* `GET /health` - Health check
* `POST /api/register` - Register a new user
* `POST /api/login` - Authenticate a user
* `GET /api/users` - List all users (for testing)
