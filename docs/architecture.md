# System Architecture

## Overview
This project is a Secure Cloud-Native CI/CD Platform that hosts a 3-tier Login/Registration web application. It integrates modern DevOps and DevSecOps practices.

## 3-Tier Architecture
1. **Presentation Layer (Frontend)**: HTML/CSS/JS served via an Nginx container. It interacts with the backend using REST APIs.
2. **Application Layer (Backend)**: Node.js/Express.js application that handles business logic, password hashing, and database communication.
3. **Data Layer (Database)**: MySQL database that securely stores user credentials and profile information.

## Infrastructure
The entire stack is designed to run on AWS:
* **EC2 Instance**: Acts as the primary host.
* **Security Group**: Controls ingress and egress traffic, allowing specific ports for web access, SSH, and monitoring.

## Orchestration & Containerization
* **Docker**: The application components are containerized for consistency across environments.
* **Docker Compose**: Orchestrates the multi-container setup locally or on a single EC2 node.
* **Kubernetes (Alternative)**: Manifests are provided for deploying the same stack to a Kubernetes cluster for high availability and scalability.

## Monitoring & Security
* **Monitoring**: Prometheus and Grafana run natively on the EC2 host to monitor hardware resources and application health.
* **Security**: SAST (SonarQube) and SCA/Container Scanning (Trivy) are integrated into the CI/CD pipeline to catch vulnerabilities early.
