# Secure Cloud-Native CI/CD Platform

A complete DevOps and DevSecOps lab project implementing a 3-tier web application with full infrastructure automation, CI/CD, and security scanning.

## Project Structure Highlights
* `app/`: Source code for Frontend (HTML/JS), Backend (Node.js), and Database (MySQL).
* `docker/`: Docker Compose orchestrations for local and server deployment.
* `jenkins/`: Declarative CI/CD pipeline definition (`Jenkinsfile`).
* `kubernetes/`: Complete K8s manifests for enterprise-scale deployment.
* `terraform/`: AWS Infrastructure as Code for provisioning the EC2 server.
* `ansible/`: Configuration management playbooks to install server dependencies.
* `monitoring/`: Prometheus and Grafana setup for observability.
* `security/`: DevSecOps integrations including Trivy (SCA/Container) and SonarQube (SAST).
* `docs/`: Comprehensive documentation and viva notes.
* `scripts/`: Helper bash scripts for local testing.

## Getting Started
Please refer to `docs/setup-guide.md` for complete step-by-step instructions on provisioning the infrastructure and deploying the application.

## Quick Local / EC2 Docker Compose Deployment
If you just want to run the application on your machine or EC2 instance (requires Docker):
```bash
cd docker
docker compose up --build -d
```

### Public URLs for this Environment
Assuming the EC2 public IP is `16.171.150.128`:
- **Frontend**: http://16.171.150.128
- **Backend**: http://16.171.150.128:5000
- **Jenkins**: http://16.171.150.128:8080
- **Grafana**: http://16.171.150.128:3000
- **Prometheus**: http://16.171.150.128:9090

*Note: Monitoring tools (Grafana, Prometheus, Node Exporter) are installed directly on Ubuntu EC2 as services, not as containers.*

## Architecture Overview
See `docs/architecture.md` for a detailed breakdown of the 3-tier architecture and the DevOps tools used.
