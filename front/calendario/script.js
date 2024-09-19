document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventInput = document.getElementById('event-input');
    const addEventButton = document.getElementById('add-event');
    const eventListContainer = document.getElementById('event-list');
    const dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    renderizarCalendario();
    carregarEventos(); // Função que busca e exibe os eventos

    function renderizarCalendario() {
        const nomesMeses = ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'];
        const diasDaSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        const diasNoMes = new Date(anoAtual, mesAtual + 1, 0).getDate();
        const primeiroDiaDaSemana = new Date(anoAtual, mesAtual, 1).getDay();

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
        
        for (let i = 0; i < primeiroDiaDaSemana; i++) {
            calendarioHTML += '<td></td>';
        }

        let contagemDias = 1;
        for (let i = primeiroDiaDaSemana; i < 7; i++) {
            calendarioHTML += `<td class="calendar-day" data-day="${contagemDias}">${contagemDias}</td>`;
            contagemDias++;
        }
        calendarioHTML += '</tr>';

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

        calendar.innerHTML = calendarioHTML;

        document.getElementById('prev').addEventListener('click', () => {
            mesAtual--;
            if (mesAtual < 0) {
                mesAtual = 11;
                anoAtual--;
            }
            renderizarCalendario();
            carregarEventos(); // Recarrega os eventos para o mês atualizado
        });

        document.getElementById('next').addEventListener('click', () => {
            mesAtual++;
            if (mesAtual > 11) {
                mesAtual = 0;
                anoAtual++;
            }
            renderizarCalendario();
            carregarEventos(); // Recarrega os eventos para o mês atualizado
        });

        const diasCalendario = document.querySelectorAll('.calendar-day');
        diasCalendario.forEach(dia => {
            dia.addEventListener('click', () => {
                diasCalendario.forEach(d => d.classList.remove('selected'));
                dia.classList.add('selected');
            });
        });
    }

    addEventButton.addEventListener('click', () => {
        const diaSelecionado = document.querySelector('.calendar-day.selected');
        if (diaSelecionado) {
            const diaSelecionadoValue = diaSelecionado.getAttribute('data-day');
            const mesSelecionado = mesAtual + 1;
            const anoSelecionado = anoAtual;
            const dataSelecionada = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoValue}`;
            const textoEvento = eventInput.value.trim();

            async function enviarEvento(nomeUsuario, textoEvento, dataSelecionada) {
                let data = { nome_usuario: nomeUsuario, texto_evento: textoEvento, data_evento: dataSelecionada };
                const response = await fetch('http://localhost:3000/api/users/calendario', {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });

                let content = await response.json();
                if (content.success) {
                    alert("Evento adicionado com sucesso!");
                    carregarEventos(); // Recarrega a lista de eventos
                } else {
                    alert("Erro ao adicionar o evento.");
                }
            }

            if (textoEvento !== '') {
                enviarEvento(nomeUsuario, textoEvento, dataSelecionada);
                eventInput.value = '';
            } else {
                alert('Digite um evento antes de adicionar.');
            }
        } else {
            alert('Selecione um dia do calendário antes de adicionar um evento.');
        }
    });

    async function carregarEventos() {
        try {
            const response = await fetch(`http://localhost:3000/api/users/calendario/get`);
            const result = await response.json();
    
            if (result.success) {
                eventListContainer.innerHTML = ''; // Limpa a lista de eventos
                const diasCalendario = document.querySelectorAll('.calendar-day');
    
                result.data.forEach(evento => {
                    adicionarEventoNaLista(evento.lembrete, evento.dia, evento.id_evento);
                    
                    // Marcar o dia com evento no calendário
                    const diaEvento = new Date(evento.dia).getDate();
                    diasCalendario.forEach(dia => {
                        if (parseInt(dia.getAttribute('data-day')) === diaEvento) {
                            dia.classList.add('event-day');
                        }
                    });
                });
            } else {
                console.error('Erro ao carregar eventos:', result.message);
            }
        } catch (error) {
            console.error('Erro ao conectar com o servidor:', error);
        }
    }
    

    function adicionarEventoNaLista(textoEvento, dataEvento, idEvento) {
        const listItem = document.createElement('li');
        listItem.textContent = `${dataEvento}: ${textoEvento}`;
    
        // Cria o botão de excluir
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Excluir';
        deleteButton.style.marginLeft = '10px';

        
        deleteButton.addEventListener('click', () => {
            console.log(`Tentando excluir o evento com id: ${idEvento}`); // Verifique o ID do evento
            excluirEvento(idEvento, listItem); // Passa o ID do evento e o item da lista para excluir
        });
    
        // Adiciona o botão ao item da lista
        listItem.appendChild(deleteButton);
        eventListContainer.appendChild(listItem);
    }
    console.log(`Tentando excluir o evento com id: ${idEvento}`);

    async function excluirEvento(idEvento, listItem) {
        const confirmacao = confirm('Tem certeza de que deseja excluir este evento?');

        if (!confirmacao) return;
    
        try {
            const response = await fetch(`http://localhost:3000/api/users/calendario/${idEvento}`, {
                method: 'DELETE',
            });
    
            const result = await response.json();
            if (result.success) {
                alert('Evento excluído com sucesso!');
                listItem.remove(); // Remove o item da lista de eventos do HTML
                renderizarCalendario(); // Atualiza o calendário
                carregarEventos(); // Recarrega os eventos
            } else {
                alert('Erro ao excluir o evento.');
            }
        } catch (error) {
            console.error('Erro ao excluir o evento:', error);
            alert('Erro ao excluir o evento.');
        }
    }
    
        
});
