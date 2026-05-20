# Utility Scripts

This folder contains helper bash scripts for local development and testing.

* `deploy.sh`: A simple wrapper to trigger docker-compose build and up.
* `clean-docker.sh`: Gracefully tears down the docker compose environment, including persistent volumes. Use when you want a completely fresh database.
* `check-services.sh`: Pings the local endpoints to verify that the frontend, backend, and database are running and responding.

## Usage
Make sure scripts are executable before running them:
```bash
chmod +x *.sh
./deploy.sh
```
