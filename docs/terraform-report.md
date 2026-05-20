# Infrastructure as Code: Terraform Report

## Purpose
Terraform allows us to define our cloud infrastructure as code, ensuring it is version-controlled, repeatable, and easily modifiable.

## Implementation Details
* **Provider**: Configured for AWS.
* **Variables**: Parameterized region, instance type, AMI, and Key Pair for flexibility.
* **Main Resource**: Provisions an AWS EC2 instance (`t2.medium`) running Ubuntu. The size is chosen to comfortably handle Jenkins, Docker builds, and Monitoring tools simultaneously. A 30GB root volume is attached to prevent disk space issues during Docker builds.
* **Security Group**: Acts as a virtual firewall. We selectively open ports for HTTP (80), Backend API (3000), Jenkins (8080), Prometheus (9090), Grafana (3001), Node Exporter (9100), and SSH (22).
* **Outputs**: Extracts the dynamic Public IP address, saving the user from having to log into the AWS Console.
