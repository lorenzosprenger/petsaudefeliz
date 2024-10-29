// Módulo de configuração da webapi, módulo de aplicação

// Importar o pacote express (servidor)
const express = require('express');
// Responsável por lidar com requisições externas
const cors = require('cors');
// Importar as rotas para serem executadas na aplicação
const router = require('./routes/usersRouter');
// Importar o pacote dotenv, gerenciador de variáveis de ambiente
const dotenv = require('dotenv').config();

const path = require("path");
const fileUpload = require("express-fileupload");

// Instanciar o express na variável app
const app = express();

// Setar a porta do servidor, a parir do arquivo .env
app.set('port', process.env.PORT || 1903);
// Habilitar o recebimento de requests em formato JSON
app.use(cors())
// Habilitar o recebimento de requests em formato JSON
app.use(express.json());

app.use(fileUpload());

// Habilitar o upload de arquivos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Habilitar as rotas na aplicação
app.use('/api', router);

module.exports = app;