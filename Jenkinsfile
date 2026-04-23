pipeline {
    agent any

    environment {
        EMAIL = "sayyabashraf354@gmail.com"
        SERVER_IP = "13.60.249.253"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Environment') {
            steps {
                echo 'Stopping old containers...'
                sh 'sudo docker compose down || true'
            }
        }

        stage('Build Application') {
            steps {
                echo 'Building application using docker-compose...'
                sh 'sudo docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                echo 'Starting application...'
                sh 'sudo docker compose up -d'
            }
        }

        stage('Verify Deployment') {
            steps {
                echo 'Checking running containers...'
                sh 'sudo docker ps'
            }
        }
    }

    post {
        success {
            emailext(
                subject: "✅ Deployment Successful - ${env.JOB_NAME}",
                body: """
Your three-tier application is deployed successfully 🚀

Frontend:
http://${SERVER_IP}/

Backend:
http://${SERVER_IP}:3000

Build Logs:
${env.BUILD_URL}
""",
                to: "${EMAIL}"
            )
        }

        failure {
            emailext(
                subject: "❌ Deployment Failed - ${env.JOB_NAME}",
                body: """
Deployment failed.

Check logs:
${env.BUILD_URL}
""",
                to: "${EMAIL}"
            )
        }
    }
}