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
            echo 'Deployment successfully Deployed.'
        }
        failure {
            echo 'Deployment failed. Please check the logs.'
        }
    }
}