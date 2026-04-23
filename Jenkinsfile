pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                // Checkout code from repository
                checkout scm
            }
        }
        
        stage('Clean Environment') {
            steps {
                // Stop and remove old containers, networks, volumes if they exist
                script {
                    if (isUnix()) {
                        sh 'docker-compose down || true'
                    } else {
                        bat 'docker-compose down || exit 0'
                    }
                }
            }
        }

        stage('Build Image') {
            steps {
                // Build the backend Docker image and other components via compose
                script {
                    if (isUnix()) {
                        sh 'docker-compose build'
                    } else {
                        bat 'docker-compose build'
                    }
                }
            }
        }

        stage('Deploy Application') {
            steps {
                // Run docker-compose up in detached mode
                script {
                    if (isUnix()) {
                        sh 'docker-compose up -d'
                    } else {
                        bat 'docker-compose up -d'
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Application successfully deployed and running!'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}
