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

const connection = require("../config/db");
const dotenv = require("dotenv").config();

const fs = require("fs");
const path = require("path");

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
  connection.query(
    "SELECT id, name, email, senha FROM usuarios",
    (err, results) => {
      try {
        // Tenta retornar as solicitações requisitadas
        if (results) {
          // Se tiver conteúdo
          response.status(200).json({
            success: true,
            message: "Retorno de usuarios com sucesso!",
            data: results,
          });
        } else {
          // Retorno com informações de erros
          response.status(400).json({
            success: false,
            message: `Não foi possível retornar os usuários.`,
            query: err.sql,
            sqlMessage: err.sqlMessage,
          });
        }
      } catch (e) {
        // Caso aconteça qualquer erro no processo na requisição, retorna uma mensagem amigável
        response.status(400).json({
          succes: false,
          message: "Ocorreu um erro. Não foi possível realizar sua requisição!",
          query: err.sql,
          sqlMessage: err.sqlMessage,
        });
      }
    }
  );
}

// Função que cria um novo usuário
async function cadastroUsuario(request, response) {
  const { name, email, senha } = request.body;
  let img_perfil;

  // Verifica se uma imagem foi enviada; caso contrário, define a imagem padrão
  if (request.files && request.files.img_perfil && request.files.img_perfil !== "default") {
      const imgFile = request.files.img_perfil;
      img_perfil = Date.now() + path.extname(imgFile.name); // Nome único para a imagem

      // Move a imagem para o diretório 'uploads/img_perfil'
      const imgPath = path.join(__dirname, '..', 'uploads', 'img_perfil', img_perfil);
      imgFile.mv(imgPath, (err) => {
          if (err) {
              return response.status(500).json({
                  success: false,
                  message: "Erro ao salvar imagem de perfil!",
                  error: err.message
              });
          }
      });
  } else {
      // Define a imagem padrão quando o usuário não faz upload de uma imagem
      img_perfil = 'Imagem Perfil Usuário 2.png'; // Nome da imagem padrão
  }

  // Executa a query para inserir o usuário no banco de dados com o nome da imagem
  const query = "INSERT INTO usuarios (name, email, senha, img_perfil) VALUES (?, ?, ?, ?)";
  const params = [name, email, senha, img_perfil];

  connection.query(query, params, (err, results) => {
      if (err) {
          return response.status(400).json({
              success: false,
              message: "Erro ao cadastrar usuário",
              error: err
          });
      }
      response.status(201).json({
          success: true,
          message: "Usuário cadastrado com sucesso!",
          data: results
      });
  });
}

 


async function eventoCalendario(request, response) {
  // Preparar o comando de execução no banco
  const query = "INSERT INTO eventos(lembrete, dia, usuario_id) VALUES (?,?,?)";

  // Recuperar os dados enviados na requisição
  const params = Array(
    request.body.texto_evento,
    request.body.data_evento,
    request.body.usuario_id
  );

  console.log(params);
  // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
  connection.query(query, params, (err, results) => {
    try {
      if (results) {
        response.status(201).json({
          success: true,
          message: `Sucesso! Evento cadastrado.`,
          data: results,
        });
      } else {
        response.status(400).json({
          success: false,
          message: `Não foi possível realizar o cadastro do Evento. Verifique os dados informados`,
          query: err.sql,
          sqlMessage: err.sqlMessage,
        });
      }
    } catch (e) {
      // Caso aconteça algum erro na execução
      response.status(400).json({
        succes: false,
        message: "Ocorreu um erro. Não foi possível cadastrar o Evento!",
        query: err.sql,
        sqlMessage: err.sqlMessage,
      });
    }
  });
}

// Função que atualiza um evento no banco de dados
async function carregarEventos(request, response) {
  const query = "SELECT id_evento, lembrete, dia FROM eventos"; // Inclua o id_evento para permitir a exclusão
  connection.query(query, (err, results) => {
    if (err) {
      return response.status(500).json({
        success: false,
        message: "Erro ao carregar eventos",
        error: err,
      });
    }
    response.status(200).json({ success: true, data: results }); // Retorna os eventos em formato JSON
  });
}

// Função que exclui um evento do banco de dados
async function deleteEventoCalendario(request, response) {
  const query = "DELETE FROM eventos WHERE id_evento = ?";
  const params = [request.params.id_evento]; // O id do evento a ser excluído

  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro ao excluir o evento:", err);
      return response.status(500).json({
        success: false,
        message: "Erro ao excluir o evento no banco de dados.",
        error: err,
      });
    }

    if (results.affectedRows > 0) {
      response.status(200).json({
        success: true,
        message: "Evento excluído com sucesso!",
      });
    } else {
      response.status(400).json({
        success: false,
        message: "Evento não encontrado ou falha ao excluir.",
      });
    }
  });
}

async function cadastroPet(request, response) {
    const { nome, raca, data_nasc, genero, peso, nivel_atv, usuario_id } = request.body;
    let img_cavalo;

    // Verificar se uma imagem foi enviada; se não, usar uma imagem padrão
    if (request.files && request.files.img_cavalo) {
        const imgFile = request.files.img_cavalo;
        img_cavalo = Date.now() + path.extname(imgFile.name); // Nome único para o arquivo

        // Mover o arquivo para o diretório de upload
        imgFile.mv(path.join(imgCavalo, img_cavalo), (erro) => {
            if (erro) {
                return response.status(500).json({
                    success: false,
                    message: "Erro ao salvar imagem do cavalo!",
                    error: erro.message,
                });
            }
        });
    } else {
        // Se não houver imagem, definir uma imagem padrão com base na raça
        const imgPadrao = {
            "Crioulo": "Crioulo.png",
            "Quarter Horse": "QuarterHorse.png",
            "Mangalarga": "Mangalarga.png"
        };
        img_cavalo = imgPadrao[raca] || "default.png";
    }

    const query = "INSERT INTO pet (nome, raca, data_nasc, genero, peso, nivel_atv, usuario_id, img_cavalo) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
    const params = [nome, raca, data_nasc, genero, peso, nivel_atv, usuario_id, img_cavalo];

    // Executa a query para inserir o cavalo no banco de dados
    connection.query(query, params, (err, results) => {
        if (results) {
            response.status(201).json({
                success: true,
                message: "Sucesso! Pet cadastrado.",
                data: results
            });
        } else {
            response.status(400).json({
                success: false,
                message: "Não foi possível realizar o cadastro. Verifique os dados informados",
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
  let query = "UPDATE usuarios SET `name` = ?, `email` = ?";
  const params = [name, email];

  if (senha) {
    query += ", `senha` = ?";
    params.push(senha);
  }

  query += " WHERE `id` = ?";
  params.push(request.params.id); // ID do usuário da rota

  // Executar a query
  connection.query(query, params, (err, results) => {
    if (err) {
      console.error("Erro na atualização do usuário:", err);
      console.log("Query SQL executada:", query); // Log da query para debugar
      console.log("Parâmetros usados:", params); // Log dos parâmetros
      return response.status(500).json({
        success: false,
        message: "Erro ao atualizar usuário",
        error: err.message, // Mensagem de erro amigável
      });
    }

    if (results.affectedRows > 0) {
      response.status(200).json({
        success: true,
        message: "Sucesso! Usuário atualizado.",
      });
    } else {
      response.status(404).json({
        success: false,
        message: "Usuário não encontrado.",
      });
    }
  });
}

// Função que remove usuário no banco
async function deleteUser(request, response) {
  // Preparar o comando de execução no banco
  const query = "DELETE FROM users WHERE `id_user` = ?";

  // Recebimento de parametro da rota
  const params = Array(request.params.id);

  // Executa a ação no banco e valida os retornos para o client que realizou a solicitação
  connection.query(query, params, (err, results) => {
    try {
      if (results) {
        response.status(200).json({
          success: true,
          message: `Sucesso! Usuário deletado.`,
          data: results,
        });
      } else {
        response.status(400).json({
          success: false,
          message: `Não foi possível realizar a remoção. Verifique os dados informados`,
          query: err.sql,
          sqlMessage: err.sqlMessage,
        });
      }
    } catch (e) {
      // Caso aconteça algum erro na execução
      response.status(400).json({
        succes: false,
        message: "Ocorreu um erro. Não foi possível deletar usuário!",
        query: err.sql,
        sqlMessage: err.sqlMessage,
      });
    }
  });
}

// Função que busca todos os pets do usuário
async function getPetsByUserId(request, response) {
  const userId = request.params.id; // O ID do usuário é passado como parâmetro na rota

  const query =
    "SELECT * FROM pet WHERE usuario_id = ?"; // Comando SQL para buscar os pets do usuário

  // Executa a consulta no banco de dados
  connection.query(query, [userId], (err, results) => {
    try {
      if (results && results.length > 0) {
        response.status(200).json({
          success: true,
          message: `Pets do usuário ${userId} retornados com sucesso!`,
          pets: results, // Retorna a lista de pets no JSON
        });
      } else {
        response.status(404).json({
          success: false,
          message: `Nenhum pet encontrado para o usuário ${userId}.`,
        });
      }
    } catch (e) {
      response.status(500).json({
        success: false,
        message: "Ocorreu um erro ao buscar os pets do usuário.",
        error: e,
      });
    }
  });
}

// Função envioImgUsuario com verificação para request.files
async function envioImgUsuario(request, response) {
  if (!request.files.img_perfil) { 
    // Adiciona verificação específica para 'img_perfil'
    return response.status(400).json({
      success: false,
      message: "Arquivo de imagem não enviado!",
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
        message: "Erro ao salvar imagem de perfil!",
        error: erro.message,
      });
    } else {
      // Atualiza o caminho da imagem no banco de dados
      const params = [imgPerfilNome, request.params.id];
      const query = "UPDATE `usuarios` SET `img_perfil` = ? WHERE `id` = ?;";

      connection.query(query, params, (err, results) => {
        if (results) {
          response.status(201).json({
            success: true,
            message: "Imagem de perfil atualizada com sucesso!",
            data: results,
          });
        } else {
          response.status(400).json({
            success: false,
            message: "Erro ao atualizar dados no banco!",
            data: err,
          });
        }
      });
    }
  });
}



// Função para buscar a imagem de perfil do usuário
async function buscarImagemPerfil(req, res) {
    const userId = req.params.id;

    connection.query(
        'SELECT img_perfil FROM usuarios WHERE id = ?',
        [userId],
        (error, results) => {
            if (error) {
                console.error("Erro ao buscar imagem de perfil:", error.message);
                return res.status(500).json({ error: 'Erro ao buscar imagem de perfil no servidor' });
            }

            if (!results || results.length === 0) {
                return res.status(404).json({ error: 'Imagem de perfil não encontrada' });
            }

            // Obter o nome do arquivo de imagem
            const imgPerfil = results[0].img_perfil;

            // Construir a URL completa da imagem
            const imgPerfilUrl = `${imgPerfil}`;

            console.log("Imagem de perfil encontrada:", imgPerfilUrl);

            // Retornar a URL completa da imagem
            res.json({ imgPerfil: imgPerfilUrl });
        }
    );
}


// Função para enviar a imagem do cavalo (endpoint PUT /api/pets/:idpet/img/cavalo)
async function envioImgCavalo(request, response) {
    const idpet = request.params.idpet;

    if (!request.files || !request.files.img_cavalo) {
        return response.status(400).json({
            success: false,
            message: "Arquivo de imagem do cavalo não enviado!",
        });
    }

    const img_cavalo = request.files.img_cavalo;
    const imgCavaloNome = Date.now() + path.extname(img_cavalo.name); // Nome único para o arquivo
    const imgCavaloPath = path.join(imgCavalo, imgCavaloNome);

    // Move o arquivo para o diretório de upload
    img_cavalo.mv(imgCavaloPath, (erro) => {
        if (erro) {
            return response.status(500).json({
                success: false,
                message: "Erro ao salvar imagem do cavalo!",
                error: erro.message,
            });
        } else {
            // Atualiza o caminho da imagem no banco de dados
            const query = "UPDATE pet SET img_cavalo = ? WHERE idpet = ?";
            const params = [imgCavaloNome, idpet];

            connection.query(query, params, (err, results) => {
                if (err) {
                    return response.status(400).json({
                        success: false,
                        message: "Erro ao atualizar dados no banco!",
                        data: err,
                    });
                }
                response.status(201).json({
                    success: true,
                    message: "Imagem do cavalo atualizada com sucesso!",
                    data: results,
                });
            });
        }
    });
}



// Função para buscar a imagem do cavalo
async function buscarImagemCavalo(req, res) {
  console.log("Função buscarImagemCavalo chamada."); // Log para confirmar chamada da função
  const idpet = req.params.idpet;
  console.log("ID do pet recebido:", idpet); // Log do ID do pet

  connection.query(
      'SELECT img_cavalo FROM pet WHERE idpet = ?',
      [idpet],
      (error, results) => {
          if (error) {
              console.error("Erro ao buscar imagem do cavalo:", error.message);
              return res.status(500).json({ error: 'Erro ao buscar imagem do cavalo no servidor' });
          }

          console.log("Resultado da consulta ao banco de dados:", results); // Log do resultado da consulta

          if (!results || results.length === 0 || !results[0].img_cavalo) {
              console.warn(`Imagem do cavalo não encontrada para o pet com id ${idpet}`);
              return res.status(404).json({ error: 'Imagem do cavalo não encontrada' });
          }

          const imgCavalo = results[0].img_cavalo;
          const imgCavaloPath = path.join(__dirname, "..", "uploads", "img_cavalo", imgCavalo);

          console.log("Caminho completo da imagem do cavalo:", imgCavaloPath); // Log do caminho completo do arquivo

          fs.access(imgCavaloPath, fs.constants.F_OK, (err) => {
              if (err) {
                  console.warn(`Arquivo de imagem do cavalo não encontrado no caminho ${imgCavaloPath}`);
                  return res.status(404).json({ error: 'Arquivo de imagem do cavalo não encontrado no servidor' });
              }

              const imgCavaloUrl = imgCavalo;
              console.log("Imagem do cavalo encontrada:", imgCavaloUrl); // Log da URL completa da imagem
              res.json({ imgCavalo: imgCavaloUrl });
          });
      }
  );
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
  envioImgUsuario,
  buscarImagemPerfil,
  envioImgCavalo,
  buscarImagemCavalo
  
};