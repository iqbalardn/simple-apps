# Create env variable

```
vim .env
```

```
DB_NAME=training
DB_HOST=ipaddress
DB_USER=peserta
DB_PASS=password
APP_PORT=3000
```

sonar-scanner-npm \
  -Dsonar.host.url=http://172.23.13.88:9000 \
  -Dsonar.token=sqp_2f89d547eb8451f89a15ee67603bf0c5757daab1 \
  -Dsonar.projectKey=simple-apps