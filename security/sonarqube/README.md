# SonarQube SAST

[SonarQube](https://www.sonarsource.com/products/sonarqube/) is used for Static Application Security Testing (SAST). It analyzes source code to detect bugs, vulnerabilities, and code smells.

## Configuration
The `sonar-project.properties` file defines the project metadata and tells the `sonar-scanner` which directories to analyze and which to exclude (like `node_modules`).

## CI Integration
In a full production setup, a SonarQube server would be provisioned, and Jenkins would use the SonarQube Scanner plugin to send code analysis reports to the server during the CI pipeline.
