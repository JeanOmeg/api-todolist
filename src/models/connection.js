const mysql = require('mysql2/promise');
require('dotenv').config();

// Cria a conexão com o banco de dados
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DB,
});

module.exports = connection; 
