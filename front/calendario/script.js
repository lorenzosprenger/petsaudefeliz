document.addEventListener('DOMContentLoaded', () => {
    const calendar = document.getElementById('calendar');
    const eventInput = document.getElementById('event-input');
    const dataAtual = new Date();
    let mesAtual = dataAtual.getMonth();
    let anoAtual = dataAtual.getFullYear();

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
                const diaSelecionado = dia.getAttribute('data-day');
                const mesSelecionado = mesAtual + 1; // Janeiro é 0 no JavaScript
                const anoSelecionado = anoAtual;
                const dataSelecionada = `${anoSelecionado}-${mesSelecionado}-${diaSelecionado}`;
                const textoEvento = eventInput.value.trim();
                if (textoEvento !== '') {
                    // Aqui você pode salvar o evento como preferir, como em um banco de dados ou localStorage
                    alert(`Evento "${textoEvento}" adicionado em ${dataSelecionada}`);
                    eventInput.value = ''; // Limpa o campo de texto após adicionar o evento
                } else {
                    alert('Por favor, digite um evento antes de adicionar.');
                }
            });
        });
    }

    const botao_adicionar = document.getElementById('add-event');

    // Adiciona evento ao clicar em "Adicionar Evento"
    botao_adicionar.addEventListener('click', () => {
        const diaSelecionado = document.querySelector('.calendar-day.selected');
        if (diaSelecionado) {
            const diaSelecionadoValue = diaSelecionado.getAttribute('data-day');
            const mesSelecionado = mesAtual + 1; // Janeiro é 0 no JavaScript
            const anoSelecionado = anoAtual;
            const dataSelecionada = `${anoSelecionado}-${mesSelecionado}-${diaSelecionadoValue}`;
            const textoEvento = eventInput.value.trim();

            async function enviarEvento(data_evento) {
                let data = { data_evento };

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
                    //recarrega a página
                } else {
                    console.error();
                    alert("Não deu o POST!!");
                }
            }

            enviarEvento(dataSelecionada);

            if (textoEvento !== '') {
                // Aqui você pode salvar o evento como preferir, como em um banco de dados ou localStorage
                alert(`Evento "${textoEvento}" adicionado em ${dataSelecionada}`);
                
                // Limpa o campo de texto após adicionar o evento
                // eventInput.value = '';   
            } else {
                alert('Por favor, digite um evento antes de adicionar.');
            }
        } else {
            alert('Por favor, selecione um dia do calendário antes de adicionar um evento.');
        }
    });
});
