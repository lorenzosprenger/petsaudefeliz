// Importa o módulo 'express' para criar o servidor
const express = require('express');

// Importa o módulo 'cors' para permitir o compartilhamento de recursos entre diferentes origens
const cors = require('cors');

// Importa o módulo 'mysql' para conectar-se ao banco de dados MySQL
const mysql = require('mysql');

// Cria uma instância do aplicativo Express
const app = express();

// Aplica o middleware CORS para permitir requisições de diferentes origens
app.use(cors());

// Aplica o middleware para interpretar JSON nas requisições
app.use(express.json());

// Configuração do banco de dados MySQL
const connection = mysql.createConnection({
    host: 'localhost',       // Endereço do servidor MySQL
    user: 'root',            // Nome de usuário do banco de dados
    password: 'Saolucas2006', // Senha do banco de dados
    database: 'petsaudefeliz' // Nome do banco de dados
});

// Conecta ao banco de dados MySQL
connection.connect(err => {
    if (err) throw err;      // Lança um erro se a conexão falhar
    console.log('Conectado ao banco de dados petsaudefeliz'); // Mensagem de sucesso
});

// Estrutura de dados representando diferentes planos de alimentação para pets
const plans = {
    'Jovem': {
        'Leve': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Médio': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Pesado': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        }
    },
    'Adulto': {
        'Leve': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Médio': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Pesado': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        }
    },
    'Idoso': {
        'Leve': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '1.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '2 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '2.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Médio': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '2.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        },
        'Pesado': {
            'Baixo': [
                { Dia: 'Segunda-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Terça-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Quarta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Quinta-feira', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Sexta-feira', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' },
                { Dia: 'Sábado', Alimentação: '3 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h30', Recolhimento: '17h30' },
                { Dia: 'Domingo', Alimentação: '3.5 kg de feno de boa qualidade', Soltura: '8h00', Recolhimento: '17h00' }
            ],
            'Moderado': [
                { Dia: 'Segunda-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '3.5 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ],
            'Alto': [
                { Dia: 'Segunda-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Terça-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Quarta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Quinta-feira', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Sexta-feira', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' },
                { Dia: 'Sábado', Alimentação: '4 kg de ração concentrada para equinos (divididos em duas porções, uma pela manhã e outra à tarde)', Soltura: '8h00', Recolhimento: '18h00' },
                { Dia: 'Domingo', Alimentação: '4.5 kg de feno de boa qualidade', Soltura: '7h30', Recolhimento: '18h30' }
            ]
        }
    }
};

// Estrutura de dados representando diferentes planos de exercícios para pets
const exercisePlans = {
   'Jovem': {
       'Leve': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       },
       'Médio': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h30' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h30' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h30' }
           ]
       },
       'Pesado': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       }
   },
   'Adulto': {
       'Leve': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       },
       'Médio': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h30' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h30' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h30' }
           ]
       },
       'Pesado': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       }
   },
   'Idoso': {
       'Leve': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       },
       'Médio': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h30' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h30' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h30' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h30' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h30' }
           ]
       },
       'Pesado': {
           'Baixo': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada leve', Horário: '9h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada leve', Horário: '9h00' }
           ],
           'Moderado': [
               { Dia: 'Segunda-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Terça-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Quarta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Quinta-feira', Atividades: 'Treinamento leve', Horário: '10h00' },
               { Dia: 'Sexta-feira', Atividades: 'Caminhada e trote', Horário: '10h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Caminhada e trote', Horário: '10h00' }
           ],
           'Alto': [
               { Dia: 'Segunda-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Terça-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Quarta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Quinta-feira', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Sexta-feira', Atividades: 'Treinamento intenso', Horário: '11h00' },
               { Dia: 'Sábado', Atividades: 'Descanso', Horário: '-' },
               { Dia: 'Domingo', Atividades: 'Treinamento leve', Horário: '11h00' }
           ]
       }
   }
};

// Função auxiliar para determinar a categoria de peso com base na idade e no peso do animal
const getWeightCategory = (idadeCategoria, peso) => {
    if (idadeCategoria === 'Jovem') {
        if (peso <= 400) return 'Leve';  // Peso leve para animais jovens
        if (peso <= 550) return 'Médio'; // Peso médio para animais jovens
        return 'Pesado';                 // Peso pesado para animais jovens
    } else if (idadeCategoria === 'Adulto') {
        if (peso <= 500) return 'Leve';  // Peso leve para animais adultos
        if (peso <= 650) return 'Médio'; // Peso médio para animais adultos
        return 'Pesado';                 // Peso pesado para animais adultos
    } else if (idadeCategoria === 'Idoso') {
        if (peso <= 450) return 'Leve';  // Peso leve para animais idosos
        if (peso <= 600) return 'Médio'; // Peso médio para animais idosos
        return 'Pesado';                 // Peso pesado para animais idosos
    }
    return null; // Retorna null se a categoria de idade não for reconhecida
};

// Rota principal para a página inicial
app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor da Petsaudefeliz!'); // Envia uma mensagem de boas-vindas
});

// Rota para obter planos de alimentação e exercícios com base na idade, peso e nível de atividade
app.get('/plano/:idade/:peso/:nivel', (req, res) => {
    // Extrai os parâmetros da URL
    const { idade, peso, nivel } = req.params;
    
    // Encontra o plano de alimentação com base nos parâmetros fornecidos
    const plan = plans[idade] && plans[idade][peso] && plans[idade][peso][nivel];
    
    // Encontra o plano de exercícios com base nos parâmetros fornecidos
    const exercisePlan = exercisePlans[idadeCategoria] && exercisePlans[idadeCategoria][pesoCategoria] && exercisePlans[idadeCategoria][pesoCategoria][nivel];

    // Se o plano de alimentação não for encontrado, retorna um erro 404
    if (!plan) {
        return res.status(404).json({ error: 'Plano de alimentação não encontrado' });
    }

    // Se o plano de exercícios não for encontrado, retorna um erro 404
    if (!exercisePlan) {
        return res.status(404).json({ error: 'Plano de exercícios não encontrado' });
    }

    // Retorna o plano de alimentação e exercícios em formato JSON
    return res.json({ plan, exercisePlan });
});

// Inicia o servidor na porta 3002 e exibe uma mensagem no console
app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002');
});

// Rota para obter planos de alimentação e exercícios com base no ID do pet
app.get('/plano_pet/:idPet', (req, res) => {
    // Extrai o ID do pet dos parâmetros da URL
    const { idPet } = req.params;

    // Consulta SQL para obter a idade, peso e nível de atividade do pet com base no ID
    const query = `
        SELECT 
            TIMESTAMPDIFF(YEAR, data_nasc, CURDATE()) AS idade_anos, // Calcula a idade do pet em anos
            peso, // Obtém o peso do pet
            nivel_atv // Obtém o nível de atividade do pet
        FROM pet 
        WHERE usuario_id = ?
    `;

    // Executa a consulta no banco de dados MySQL
    connection.query(query, [idPet], (err, results) => {
        // Se houver um erro na consulta, retorna um erro 500
        if (err) {
            console.error('Database error:', err); // Log do erro
            return res.status(500).json({ error: err.message });
        }
        
        // Se o pet não for encontrado, retorna um erro 404
        if (results.length === 0) {
            console.log(`Pet not found for idPet: ${idPet}`);
            return res.status(404).json({ error: `Pet não encontrado para idPet: ${idPet}` });
        }

        // Extrai os dados do resultado da consulta
        const { idade_anos, peso, nivel_atv } = results[0];
        console.log('Calculated age:', idade_anos);

        // Determina a categoria de idade com base na idade em anos
        let idadeCategoria = '';
        if (idade_anos < 5) {
            idadeCategoria = 'Jovem';
        } else if (idade_anos < 15) {
            idadeCategoria = 'Adulto';
        } else {
            idadeCategoria = 'Idoso';
        }
        console.log('Age category:', idadeCategoria);

        // Determina a categoria de peso com base na idade e no peso do pet
        const pesoCategoria = getWeightCategory(idadeCategoria, peso);
        console.log('Weight category:', pesoCategoria);
        console.log('Atividade category:', nivel_atv);

        // Encontra o plano de alimentação com base nos dados do pet
        const plan = plans[idadeCategoria] && plans[idadeCategoria][pesoCategoria] && plans[idadeCategoria][pesoCategoria][nivel_atv];
        
        // Encontra o plano de exercícios com base nos dados do pet
        const exercisePlan = exercisePlans[idadeCategoria] && exercisePlans[idadeCategoria][pesoCategoria] && exercisePlans[idadeCategoria][pesoCategoria][nivel_atv];

        // Se o plano de alimentação não for encontrado, retorna um erro 404
        if (!plan) {
            return res.status(404).json({ error: 'Plano de alimentação não encontrado' });
        }

        // Se o plano de exercícios não for encontrado, retorna um erro 404
        if (!exercisePlan) {
            return res.status(404).json({ error: 'Plano de exercícios não encontrado' });
        }

        // Retorna o plano de alimentação e exercícios em formato JSON
        return res.json({ plan, exercisePlan });
    });
});