// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', () => {
    // Obtém o elemento HTML com o ID 'calendar' e o armazena na variável 'calendar'
    const calendar = document.getElementById('calendar');
    // Obtém o elemento HTML com o ID 'event-input' para capturar o texto do evento
    const eventInput = document.getElementById('event-input');
    // Obtém o botão de adicionar evento pelo ID 'add-event'
    const addEventButton = document.getElementById('add-event');
    // Obtém a data atual
    const dataAtual = new Date();
    // Armazena o mês atual (0-11) em 'mesAtual'
    let mesAtual = dataAtual.getMonth();
    // Armazena o ano atual em 'anoAtual'
    let anoAtual = dataAtual.getFullYear();

    // Obtém o nome do usuário armazenado no localStorage
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    // Chama a função para renderizar o calendário
    renderizarCalendario();

    // Função para renderizar o calendário com o mês e ano atuais
    function renderizarCalendario() {
        // Array com os nomes dos meses
        const nomesMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

        // Array com os dias da semana
        const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        
        // Obtém o número de dias no mês atual
        const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
        // Obtém o dia da semana do primeiro dia do mês
        const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay();

        // Inicia a construção do HTML do calendário
        let calendarioHTML = `
            <div class="header">
                <button id="prev">&lt;</button>
                <h2>${nomesMeses[mesAtual]} ${anoAtual}</h2>
                <button id="next">&gt;</button>
            </div>
            <table>
                <thead>
                    <tr>${diasDaSemana.map(dia => `<th>${dia}</th>`).join('')}</tr>
                </thead>
                <tbody>
                    <tr>`;

        // Adiciona células vazias até o primeiro dia da semana
        for (let i = 0; i < primeiroDiaDaSemana; i++) {
            calendarioHTML += '<td></td>';
        }

        // Preenche os dias do mês no calendário
        let contagemDias = 1;
        for (let i = primeiroDiaDaSemana; i < 7; i++) {
            calendarioHTML += `<td class="calendar-day" data-day="${contagemDias}">${contagemDias}</td>`;
            contagemDias++;
        }

        calendarioHTML += '</tr>';

        // Preenche as semanas seguintes do mês
        while (contagemDias <= diasNoMes) {
            calendarioHTML += '<tr>';
            for (let i = 0; i < 7 && contagemDias <= diasNoMes; i++) {
                calendarioHTML += `<td class="calendar-day" data-day="${contagemDias}">${contagemDias}</td>`;
                contagemDias++;
            }
            calendarioHTML += '</tr>';
        }

        calendarioHTML += `
                </tbody>
            </table>`;

        // Insere o HTML gerado no elemento 'calendar'
        calendar.innerHTML = calendarioHTML;

        // Adiciona o evento de clique para o botão de mês anterior
        document.getElementById('prev').addEventListener('click', () => {
            mesAtual--; // Decrementa o mês
            if (mesAtual < 0) {
                mesAtual = 11; // Volta para dezembro se o mês for negativo
                anoAtual--; // Decrementa o ano
            }
            renderizarCalendario(); // Re-renderiza o calendário com o mês/ano atualizados
        });

        // Adiciona o evento de clique para o botão de próximo mês
        document.getElementById('next').addEventListener('click', () => {
            mesAtual++; // Incrementa o mês
            if (mesAtual > 11) {
                mesAtual = 0; // Volta para janeiro se o mês exceder 11
                anoAtual++; // Incrementa o ano
            }
            renderizarCalendario(); // Re-renderiza o calendário com o mês/ano atualizados
        });

        // Adiciona evento de clique a cada dia do calendário
        const diasCalendario = document.querySelectorAll('.calendar-day');
        diasCalendario.forEach(dia => {
            dia.addEventListener('click', () => {
                diasCalendario.forEach(d => d.classList.remove('selected')); // Remove seleção de outros dias
                dia.classList.add('selected'); // Adiciona a classe 'selected' ao dia clicado
            });
        });
    }

    // Adiciona evento de clique ao botão "Adicionar Evento"
    addEventButton.addEventListener('click', () => {
        // Obtém o dia selecionado do calendário
        const diaSelecionado = document.querySelector('.calendar-day.selected');
        if (diaSelecionado) {
            const diaSelecionadoValue = diaSelecionado.getAttribute('data-day'); // Obtém o número do dia selecionado
            const mesSelecionado = mesAtual + 1; // Ajusta o mês (0-indexado) para 1-indexado
            const anoSelecionado = anoAtual;
            const dataSelecionada = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoValue}`; // Formata a data selecionada
            const textoEvento = eventInput.value.trim(); // Obtém o texto do evento e remove espaços em branco

            // Função assíncrona para enviar o evento ao servidor
            async function enviarEvento(nomeUsuario, textoEvento, dataSelecionada) {
                // Cria um objeto 'data' com as informações do evento
                let data = { nome_usuario: nomeUsuario, texto_evento: textoEvento, data_evento: dataSelecionada };
                console.log(data);

                // Envia uma requisição POST para o servidor com os dados do evento
                const response = await fetch('http://localhost:3000/api/users/calendario', {
                    method: "POST", // Define o método HTTP como POST
                    headers: { "Content-type": "application/json;charset=UTF-8" }, // Define o cabeçalho da requisição como JSON
                    body: JSON.stringify(data) // Converte o objeto 'data' para JSON e o inclui no corpo da requisição
                });

                // Aguarda a resposta do servidor e a converte para JSON
                let content = await response.json();
                console.log(content);

                // Verifica se o envio foi bem-sucedido
                if (content.success) {
                    alert("Sucesso com o POST!!");
                    // window.location.reload(); // Recarrega a página (descomentado se necessário)
                } else {
                    console.error(content);
                    alert("Não deu o POST!!");
                }
            }

            // Verifica se o texto do evento não está vazio
            if (textoEvento !== '') {
                enviarEvento(nomeUsuario, textoEvento, dataSelecionada); // Chama a função para enviar o evento
                alert(`Evento "${textoEvento}" adicionado em ${dataSelecionada}`); // Exibe mensagem de sucesso
                eventInput.value = ''; // Limpa o campo de texto após adicionar o evento
            } else {
                alert('Por favor, digite um evento antes de adicionar.'); // Alerta se o campo de evento estiver vazio
            }
        } else {
            alert('Por favor, selecione um dia do calendário antes de adicionar um evento.'); // Alerta se nenhum dia for selecionado
        }
    });
});
