#!/bin/bash
# Simple safe deployment script wrapper

echo "Starting Local Deployment..."
cd ../docker

echo "Building and starting containers in detached mode..."
docker compose up --build -d

echo "Deployment finished. Checking status..."
docker compose ps

echo "App should be running at http://localhost"
