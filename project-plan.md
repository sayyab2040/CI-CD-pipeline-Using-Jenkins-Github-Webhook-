# Project Plan & Milestones

This document outlines the structured approach used to build and deploy the Secure Cloud-Native CI/CD Platform.

## Milestone 1: Application Development (Completed)
- [x] Design simple, attractive HTML/CSS/JS frontend.
- [x] Implement dynamic API URL logic for EC2 compatibility.
- [x] Build Node.js backend with Express and `bcryptjs`.
- [x] Create MySQL database schema for user registration.
- [x] Test end-to-end local connectivity.

## Milestone 2: Containerization (Completed)
- [x] Write `Dockerfile` for Nginx frontend.
- [x] Write `Dockerfile` for Node.js backend.
- [x] Write `docker-compose.yml` tying Frontend, Backend, and DB together.
- [x] Implement persistent volumes for MySQL.

## Milestone 3: Infrastructure Provisioning (Completed)
- [x] Write Terraform scripts to provision AWS EC2 `t2.medium`.
- [x] Define Security Group rules for all required ports (80, 3000, 8080, 9090, 3001, etc.).

## Milestone 4: Configuration Management (Completed)
- [x] Write Ansible playbooks to install Docker and Docker Compose.
- [x] Write Ansible playbook for Jenkins setup.
- [x] Write Ansible playbooks for Prometheus, Grafana, and Node Exporter systemd services.

## Milestone 5: DevSecOps Pipeline Setup (Completed)
- [x] Write declarative `Jenkinsfile`.
- [x] Implement build and deploy stages.
- [x] Integrate SAST placeholders (SonarQube).
- [x] Integrate SCA and Container Scan placeholders (Trivy).

## Milestone 6: Kubernetes Migration Option (Completed)
- [x] Translate docker-compose to Kubernetes manifests (Deployments, Services, ConfigMaps, Secrets, Ingress, PVC).

## Milestone 7: Documentation (Completed)
- [x] Write architecture, setup guides, and module-specific reports.
- [x] Prepare Final Viva Notes for easy presentation.
