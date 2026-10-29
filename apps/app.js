
const express = require('express');
const app = express();
const path = require('path');
require('dotenv').config();

// Import Middleware
const logger = require('./middleware/logger');
app.use(logger);

const connection = require('./middleware/db_connect');

// Dashboard
app.use('/', express.static(path.join(__dirname, 'public')));

// App 1
app.get('/app1', (req, res) => {
  res.send('Hello this Apps 1!');
});

// App 2
app.get('/app2', (req, res) => {
  res.send('Hello this App 2!');
});

// Users
app.get('/users', (req, res) => {
  const sql = 'SELECT * FROM tb_data ORDER BY id DESC';

  connection.query(sql, (error, results) => {
    if (error) {
      console.error('Database query failed:', error);
      return res.status(500).send('Database query failed');
    }

    res.send(results);
  });
});

// Start Server
const port = process.env.APP_PORT || 3000;

if (require.main === module) {
  app.listen(port, '0.0.0.0', () => {
    console.log(`Example app listening on port ${port}`);
  });
}

module.exports = app;
