
pipeline {
    agent { label 'devops1-iqbal' }

    stages {
        stage('Pull SCM to Server') {
            steps {
                git branch: 'main',
                    url: 'https://github.com/iqbalardn/simple-apps.git'
            }
        }

        stage('Build Image Docker') {
            steps {
                sh '''
                    cd apps
                    npm install
                '''
            }
        }

        stage('Testing Image with Jest') {
            steps {
                sh '''
                    cd apps
                    npm run test:coverage
                '''
            }
        }

        stage('Code Review with SonarQube') {
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

        stage('Deploy Docker Compose to Server') {
            steps {
                sh '''
                    docker compose up --build -d
                '''
            }
        }
    }
}
