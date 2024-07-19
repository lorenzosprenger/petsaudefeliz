// file: index2.js
const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();
app.use(cors());
app.use(express.json());

// Configuração do banco de dados
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Saolucas2006',
    database: 'petsaudefeliz'
});

connection.connect(err => {
    if (err) throw err;
    console.log('Conectado ao banco de dados petsaudefeliz');
});

// Estrutura de dados das tabelas
const plans = {
    'Jovem': {
        'Leve': {
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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
            'baixo': [
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

// Função auxiliar para determinar a categoria de peso
const getWeightCategory = (idadeCategoria, peso) => {
    if (idadeCategoria === 'Jovem') {
        if (peso <= 400) return 'Leve';
        if (peso <= 550) return 'Médio';
        return 'Pesado';
    } else if (idadeCategoria === 'Adulto') {
        if (peso <= 500) return 'Leve';
        if (peso <= 650) return 'Médio';
        return 'Pesado';
    } else if (idadeCategoria === 'Idoso') {
        if (peso <= 450) return 'Leve';
        if (peso <= 600) return 'Médio';
        return 'Pesado';
    }
    return null;
};

app.get('/', (req, res) => {
    res.send('Bem-vindo ao servidor da Petsaudefeliz!');
});

app.get('/plano/:idade/:peso/:nivel', (req, res) => {
    const { idade, peso, nivel } = req.params;
    const plan = plans[idade] && plans[idade][peso] && plans[idade][peso][nivel];

    if (!plan) {
        return res.status(404).json({ error: 'Plano não encontrado' });
    }

    return res.json(plan);
});

app.listen(3002, () => {
    console.log('Servidor rodando na porta 3002');
});

app.get('/plano_pet/:idPet', (req, res) => {
    const { idPet } = req.params;

    const query = `
        SELECT 
            TIMESTAMPDIFF(YEAR, data_nasc, CURDATE()) AS idade_anos,
            peso,
            nivel_atv 
        FROM pet 
        WHERE idpet = ?
    `;

    connection.query(query, [idPet], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ error: err.message });
        }

        if (results.length === 0) {
            console.log('Pet not found for idPet:', idPet);
            return res.status(404).json({ error: 'Pet não encontrado' });
        }

        const { idade_anos, peso, nivel_atv } = results[0];
        console.log('Calculated age:', idade_anos);

        // Determine age category based on idade_anos
        let idadeCategoria = '';
        if (idade_anos < 5) {
            idadeCategoria = 'Jovem';
        } else if (idade_anos < 15) {
            idadeCategoria = 'Adulto';
        } else {
            idadeCategoria = 'Idoso';
        }
        console.log('Age category:', idadeCategoria);

        // Determine weight category based on idadeCategoria and peso
        const pesoCategoria = getWeightCategory(idadeCategoria, peso);
        console.log('Weight category:', pesoCategoria);

        const plan = plans[idadeCategoria] && plans[idadeCategoria][pesoCategoria] && plans[idadeCategoria][pesoCategoria][nivel_atv];
        if (!plan) {
            console.log('Plan not found for:', idadeCategoria, pesoCategoria, nivel_atv);
            return res.status(404).json({ error: 'Plano não encontrado' });
        }

        return res.json(plan);
    });
});
