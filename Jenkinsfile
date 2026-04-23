pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Clean Environment') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Image') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Deploy Application') {
            steps {
                sh 'docker compose up -d'
            }
        }
    }

    post {
        success {
            emailext(
                subject: "Build Success: ${env.JOB_NAME}",
                body: """
Deployment successful!

Frontend:
http://13.60.96.200

Backend:
http://13.60.96.200:3000
""",
                to: 'sayyabashraf354@gmail.com'
            )
        }

        failure {
            emailext(
                subject: "Build Failed: ${env.JOB_NAME}",
                body: "Check Jenkins logs: ${env.BUILD_URL}",
                to: 'sayyabashraf354@gmail.com'
            )
        }
    }
}