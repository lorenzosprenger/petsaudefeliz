// Importa o módulo 'express' para criar o servidor
const express = require('express');

// Importa o módulo 'cors' para permitir o compartilhamento de recursos entre diferentes origens
const cors = require('cors');

// Importa o módulo 'multer' para lidar com uploads de arquivos
const multer = require('multer');

// Importa o módulo 'path' para trabalhar com caminhos de arquivos e diretórios
const path = require('path');

// Importa o módulo 'fs' para interagir com o sistema de arquivos
const fs = require('fs');

// Cria uma instância do servidor Express
const server = express();

// Aplica o middleware CORS para permitir requisições de diferentes origens
server.use(cors());

// Aplica o middleware para interpretar JSON nas requisições
server.use(express.json());

// Configura o armazenamento do multer para salvar as imagens na pasta 'front/assets'
const storage = multer.diskStorage({
    // Define o destino dos arquivos de upload
    destination: (req, file, cb) => {
        // Cria o caminho completo para a pasta 'front/assets'
        const uploadPath = path.join(__dirname, 'front/assets');
        // Verifica se a pasta existe, e se não existir, cria a pasta de forma recursiva
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        // Informa o multer para salvar os arquivos nesta pasta
        cb(null, uploadPath);
    },
    // Define o nome do arquivo que será salvo
    filename: (req, file, cb) => {
        // Cria um nome de arquivo único usando o campo 'fieldname', a data atual e a extensão original do arquivo
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

// Inicializa o multer com a configuração de armazenamento
const upload = multer({ storage: storage });

// Define um objeto contendo informações sobre diferentes raças de cavalos
const horseBreeds = {
    // Raça 'Quarter Horse'
    "Quarter Horse": {
        Origem: 'Estados Unidos', // País de origem
        NomeOriginal: 'Quarter Horse', // Nome original da raça
        Texto: 'O cavalo Quarto de Milha é originário dos Estados Unidos e é conhecido por sua velocidade em corridas curtas de um quarto de milha, de onde vem seu nome. É uma raça versátil, amplamente utilizada em competições de rodeio, trabalhos rurais e até mesmo como cavalo de sela. Sua origem remonta ao século XVII, com influências de raças inglesas e cavalos indígenas da América do Norte.', // Texto descritivo sobre a raça
        Imagem: 'QuarterHorse.png' // Nome do arquivo de imagem associada à raça
    },
    // Raça 'Mangalarga'
    "Mangalarga": {
        Origem: 'Brasil',
        NomeOriginal: 'Mangalarga',
        Texto: 'A raça Mangalarga é originária do Brasil, desenvolvida a partir do cruzamento entre cavalos de origem portuguesa e espanhola. É conhecida por sua marcha macia e confortável, tornando-a ideal para longas cavalgadas e atividades equestres. Os Mangalargas são apreciados por sua elegância, resistência e disposição dócil, características que os tornaram populares tanto em atividades rurais quanto em exposições e eventos de equitação.',
        Imagem: 'Mangalarga.png'
    },
    // Raça 'Crioulo'
    "Crioulo": {
        Origem: 'Uruguai',
        NomeOriginal: 'Crioulo',
        Texto: 'A raça de cavalo Crioulo é originária do Uruguai e é conhecida por sua resistência e adaptabilidade a diferentes ambientes. A origem exata da raça é discutida, mas é sabido que descendem de cavalos trazidos pelos colonizadores espanhóis e portugueses e que se adaptaram à vida selvagem nas vastas regiões do Uruguai.',
        Imagem: 'Crioulo.png'
    }
};

// Endpoint para adicionar uma nova imagem para uma raça específica
server.post('/upload/:breed', upload.single('imagem'), (req, res) => {
    // Obtém o nome da raça a partir dos parâmetros da URL
    const breed = req.params.breed;
    // Busca as informações da raça no objeto 'horseBreeds'
    const breedInfo = horseBreeds[breed];

    // Se a raça não for encontrada, retorna um erro 404
    if (!breedInfo) {
        return res.status(404).json({ error: 'Raça não encontrada' });
    }

    // Atualiza o caminho da imagem no objeto da raça
    breedInfo.Imagem = `/assets/${req.file.filename}`;
    // Retorna uma resposta de sucesso com o caminho da imagem
    return res.status(200).json({ message: 'Imagem enviada com sucesso', path: breedInfo.Imagem });
});

// Endpoint para obter informações da raça, incluindo a imagem
server.get('/educacional/:breed', (req, res) => {
    // Obtém o nome da raça a partir dos parâmetros da URL
    const breed = req.params.breed;
    // Busca as informações da raça no objeto 'horseBreeds'
    const breedInfo = horseBreeds[breed];

    // Se a raça não for encontrada, retorna um erro 404
    if (!breedInfo) {
        return res.status(404).json({ error: 'Raça não encontrada' });
    }

    // Retorna as informações da raça em formato JSON
    return res.json(breedInfo);
});

// Middleware para servir arquivos estáticos da pasta 'assets'
server.use('/assets', express.static(path.join(__dirname, 'front/assets')));

// Inicia o servidor na porta 3001 e exibe uma mensagem no console
server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
