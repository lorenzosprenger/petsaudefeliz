const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload'); // Middleware para upload de arquivos
require('dotenv').config();
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

const swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "API de Tarefas",
            version: "1.0.0",
            description: "API CRUD para gerenciar tarefas",
        },
        servers: [{ url: "http://localhost:3000" }],
    },
    apis: [`${__dirname}/routes/*.js`], // caminho para as rotas
};

const app = express();
const port = process.env.PORT || 1903;

app.use(express.json());
app.use(cors());
app.use(fileUpload()); // Adicionando o middleware de upload de arquivos

const usersRouter = require('./routes/usersRouter');
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/api', usersRouter);

app.listen(port, () => console.log(`Run on port ${port}!`));