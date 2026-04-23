pipeline {
    agent any

    environment {
        CONTAINER_NAME = "nestjs-app"
        IMAGE_NAME = "nesths-image"
        EMAIL = "sayyabashraf354@gmail.com"
        SERVER_IP = "13.60.249.253"
        PORT = "3000"
    }

    stages {

        stage('Clean Workspace') {
            steps {
                echo 'Cleaning workspace...'
                deleteDir()
            }
        }

        stage('Clone Repo') {
            steps {
                echo 'Cloning repository...'
                git branch: 'main', url: 'https://github.com/sayyab2040/CI-CD-pipeline-Using-Jenkins-Github-Webhook-.git'
            }
        }

        stage('Build Docker Image') {
            steps {
                echo 'Building Docker Image...'
                sh 'docker build -t $IMAGE_NAME .'
            }
        }

        stage('Stop Old Container') {
            steps {
                echo 'Stopping old container if exists...'
                sh '''
                docker stop $CONTAINER_NAME || true
                docker rm $CONTAINER_NAME || true
                '''
            }
        }

        stage('Run Docker Container') {
            steps {
                echo 'Running new container...'
                sh '''
                docker run -d -p $PORT:$PORT --name $CONTAINER_NAME $IMAGE_NAME
                '''
            }
        }
    }

    post {

        success {
            emailext(
                subject: "✅ Deployment Successful - ${env.JOB_NAME}",
                body: """
Your application has been deployed successfully 🚀

Frontend URL:
http://${SERVER_IP}/

Backend API:
http://${SERVER_IP}:${PORT}/

Build Details:
${env.BUILD_URL}

Thank you,
Jenkins CI/CD Pipeline
""",
                to: "${EMAIL}"
            )
        }

        failure {
            emailext(
                subject: "❌ Deployment Failed - ${env.JOB_NAME}",
                body: """
Deployment failed ❌

Check logs here:
${env.BUILD_URL}

""",
                to: "${EMAIL}"
            )
        }
    }
}