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
    const query = 'INSERT INTO eventos(nome_usuario, lembrete, dia) VALUES (?, ?, ?)';
    const params = [
        request.body.nome_usuario,
        request.body.texto_evento,
        request.body.data_evento
    ];

    console.log('Recebendo parâmetros:', params); // Verifica se os parâmetros estão sendo recebidos

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao inserir no banco de dados:', err); // Loga o erro no console do servidor
            return response.status(500).json({
                success: false,
                message: 'Erro ao inserir evento no banco de dados.',
                error: err
            });
        }

        console.log('Resultado da inserção:', results); // Loga o resultado da query para verificar se a inserção foi bem-sucedida

        // Verifica se o evento foi inserido
        if (results.affectedRows > 0) {
            response.status(201).json({
                success: true,
                message: 'Sucesso! Evento cadastrado.',
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: 'Falha ao inserir o evento.'
            });
        }
    });
}



// Função que atualiza um evento no banco de dados
async function updateEventoCalendario(request, response) {
    const query = "UPDATE eventos SET lembrete = ?, dia = ? WHERE id_evento = ?";

    // Parâmetros para a atualização do evento
    const params = Array(
        request.body.texto_evento,  // O novo texto do evento
        request.body.data_evento,    // A nova data do evento
        request.params.id_evento     // O id do evento a ser atualizado
    );

    connection.query(query, params, (err, results) => {
        try {
            if (results.affectedRows > 0) {
                response.status(200).json({
                    success: true,
                    message: 'Evento atualizado com sucesso!',
                    data: results
                });
            } else {
                response.status(400).json({
                    success: false,
                    message: 'Não foi possível atualizar o evento. Verifique o ID fornecido.',
                    query: err?.sql,
                    sqlMessage: err?.sqlMessage
                });
            }
        } catch (e) {
            response.status(500).json({
                success: false,
                message: 'Ocorreu um erro ao tentar atualizar o evento.',
                error: e
            });
        }
    });
}

async function deleteEventoCalendario(request, response) {
    const query = "DELETE FROM eventos WHERE id_evento = ?";
    const params = [request.params.id_evento];  // O id do evento a ser excluído

    connection.query(query, params, (err, results) => {
        if (err) {
            console.error('Erro ao executar a query:', err);
            return response.status(500).json({
                success: false,
                message: 'Erro ao excluir o evento.',
                error: err
            });
        }

        // Verificando se a exclusão foi bem-sucedida
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
    // Preparar o comando de execução no banco
    const query = "UPDATE users SET `name` = ?, `email` = ?, `senha` = ? WHERE `id` = ?";

    // Recuperar os dados enviados na requisição respectivamente
    const params = Array(
        request.body.name,
        request.body.email,
        request.body.senha,
        request.params.id  // Recebimento de parametro da rota
    );

    // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
    connection.query(query, params, (err, results) => {
        try {
            if (results) {
                response
                    .status(200)
                    .json({
                        success: true,
                        message: `Sucesso! Usuário atualizado.`,
                        data: results
                    });
            } else {
                response
                    .status(400)
                    .json({
                        success: false,
                        message: `Não foi possível realizar a atualização. Verifique os dados informados`,
                        query: err.sql,
                        sqlMessage: err.sqlMessage
                    });
            }
        } catch (e) { // Caso aconteça algum erro na execução
            response.status(400).json({
                    succes: false,
                    message: "Ocorreu um erro. Não foi possível atualizar usuário!",
                    query: err.sql,
                    sqlMessage: err.sqlMessage
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

module.exports = {
    listUsers,
    cadastroPet,
    cadastroUsuario,
    eventoCalendario,
    deleteEventoCalendario,
    updateEventoCalendario,
    updateUser,
    deleteUser,

}