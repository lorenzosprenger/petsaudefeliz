/**
 INFORMAÇÕES DO CONTROLLER

 1. Executa funções assíncronas que retornam uma Promise que é resolvida com um valor de retorno;
 2. Parâmetro request (requisição): é o pedido que um cliente (usuário) realiza a nosso servidor;
 3. Parâmetro response (resposta): é a resosta que o servidor envia ao cliente (usuário);
 4. Com a variável connection que possui as configurações do banco de dados, utilizamos a função query para realizar os comandos de gerenciamento do banco de dados;
 5. Validamos o retorno da requisição, caso tenha algum erro
 6. Retornamos as informações em formato JSON com chaves e valores para o client
 7. Try/Catch: utilizado para tratar erros que podem acontecer dentro do sistema

*/

// Importa as configurações do banco de dados na variável connection
const connection = require('../config/db');

const path = require('path');
const fs = require("fs");

const uploadPath = path.join(__dirname, "..", "uploads");

// Irá criar a pasta uploads se ela já não existir
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Caminhos para as subpastas img_cavalo e img_perfil
const imgCavalo = path.join(uploadPath, "img_cavalo");
const imgPerfilPath = path.join(uploadPath, "img_perfil");

// Irá criar a pasta imgCavalos se ela já não existir
if (!fs.existsSync(imgCavalo)) {
  fs.mkdirSync(imgCavalo);
}

// Irá criar a pasta img_perfil se ela já não existir
if (!fs.existsSync(imgPerfilPath)) {
  fs.mkdirSync(imgPerfilPath);
}

// Função que retorna todos usuários no banco de dados
async function listUsers(request, response) {
    // Preparar o comando de execução no banco
    connection.query('SELECT id, name, email, senha FROM usuarios', (err, results) => { 
        try {  // Tenta retornar as solicitações requisitadas
            if (results) {  // Se tiver conteúdo 
                response.status(200).json({
                    success: true,
                    message: 'Retorno de usuarios com sucesso!',
                    data: results
                });
            } else {  // Retorno com informações de erros
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível retornar os usuários.`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) {  // Caso aconteça qualquer erro no processo na requisição, retorna uma mensagem amigável
            response.status(400).json({
                succes: false,
                message: "Ocorreu um erro. Não foi possível realizar sua requisição!",
                query: err.sql,
                sqlMessage: err.sqlMessage
            })
        }   
    });
}

// Função que cria um novo usuário 
async function cadastroUsuario(request, response) {
    // Preparar o comando de execução no banco
    const query = 'INSERT INTO usuarios(name, email, senha) VALUES(?, ?, ?);';

    // Recuperar os dados enviados na requisição
    const params = Array(
        request.body.name,
        request.body.email,
        request.body.senha
        
    );

    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário cadastrado.`,
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar o cadastro. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                    succes: false,
                    message: "Ocorreu um erro. Não foi possível cadastrar usuário!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

async function eventoCalendario(request, response) {
    // Preparar o comando de execução no banco
    const query = 'INSERT INTO eventos(lembrete, dia, usuario_id) VALUES (?,?,?)';

    // Recuperar os dados enviados na requisição
    const params = Array(
        request.body.texto_evento,
        request.body.data_evento,
        request.body.usuario_id

    );


    console.log(params)
    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso! Evento cadastrado.`,
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar o cadastro do Evento. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                    succes: false,
                    message: "Ocorreu um erro. Não foi possível cadastrar o Evento!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}



// Função que atualiza um evento no banco de dados
async function carregarEventos(request, response) {
    const query = 'SELECT id_evento, lembrete, dia FROM eventos'; // Inclua o id_evento para permitir a exclusão
    connection.query(query, (err, results) => {
        if (err) {
            return response.status(500).json({ success: false, message: 'Erro ao carregar eventos', error: err });
        }
        response.status(200).json({ success: true, data: results }); // Retorna os eventos em formato JSON
    });
}



// Função que exclui um evento do banco de dados
async function deleteEventoCalendario(request, response) {
    const query = "DELETE FROM eventos WHERE id_evento = ?";
    const params = [request.params.id_evento];  // O id do evento a ser excluído

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao excluir o evento:', err);
            return response.status(500).json({
                success: false,
                message: 'Erro ao excluir o evento no banco de dados.',
                error: err
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: 'Evento excluído com sucesso!'
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Evento não encontrado ou falha ao excluir.'
            });
        }
    });
}



// Função que cria um novo pet 
async function cadastroPet(request, response) {
    // Preparar o comando de execução no banco
    const getAgeCategory = (birthDateString) => {
        const today = new Date();
        const birthDate = new Date(birthDateString);
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        if (age <= 4) {
            return 'Jovem';
        } else if (age <= 15) {
            return 'Adulto';
        } else {
            return 'Idoso';
        }
    };

    const query = 'INSERT INTO pet( nome, raca, data_nasc, genero, peso, nivel_atv, usuario_id) VALUES( ?, ?, ?, ?, ?, ?, ?);';
    
    // Recuperar os dados enviados na requisição
    const params = Array(
        request.body.nome,
        request.body.raca,
        request.body.data_nasc,
        request.body.genero,
        request.body.peso,
        request.body.nivel_atv,
        request.body.usuario_id
    );

    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(201)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário cadastrado.`,
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar o cadastro. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                    succes: false,
                    message: "Ocorreu um erro. Não foi possível cadastrar usuário!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

// Função que atualiza o usuário no banco
async function updateUser(request, response) {
    const { name, email, senha } = request.body;

    // Preparar a query SQL dinamicamente se a senha foi alterada
    let query = 'UPDATE usuarios SET `name` = ?, `email` = ?';
    const params = [name, email];

    if (senha) {
        query += ', `senha` = ?';
        params.push(senha);
    }

    query += ' WHERE `id` = ?';
    params.push(request.params.id);  // ID do usuário da rota

    // Executar a query
    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro na atualização do usuário:', err);
            console.log('Query SQL executada:', query);  // Log da query para debugar
            console.log('Parâmetros usados:', params);   // Log dos parâmetros
            return response.status(500).json({
                success: false,
                message: 'Erro ao atualizar usuário',
                error: err.message // Mensagem de erro amigável
            });
        }

        if (results.affectedRows > 0) {
            response.status(200).json({
                success: true,
                message: 'Sucesso! Usuário atualizado.'
            });
        } else {
            response.status(404).json({
                success: false,
                message: 'Usuário não encontrado.'
            });
        }
    });
}



// Função que remove usuário no banco
async function deleteUser(request, response) {
    // Preparar o comando de execução no banco
    const query = "DELETE FROM users WHERE `id_user` = ?";

    // Recebimento de parametro da rota
    const params = Array(
        request.params.id
    );

    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário deletado.`,
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar a remoção. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                    succes: false,
                    message: "Ocorreu um erro. Não foi possível deletar usuário!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
                });
        }
    });
}

// Função que busca todos os pets do usuário
async function getPetsByUserId(request, response) {
    const userId = request.params.id;  // O ID do usuário é passado como parâmetro na rota

    const query = 'SELECT nome, raca, data_nasc, genero, peso, nivel_atv FROM pet WHERE usuario_id = ?';  // Comando SQL para buscar os pets do usuário

    // Executa a consulta no banco de dados
    connection.query(query, [userId], (err, results) => {
        try {
            if (results && results.length > 0) {
                response.status(200).json({
                    success: true,
                    message: `Pets do usuário ${userId} retornados com sucesso!`,
                    pets: results  // Retorna a lista de pets no JSON
                });
            } else {
                response.status(404).json({
                    success: false,
                    message: `Nenhum pet encontrado para o usuário ${userId}.`
                });
            }
        } catch (e) {
            response.status(500).json({
                success: false,
                message: 'Ocorreu um erro ao buscar os pets do usuário.',
                error: e
            });
        }
    });
}

// Função envioImgUsuario com verificação para request.files
async function envioImgUsuario(request, response) {
    // Verifica se a imagem foi enviada
    if (!request.files || !request.files.img_perfil) {
        return response.status(400).json({
            success: false,
            message: "Nenhum arquivo enviado. Por favor, envie uma imagem com o campo 'img_perfil'."
        });
    }

    const img_perfil = request.files.img_perfil;
    const imgPerfilNome = Date.now() + path.extname(img_perfil.name); // Nome único para o arquivo
    const imgPerfilPath = path.join(__dirname, "..", "uploads", "img_perfil");

    // Move o arquivo para o diretório de upload
    img_perfil.mv(path.join(imgPerfilPath, imgPerfilNome), (erro) => {
        if (erro) {
            return response.status(500).json({
                success: false,
                message: "Erro ao mover o arquivo.",
                error: erro.message
            });
        }

        // Atualiza o caminho da imagem no banco de dados
        const params = [imgPerfilNome, request.params.id];
        const query = "UPDATE `usuarios` SET `img_perfil` = ? WHERE `id` = ?;";

        connection.query(query, params, (err, results) => {
            if (err) {
                return response.status(500).json({
                    success: false,
                    message: "Erro ao atualizar o banco de dados.",
                    error: err.message
                });
            }

            response.status(200).json({
                success: true,
                message: "Imagem de perfil atualizada com sucesso.",
                data: results
            });
        });
    });
}

module.exports = {
    listUsers,
    cadastroPet,
    cadastroUsuario,
    eventoCalendario,
    deleteEventoCalendario,
    carregarEventos,
    updateUser,
    deleteUser,
    getPetsByUserId,
    envioImgUsuario

}