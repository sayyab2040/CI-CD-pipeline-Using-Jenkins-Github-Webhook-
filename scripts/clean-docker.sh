#!/bin/bash
# Safe cleanup script for docker environment

echo "Stopping and removing containers, networks, and volumes associated with the project..."
cd ../docker
docker compose down -v

echo "Cleanup complete."
