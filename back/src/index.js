const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const server = express();
server.use(cors());
server.use(express.json());

// Configuração do multer para salvar as imagens na pasta 'front/assets'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadPath = path.join(__dirname, 'front/assets');
        if (!fs.existsSync(uploadPath)) {
            fs.mkdirSync(uploadPath, { recursive: true });
        }
        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
    }
});

const upload = multer({ storage: storage });

const horseBreeds = {
    "Quarter Horse": {
        Origem: 'Estados Unidos',
        NomeOriginal: 'Quarter Horse',
        Texto: 'O cavalo Quarto de Milha é originário dos Estados Unidos e é conhecido por sua velocidade em corridas curtas de um quarto de milha, de onde vem seu nome. É uma raça versátil, amplamente utilizada em competições de rodeio, trabalhos rurais e até mesmo como cavalo de sela. Sua origem remonta ao século XVII, com influências de raças inglesas e cavalos indígenas da América do Norte.',
        Imagem: 'QuarterHorse.png' 
    },
    "Mangalarga": {
        Origem: 'Brasil',
        NomeOriginal: 'Mangalarga',
        Texto: 'A raça Mangalarga é originária do Brasil, desenvolvida a partir do cruzamento entre cavalos de origem portuguesa e espanhola. É conhecida por sua marcha macia e confortável, tornando-a ideal para longas cavalgadas e atividades equestres. Os Mangalargas são apreciados por sua elegância, resistência e disposição dócil, características que os tornaram populares tanto em atividades rurais quanto em exposições e eventos de equitação.',
        Imagem: 'Mangalarga.png' 
    },
    "Crioulo": {
        Origem: 'Uruguai',
        NomeOriginal: 'Crioulo',
        Texto: 'A raça de cavalo Crioulo é originária do Uruguai e é conhecida por sua resistência e adaptabilidade a diferentes ambientes. A origem exata da raça é discutida, mas é sabido que descendem de cavalos trazidos pelos colonizadores espanhóis e portugueses e que se adaptaram à vida selvagem nas vastas regiões do Uruguai.',
        Imagem: 'Crioulo.png' 
    }
};

// Endpoint para adicionar uma nova imagem para uma raça específica
server.post('/upload/:breed', upload.single('imagem'), (req, res) => {
    const breed = req.params.breed;
    const breedInfo = horseBreeds[breed];

    if (!breedInfo) {
        return res.status(404).json({ error: 'Raça não encontrada' });
    }

    // Atualizando o caminho da imagem
    breedInfo.Imagem = `/assets/${req.file.filename}`;
    return res.status(200).json({ message: 'Imagem enviada com sucesso', path: breedInfo.Imagem });
});

// Endpoint para obter informações da raça, incluindo a imagem
server.get('/educacional/:breed', (req, res) => {
    const breed = req.params.breed;
    const breedInfo = horseBreeds[breed];

    if (!breedInfo) {
        return res.status(404).json({ error: 'Raça não encontrada' });
    }

    return res.json(breedInfo);
});

// Servir imagens estáticas
server.use('/assets', express.static(path.join(__dirname, 'front/assets')));

server.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
