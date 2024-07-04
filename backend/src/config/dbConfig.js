const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'sql10.freemysqlhosting.net',
  user: 'sql10717620',
  password: 'SewbRZrieK',
  database: 'sql10717620',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

module.exports = connection;
