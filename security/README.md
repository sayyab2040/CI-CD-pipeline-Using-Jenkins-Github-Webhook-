# DevSecOps Integration

Security is embedded into the CI/CD pipeline, transforming it into a DevSecOps workflow. This module contains configurations and scripts for automated security scanning.

## Scanning Stages
1. **SAST (Static Application Security Testing)**: Handled by SonarQube to analyze source code quality and security without executing it.
2. **SCA (Software Composition Analysis)**: Handled by Trivy (FS mode) to find vulnerabilities in third-party libraries (e.g., NPM packages).
3. **Container Security**: Handled by Trivy (Image mode) to scan the built Docker containers for OS vulnerabilities before they are deployed.

## Pipeline Flow
Code Commit -> SAST -> SCA -> Docker Build -> Container Scan -> Deploy
