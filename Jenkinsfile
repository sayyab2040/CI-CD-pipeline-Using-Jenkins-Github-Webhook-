pipeline {
    agent any

    environment {
        EMAIL = 'sayyabashraf354@gmail.com'
        FRONTEND_URL = ''
        BACKEND_URL = ''
        JENKINS_URL = ''
        GRAFANA_URL = ''
        PROMETHEUS_URL = ''
        SONARQUBE_URL = ''
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                echo "Code checkout complete."
            }
        }

        stage('Get Current EC2 IP') {
            steps {
                script {
                    env.SERVER_IP = sh(
                        script: 'curl -s ifconfig.me',
                        returnStdout: true
                    ).trim()

                    env.FRONTEND_URL = "http://${env.SERVER_IP}/"
                    env.BACKEND_URL = "http://${env.SERVER_IP}:5000"
                    env.JENKINS_URL = "http://${env.SERVER_IP}:8080"
                    env.GRAFANA_URL = "http://${env.SERVER_IP}:3000"
                    env.PROMETHEUS_URL = "http://${env.SERVER_IP}:9090"
                    env.SONARQUBE_URL = "http://${env.SERVER_IP}:9000"

                    echo "Current EC2 Public IP is: ${env.SERVER_IP}"
                }
            }
        }

        stage('Check Required Tools') {
            steps {
                echo "Checking required DevOps tools..."
                sh 'git --version'
                sh 'docker --version'
                sh 'docker compose version'
                sh 'node -v'
                sh 'npm -v'
                sh 'trivy --version || true'
            }
        }

        stage('Install Backend Dependencies and Test') {
            steps {
                dir('app/backend') {
                    echo "Installing backend dependencies..."
                    sh 'npm install'

                    echo "Running backend test placeholder..."
                    sh 'npm run test'
                }
            }
        }

        stage('Security Scan - Trivy Filesystem') {
            steps {
                echo "Running Trivy filesystem scan for source code and dependencies..."

                sh '''
                    mkdir -p security/reports

                    if command -v trivy >/dev/null 2>&1; then
                        trivy fs . \
                        --severity HIGH,CRITICAL \
                        --format table \
                        --output security/reports/trivy-filesystem-report.txt || true

                        cat security/reports/trivy-filesystem-report.txt || true
                    else
                        echo "Trivy is not installed on this EC2 machine."
                        echo "Install using: sudo apt install trivy -y"
                    fi
                '''
            }
        }

        stage('Code Quality Scan - SonarQube') {
            steps {
                echo "Running SonarQube code quality scan..."

                withCredentials([string(credentialsId: 'sonar-token', variable: 'SONAR_TOKEN')]) {
                    sh '''
                        docker run --rm \
                        --network host \
                        -e SONAR_HOST_URL="http://localhost:9000" \
                        -e SONAR_TOKEN="$SONAR_TOKEN" \
                        -v "$WORKSPACE:/usr/src" \
                        sonarsource/sonar-scanner-cli
                    '''
                }
            }
        }

        stage('Clean Old App Containers') {
            steps {
                dir('docker') {
                    echo "Stopping old application containers..."
                    sh 'docker compose down || true'
                }
            }
        }

        stage('Build and Deploy App') {
            steps {
                dir('docker') {
                    echo "Building and deploying three-tier login application..."
                    sh 'docker compose up --build -d'
                }
            }
        }

        stage('Security Scan - Docker Images') {
            steps {
                echo "Running Trivy Docker image scan..."

                sh '''
                    mkdir -p security/reports

                    if command -v trivy >/dev/null 2>&1; then
                        trivy image docker-backend:latest \
                        --severity HIGH,CRITICAL \
                        --format table \
                        --output security/reports/trivy-backend-image-report.txt || true

                        trivy image docker-frontend:latest \
                        --severity HIGH,CRITICAL \
                        --format table \
                        --output security/reports/trivy-frontend-image-report.txt || true

                        echo "Backend image scan report:"
                        cat security/reports/trivy-backend-image-report.txt || true

                        echo "Frontend image scan report:"
                        cat security/reports/trivy-frontend-image-report.txt || true
                    else
                        echo "Trivy is not installed. Skipping Docker image scan."
                    fi
                '''
            }
        }

        stage('Verify App Containers') {
            steps {
                echo "Checking running Docker containers..."
                sh 'docker ps'

                dir('docker') {
                    sh 'docker compose ps'
                }
            }
        }

        stage('Verify Application URLs') {
            steps {
                echo "Checking frontend and backend URLs..."

                sh '''
                    echo "Checking frontend..."
                    curl -I http://localhost || true

                    echo "Checking backend root..."
                    curl -s http://localhost:5000 || true

                    echo "Checking backend health..."
                    curl -s http://localhost:5000/health || true
                '''
            }
        }

        stage('Verify Monitoring and Security Services') {
            steps {
                echo "Checking EC2 installed monitoring and security services..."

                sh 'systemctl is-active prometheus || true'
                sh 'systemctl is-active grafana-server || true'
                sh 'systemctl is-active node_exporter || true'

                echo "Checking Prometheus, Grafana, Node Exporter and SonarQube ports..."
                sh '''
                    curl -I http://localhost:9090 || true
                    curl -I http://localhost:3000 || true
                    curl -I http://localhost:9000 || true
                    curl -s http://localhost:9100/metrics | head || true
                '''
            }
        }

        stage('Archive Security Reports') {
            steps {
                echo "Archiving security reports..."
                archiveArtifacts artifacts: 'security/reports/*.txt', allowEmptyArchive: true
            }
        }
    }

    post {
        success {
            emailext(
                subject: "Deployment Successful - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Your Jenkins CI/CD pipeline completed successfully.

Application URLs:

Frontend:
${env.FRONTEND_URL}

Backend:
${env.BACKEND_URL}

Backend Health:
${env.BACKEND_URL}/health

Jenkins:
${env.JENKINS_URL}

Grafana:
${env.GRAFANA_URL}

Prometheus:
${env.PROMETHEUS_URL}

SonarQube:
${env.SONARQUBE_URL}

Security:
Trivy filesystem scan, Trivy Docker image scan, and SonarQube code quality scan stages executed.
Security reports are archived in Jenkins build artifacts.

Build Logs:
${env.BUILD_URL}

Regards,
Jenkins CI/CD Pipeline
""",
                to: "${env.EMAIL}"
            )
        }

        failure {
            emailext(
                subject: "Deployment Failed - ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                body: """
Your Jenkins CI/CD pipeline failed.

Check console logs:
${env.BUILD_URL}

Regards,
Jenkins CI/CD Pipeline
""",
                to: "${env.EMAIL}"
            )
        }
    }
}