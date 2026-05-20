# Trivy Security Scanner

[Trivy](https://github.com/aquasecurity/trivy) is a comprehensive security scanner used in this project to implement the SCA (Software Composition Analysis) and Container Security scanning stages of our DevSecOps pipeline.

## Usage in Pipeline
In our Jenkinsfile, Trivy is executed in two stages:
1. **Filesystem Scan**: Scans the application codebase and `package.json` for known vulnerabilities in dependencies before building.
2. **Image Scan**: Scans the built Docker images for OS-level vulnerabilities before deployment.

## Script Usage
The `trivy-scan.sh` script is provided as a placeholder wrapper that can be executed locally or integrated into custom CI tools.
