# Infrastructure as Code (Terraform)

This folder contains Terraform configuration to provision the required AWS infrastructure for the lab.

## Resources Created
1. **EC2 Instance**: A `t2.medium` Ubuntu server (ideal for running Jenkins, Docker, and Monitoring tools concurrently). Root volume size set to 30GB.
2. **Security Group**: Opens necessary ports:
   - 22 (SSH)
   - 80 (Frontend)
   - 3000 (Backend)
   - 8080 (Jenkins)
   - 9090 (Prometheus)
   - 3001 (Grafana)
   - 9100 (Node Exporter)

## Usage
1. Update `variables.tf` with your actual `ami_id` (Ubuntu 22.04 LTS) and `key_name` (your AWS Key Pair).
2. Initialize Terraform:
   ```bash
   terraform init
   ```
3. Plan the infrastructure:
   ```bash
   terraform plan
   ```
4. Apply the configuration:
   ```bash
   terraform apply
   ```
5. Note the output IP addresses for SSH access and Ansible configuration.
