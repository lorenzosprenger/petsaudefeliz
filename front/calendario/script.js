document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventInput = document.getElementById('event-input');
    const addEventButton = document.getElementById('add-event');
    const eventList = document.getElementById('event-list');
    const dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();

    let eventosSalvos = JSON.parse(localStorage.getItem("eventos")) || [];  
    const nomeUsuario = localStorage.getItem("nomeUsuario");

    renderizarCalendario();
    carregarEventos(); 

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
        });

        document.getElementById('next').addEventListener('click', () => {
            mesAtual++;
            if (mesAtual > 11) {
                mesAtual = 0;
                anoAtual++;
            }
            renderizarCalendario();
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
            const dataSelecionada = `${anoSelecionado}-${String(mesSelecionado).padStart(2, '0')}-${String(diaSelecionadoValue).padStart(2, '0')}`;
            const textoEvento = eventInput.value.trim();

            if (textoEvento !== '') {
                let novoEvento = {
                    nome_usuario: nomeUsuario,
                    texto_evento: textoEvento,
                    data_evento: dataSelecionada
                };

                // Enviando o evento ao backend
                fetch('/api/eventos', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(novoEvento)
                })
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        eventosSalvos.push(novoEvento);
                        localStorage.setItem("eventos", JSON.stringify(eventosSalvos));
                        atualizarListaEventos();
                        eventInput.value = '';
                    } else {
                        alert('Erro ao adicionar o evento.');
                    }
                })
                .catch(error => {
                    console.error('Erro na requisição ao backend:', error);
                    alert('Erro ao comunicar com o servidor.');
                });
            } else {
                alert('Por favor, digite um evento antes de adicionar.');
            }
        } else {
            alert('Por favor, selecione um dia do calendário antes de adicionar um evento.');
        }
    });

    function atualizarListaEventos() {
        eventList.innerHTML = '';
        eventosSalvos.sort((a, b) => new Date(a.data_evento) - new Date(b.data_evento));
        eventosSalvos.forEach((evento, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `Evento: ${evento.texto_evento} - Data: ${evento.data_evento}
                <button class="delete-event" data-index="${index}">Excluir</button>`;
            eventList.appendChild(listItem);
        });

        document.querySelectorAll('.delete-event').forEach(button => {
            button.addEventListener('click', (e) => {
                const index = e.target.getAttribute('data-index');
                excluirEvento(index);
            });
        });
    }

    function excluirEvento(index) {
        const evento = eventosSalvos[index];

        if (confirm("Tem certeza que deseja excluir este evento?")) {
            fetch(`/api/eventos/${evento.id_evento}`, {
                method: 'DELETE'
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    eventosSalvos.splice(index, 1);
                    localStorage.setItem("eventos", JSON.stringify(eventosSalvos));
                    atualizarListaEventos();
                } else {
                    alert('Erro ao excluir o evento.');
                }
            })
            .catch(error => console.error('Erro:', error));
        }
    }

    function carregarEventos() {
        if (eventosSalvos.length > 0) {
            atualizarListaEventos();
        }
    }
});
