# Jenkins CI/CD Pipeline

This folder contains the `Jenkinsfile` for automating the CI/CD and DevSecOps processes.

## Pipeline Stages
1. **Checkout**: Pulls the latest code from Git.
2. **Install Dependencies**: Installs Node.js dependencies.
3. **SAST**: Placeholder for SonarQube static code analysis.
4. **SCA**: Placeholder for Trivy filesystem scanning to detect vulnerabilities in dependencies.
5. **Build Docker Images**: Uses Docker Compose to build frontend and backend images.
6. **Container Security Scan**: Placeholder for Trivy image scanning.
7. **Deploy via Docker Compose**: Gracefully brings down old containers and spins up the new ones.
8. **Verify Containers**: Lists running containers for quick visual feedback in Jenkins logs.

## Requirements
* Jenkins running on an Ubuntu EC2 instance.
* Docker and Docker Compose installed on the Jenkins server.
* The `jenkins` user must be added to the `docker` group to run docker commands without `sudo`.
