
pipeline {
    agent { label 'devops1-iqbal' }

    stages {
        stage('Pull SCM') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/iqbalardn/simple-apps.git'
            }
        }

        stage('Build') {
            steps {
                sh '''
                    cd apps
                    npm install
                '''
            }
        }

        stage('Testing') {
            steps {
                sh '''
                    cd apps
                    npm run test:coverage
                '''
            }
        }

        stage('Code Review') {
            steps {
                withCredentials([
                    string(
                        credentialsId: 'sonarqube-token',
                        variable: 'SONAR_TOKEN'
                    )
                ]) {
                    sh '''
                        cd apps
                        sonar-scanner
                    '''
                }
            }
        }

        stage('Deploy') {
            steps {
                sh '''
                    docker compose up --build -d
                '''
            }
        }
    }
}
