post {
    success {
        emailext(
            subject: "Jenkins Build Success: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
Build succeeded.

Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Frontend URL:
http://13.60.96.200
""",
            to: 'sayyabashraf354@gmail.com'
        )
    }

    failure {
        emailext(
            subject: "Jenkins Build Failed: ${env.JOB_NAME} #${env.BUILD_NUMBER}",
            body: """
Build failed.

Job: ${env.JOB_NAME}
Build Number: ${env.BUILD_NUMBER}
Build URL: ${env.BUILD_URL}

Please check Jenkins console output.
""",
            to: 'sayyabashraf354@gmail.com'
        )
    }
}