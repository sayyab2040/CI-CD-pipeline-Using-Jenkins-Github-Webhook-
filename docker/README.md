# Docker Orchestration

This folder contains the Docker Compose configuration to spin up the entire 3-tier application locally or on an EC2 instance.

## Usage

Navigate to this directory and run:

```bash
docker compose up --build -d
```

This will start:
1. MySQL Database (port 3306)
2. Node.js Backend (port 3000)
3. Nginx Frontend (port 80)

To stop the application:

```bash
docker compose down
```

## Volumes
The configuration includes a named volume `mysql_data` to ensure database persistence across container restarts.
