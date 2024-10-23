/**
 * INFORMAÇÕES DO ROUTER
 * 
 * Uma rota em uma API é um “caminho” que será “chamado” por uma aplicação ou cliente e responderá alguma informação. 
 * Cada rota pode ter uma ou mais funções, e ela deve ser única na API com o seu método HTTP definido, 
 * ao receber uma chamada ela faz todo o processamento necessário para retornar os dados que foi solicitado.
 */

// Importar o modulo de Router do express
const { Router } = require('express');

// Instanciar o Router na variável router
const router = Router();

// Importar as funções (processamento da requisição) do controller
const { 
    listUsers,
    cadastroPet,
    cadastroUsuario,
    updateUser,
    deleteUser,
    eventoCalendario,
    carregarEventos,  
    deleteEventoCalendario,
    getPetsByUserId
} = require('../controller/usersController')

/**
 * @swagger
 * /users/listUsers:
 *  get:
 *    summary: Retorna todos os usuários
 *    responses:
 *      200:
 *        description: Uma lista de usuários
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.get('/users/listUsers', listUsers);

/**
 * @swagger
 * /users/pet:
 *  post:
 *    summary: Cadastra um novo pet
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post('/users/pet', cadastroPet);

/**
 * @swagger
 * /users/usuario:
 *  post:
 *    summary: Cadastra um novo usuário
 *    responses:
 *      200:
 *        description: Sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post('/users/usuario', cadastroUsuario);

/**
 * @swagger
 * /users/calendario:
 *  post:
 *    summary: Adiciona um evento ao calendário
 *    responses:
 *      200:
 *        description: Evento cadastrado com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.post('/users/calendario', eventoCalendario);

/**
 * @swagger
 * /users/calendario/get:
 *  get:
 *    summary: Carrega todos os eventos do calendário
 *    responses:
 *      200:
 *        description: Lista de eventos
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.get('/users/calendario/get', carregarEventos);

/**
 * @swagger
 * /users/calendario/{id_evento}:
 *  delete:
 *    summary: Remove um evento do calendário pelo ID
 *    parameters:
 *      - in: path
 *        name: id_evento
 *        required: true
 *        description: ID do evento a ser removido
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Evento removido com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.delete('/users/calendario/:id_evento', deleteEventoCalendario);

/**
 * @swagger
 * /user/{id}:
 *  put:
 *    summary: Atualiza um usuário pelo ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário a ser atualizado
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Usuário atualizado com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.put('/user/:id', updateUser);

/**
 * @swagger
 * /user/{id}/delete:
 *  delete:
 *    summary: Remove um usuário pelo ID
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário a ser removido
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Usuário removido com sucesso!
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 */
router.delete('/user/:id/delete', deleteUser);

/**
 * @swagger
 * /users/{id}/pets:
 *  get:
 *    summary: Retorna todos os pets de um usuário específico
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Lista de pets do usuário
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 */
router.get('/users/:id/pets', getPetsByUserId);

module.exports = router;
