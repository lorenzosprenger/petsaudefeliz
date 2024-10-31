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
    getPetsByUserId,
    envioImgUsuario,
    buscarImagemPerfil,
    envioImgCavalo,
    buscarImagemCavalo
    
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

/**
 * @swagger
 * /users/{id}/img/perfil:
 *  put:
 *    summary: Envio de imagem de perfil do usuário
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário
 *        schema:
 *          type: integer
 *    requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *            type: object
 *            properties:
 *              img_perfil:
 *                type: string
 *                format: binary
 *                description: Imagem de perfil do usuário
 *    responses:
 *      200:
 *        description: Imagem de perfil atualizada com sucesso
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                success:
 *                  type: boolean
 *                message:
 *                  type: string
 *                data:
 *                  type: object
 */
router.put('/users/:id/img/perfil', envioImgUsuario);
/**
 * @swagger
 * /users/{id}/img/perfil:
 *  get:
 *    summary: Busca a imagem de perfil de um usuário específico
 *    description: Retorna o nome do arquivo da imagem de perfil de um usuário identificado pelo ID.
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        description: ID do usuário para buscar a imagem de perfil
 *        schema:
 *          type: integer
 *    responses:
 *      200:
 *        description: Nome do arquivo de imagem de perfil do usuário
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                imgPerfil:
 *                  type: string
 *                  description: Nome do arquivo de imagem do perfil
 *      404:
 *        description: Usuário ou imagem de perfil não encontrado
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Mensagem de erro
 *      500:
 *        description: Erro no servidor
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                error:
 *                  type: string
 *                  description: Mensagem de erro detalhada
 */
router.get('/users/:id/buscar/img/perfil', buscarImagemPerfil);

/**
 * @swagger
 * /api/pets/{idpet}/img/cavalo:
 *   put:
 *     summary: Faz o upload da imagem do cavalo para um pet específico.
 *     description: Permite que o usuário envie uma imagem do cavalo para um registro específico na tabela pet.
 *     parameters:
 *       - in: path
 *         name: idpet
 *         required: true
 *         description: ID do pet (idpet) que identifica o cavalo.
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               img_cavalo:
 *                 type: string
 *                 format: binary
 *                 description: Arquivo de imagem do cavalo a ser enviado.
 *     responses:
 *       201:
 *         description: Imagem do cavalo enviada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 data:
 *                   type: object
 *       400:
 *         description: Erro de validação ou imagem não enviada.
 *       500:
 *         description: Erro ao salvar a imagem no servidor.
 */
router.put('/pets/:idpet/img/cavalo', envioImgCavalo);

/**
 * @swagger
 * /api/pets/{idpet}/buscar/img/cavalo:
 *   get:
 *     summary: Retorna a URL da imagem do cavalo de um pet específico.
 *     description: Permite recuperar o link direto para a imagem do cavalo armazenada para um pet específico.
 *     parameters:
 *       - in: path
 *         name: idpet
 *         required: true
 *         description: ID do pet (idpet) que identifica o cavalo.
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: URL da imagem do cavalo retornada com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 imgCavalo:
 *                   type: string
 *                   description: URL completa da imagem do cavalo.
 *       404:
 *         description: Imagem do cavalo não encontrada.
 *       500:
 *         description: Erro ao buscar a imagem do cavalo no servidor.
 */
router.get('/pets/:idpet/buscar/img/cavalo', buscarImagemCavalo);



module.exports = router;
