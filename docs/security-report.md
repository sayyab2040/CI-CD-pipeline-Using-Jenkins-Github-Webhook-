# Security Implementation Report

Security is integrated directly into the CI/CD pipeline (DevSecOps), ensuring code is validated automatically before it reaches production.

## 1. SAST (Static Application Security Testing)
* **Tool**: SonarQube
* **Function**: Analyzes the raw source code for anti-patterns, hardcoded secrets, and syntax vulnerabilities.
* **Location**: Runs early in the pipeline (after checkout).

## 2. SCA (Software Composition Analysis)
* **Tool**: Trivy (Filesystem Scan)
* **Function**: Scans `package.json` to identify if we are using third-party libraries with known CVEs (Common Vulnerabilities and Exposures).

## 3. Container Scanning
* **Tool**: Trivy (Image Scan)
* **Function**: Once the Docker image is built, Trivy scans the OS layers (e.g., Alpine Linux) to ensure no outdated or vulnerable system packages are included.

## Additional Security Measures
* **Password Hashing**: The Node.js backend uses `bcryptjs` to hash passwords before storing them in MySQL.
* **Network Isolation**: Docker networks prevent outside access to the database; it is only accessible by the backend container.
