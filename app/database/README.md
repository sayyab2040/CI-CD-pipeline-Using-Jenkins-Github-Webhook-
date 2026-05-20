# Database Module

This module initializes the MySQL database for our application.

## Structure
* Database name: `login_app`
* Main table: `users`
  * `id` (Primary Key)
  * `name`
  * `email` (Unique)
  * `password` (Hashed)
  * `created_at`

## Initialization
When orchestrated via Docker Compose, the `init.sql` script is automatically executed on the first run of the MySQL container to set up the schema.
