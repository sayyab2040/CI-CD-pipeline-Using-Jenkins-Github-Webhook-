# CI/CD Workflow Explanation

## The Pipeline Flow
The automated CI/CD pipeline is defined in the `jenkins/Jenkinsfile` and represents a complete DevSecOps lifecycle.

### 1. Code Commit
A developer pushes code changes (e.g., a new frontend feature or a backend fix) to the GitHub repository.

### 2. Continuous Integration (CI)
* **Checkout**: Jenkins pulls the latest code.
* **Dependencies**: Jenkins installs necessary dependencies (e.g., `npm install`).
* **SAST (Static Analysis)**: SonarQube scans the raw source code for bugs, code smells, and security vulnerabilities without running the code.
* **SCA (Software Composition Analysis)**: Trivy scans the filesystem, particularly looking at `package.json` to find known vulnerabilities in third-party libraries.

### 3. Containerization
* **Build**: Docker Compose builds the fresh images for the frontend and backend using their respective `Dockerfile`s.
* **Image Security Scan**: Trivy scans the newly created Docker images for OS-level vulnerabilities (e.g., outdated Alpine packages).

### 4. Continuous Deployment (CD)
* **Deployment**: The pipeline gracefully brings down the old Docker Compose environment and brings up the new one (`docker compose down && docker compose up -d`).
* **Verification**: Basic checks are run to ensure containers are up (`docker ps`).

### 5. Notification
* The pipeline can send an email or Slack notification detailing the success or failure of the build.
