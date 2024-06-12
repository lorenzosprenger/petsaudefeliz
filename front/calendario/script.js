document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventInput = document.getElementById('event-input');
    const addEventButton = document.getElementById('add-event');
    const dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();

    // Supondo que o nome do usuário esteja armazenado em uma variável chamada nome_usuario
    const nomeUsuario = localStorage.getItem("nomeUsuario"); // Você pode substituir isso pela forma como você obtém o nome do usuário

    renderizarCalendario();

    function renderizarCalendario() {
        const nomesMeses = [
            'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
            'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
        ];

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

        // Adiciona evento ao clicar em um dia
        const diasCalendario = document.querySelectorAll('.calendar-day');
        diasCalendario.forEach(dia => {
            dia.addEventListener('click', () => {
                diasCalendario.forEach(d => d.classList.remove('selected'));
                dia.classList.add('selected');
            });
        });
    }

    // Adiciona evento ao clicar em "Adicionar Evento"
    addEventButton.addEventListener('click', () => {
        const diaSelecionado = document.querySelector('.calendar-day.selected');
        if (diaSelecionado) {
            const diaSelecionadoValue = diaSelecionado.getAttribute('data-day');
            const mesSelecionado = mesAtual + 1; // Janeiro é 0 no JavaScript
            const anoSelecionado = anoAtual;
            const dataSelecionada = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoValue}`;
            const textoEvento = eventInput.value.trim();
            async function enviarEvento( nomeUsuario, textoEvento, dataSelecionada) {
                let data = { nome_usuario: nomeUsuario , texto_evento: textoEvento, data_evento: dataSelecionada};
                console.log(data);
                // POST
                const response = await fetch('http://localhost:3000/api/users/calendario', {
                    method: "POST",
                    headers: { "Content-type": "application/json;charset=UTF-8" },
                    body: JSON.stringify(data)
                });

                let content = await response.json();
                console.log(content);

                if (content.success) {
                    alert("Sucesso com o POST!!");
                    // window.location.reload();
                } else {
                    console.error(content);
                    alert("Não deu o POST!!");
                }
            }

            if (textoEvento !== '') {
                enviarEvento(nomeUsuario, textoEvento, dataSelecionada  );
                alert(`Evento "${textoEvento}" adicionado em ${dataSelecionada}`);
                eventInput.value = ''; // Limpa o campo de texto após adicionar o evento
            } else {
                alert('Por favor, digite um evento antes de adicionar.');
            }
        } else {
            alert('Por favor, selecione um dia do calendário antes de adicionar um evento.');
        }
    });
});
