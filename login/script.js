const mysql = require('mysql2');

const dbHost = "localhost";
const dbUsername = "root";
const dbPassword = "Saolucas2006";
const dbName = "petsaudefeliz";

const conexao = mysql.createConnection({
  host: dbHost,
  user: dbUsername,
  password: dbPassword,
  database: dbName
});

// Conectar ao banco de dados
conexao.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conexão bem-sucedida ao banco de dados!');
});

// Você pode usar a conexão para executar consultas, etc.
