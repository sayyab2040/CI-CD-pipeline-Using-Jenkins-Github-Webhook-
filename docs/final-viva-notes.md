# Final Viva Notes & Quick Explanations

Use this document to quickly recap concepts for project presentations or vivas.

## 1. The Application (3-Tier)
* **Frontend**: HTML/JS/CSS. Dynamic API URLs based on host. Glassmorphism design.
* **Backend**: Node.js/Express. Handles APIs, securely hashes passwords using `bcrypt`.
* **Database**: MySQL. Stores users securely. Uses Docker volumes for persistence.

## 2. Infrastructure as Code (Terraform)
* **What**: Automates the creation of AWS EC2 and Security Groups.
* **Why**: Repeatable, version-controlled infrastructure instead of clicking through AWS console.

## 3. Configuration Management (Ansible)
* **What**: Playbooks to install Docker, Jenkins, and Monitoring tools on the EC2.
* **Why**: Ensures server is configured identically every time. Idempotent (running it twice doesn't break things).

## 4. Containerization (Docker)
* **What**: Packages app and dependencies into standard units (Images).
* **Why**: "It works on my machine" -> It works everywhere. Isolation and easy deployment.

## 5. Orchestration (Docker Compose & Kubernetes)
* **What**: Manages multiple containers.
* **Why**: Defines how Frontend, Backend, and DB talk to each other. Kubernetes adds self-healing, scaling, and load balancing.

## 6. CI/CD (Jenkins)
* **What**: Continuous Integration / Continuous Deployment.
* **Why**: Automates testing, security scanning, building, and deployment when code is pushed. Removes human error.

## 7. DevSecOps (Trivy & SonarQube)
* **What**: Shifting security "left" (doing it early in the pipeline).
* **Why**: Catches vulnerabilities in code (SonarQube) and dependencies/OS (Trivy) before deployment.

## 8. Monitoring (Prometheus & Grafana)
* **What**: Prometheus collects metrics; Grafana visualizes them.
* **Why**: To know if the server is healthy (CPU, RAM) and to detect issues post-deployment.
