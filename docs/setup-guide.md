# Complete Setup Guide

This guide explains how to set up the entire Secure Cloud-Native CI/CD Platform from scratch.

## Prerequisites
* An AWS Account
* AWS CLI installed and configured locally
* Terraform installed
* Ansible installed
* A GitHub account

## Phase 1: Infrastructure Provisioning (Terraform)
1. Navigate to the `terraform/` directory.
2. Update `variables.tf` with your AWS region, Ubuntu AMI ID, and your existing Key Pair name.
3. Run `terraform init`.
4. Run `terraform apply` and confirm.
5. Note the output `instance_public_ip`.

## Phase 2: Configuration Management (Ansible)
1. Navigate to the `ansible/` directory.
2. Edit `inventory.ini` and replace the placeholder with your EC2 public IP and path to your private `.pem` key.
3. Run the playbooks to install required tools:
   ```bash
   ansible-playbook -i inventory.ini install-docker.yml
   ansible-playbook -i inventory.ini install-jenkins.yml
   ansible-playbook -i inventory.ini install-prometheus.yml
   ansible-playbook -i inventory.ini install-node-exporter.yml
   ansible-playbook -i inventory.ini install-grafana.yml
   ```

## Phase 3: Application Deployment
### Option A: Manual Docker Compose
1. SSH into your EC2 instance.
2. Clone this repository.
3. Navigate to `docker/`.
4. Run `docker compose up --build -d`.
5. Access the app at `http://<EC2-PUBLIC-IP>`.

### Option B: Jenkins Pipeline (Recommended)
1. Access Jenkins at `http://<EC2-PUBLIC-IP>:8080`.
2. Retrieve the initial admin password from the server.
3. Install suggested plugins.
4. Create a new Pipeline job and point it to your GitHub repository containing this code.
5. Trigger a build. The `Jenkinsfile` will handle checkout, scanning, building, and deployment.

## Phase 4: Monitoring Setup
1. Access Grafana at `http://<EC2-PUBLIC-IP>:3001` (admin/admin).
2. Add Prometheus (`http://localhost:9090`) as a data source.
3. Import a Node Exporter dashboard (e.g., ID 1860).
