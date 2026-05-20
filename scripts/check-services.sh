#!/bin/bash
# Script to verify service health

echo "Checking Database Service..."
docker ps | grep mysql-db || echo "MySQL is DOWN"

echo "Checking Backend API..."
curl -s http://localhost:3000/health || echo "Backend is DOWN"
echo ""

echo "Checking Frontend..."
curl -s -I http://localhost | grep "200 OK" || echo "Frontend might be DOWN"
echo ""

echo "Service check complete."
