# Docker & Containerization Report

## Strategy
Containerization ensures that the application runs identically in development, testing, and production environments.

### Frontend
* **Base Image**: `nginx:alpine` (Lightweight web server)
* **Process**: Copies static HTML, CSS, and JS files into Nginx's default hosting directory.

### Backend
* **Base Image**: `node:18-alpine`
* **Process**: Copies `package.json`, runs `npm install`, then copies the rest of the application code. Exposes port 3000.

### Database
* **Image**: Standard `mysql:8.0` image.
* **Initialization**: The `init.sql` script is mounted to `/docker-entrypoint-initdb.d/` which Docker automatically executes to create the schema on the first run.
* **Persistence**: Uses a named Docker volume `mysql_data` to ensure data isn't lost if the container stops.

### Orchestration
`docker-compose.yml` ties the three containers together on a custom bridge network (`app-network`). It manages environment variables, port mappings, and startup dependencies (e.g., Backend waits for MySQL to be healthy).
