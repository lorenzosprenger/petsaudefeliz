document.addEventListener('DOMContentLoaded', async () => {
    const petContainer = document.getElementById('petContainer');
    const userId = localStorage.getItem('idUsuario');

    // Função para calcular a idade com base na data de nascimento
    function calcularIdade(dataNasc) {
        const hoje = new Date();
        const nascimento = new Date(dataNasc);
        let idade = hoje.getFullYear() - nascimento.getFullYear();
        const mes = hoje.getMonth() - nascimento.getMonth();
        if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
            idade--;
        }
        return idade;
    }

    // Função para formatar a data de nascimento no formato DD/MM/AAAA
    function formatarData(data) {
        const date = new Date(data);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const ano = date.getFullYear();
        return `${dia}/${mes}/${ano}`;
    }

    // Função para carregar os perfis dos cavalos cadastrados
    async function carregarPets() {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/pets`);
        const result = await response.json();

        if (result.success && result.pets.length > 0) {
            result.pets.forEach(pet => {
                const idade = calcularIdade(pet.data_nasc);
                const dataFormatada = formatarData(pet.data_nasc);

                const petDiv = document.createElement('div');
                petDiv.classList.add('pet-profile');
                petDiv.innerHTML = `
                    <img src="/front/assets/${pet.img_cavalo}" alt="Foto do cavalo">
                    <div class="pet-info">
                        <h3>${pet.nome}</h3>
                        <p><strong>Raça:</strong> ${pet.raca}</p>
                        <p><strong>Data de Nascimento:</strong> ${dataFormatada} <strong>(Idade: ${idade} anos)</strong></p>
                        <p><strong>Gênero:</strong> ${pet.genero}</p>
                        <p><strong>Peso:</strong> ${pet.peso} kg</p>
                        <p><strong>Nível de Atividade:</strong> ${pet.nivel_atv}</p>
                    </div>
                `;
                petDiv.onclick = () => selecionarPet(pet);
                petContainer.appendChild(petDiv);
            });
        } else {
            Swal.fire({
                icon: "info",
                title: "Nenhum perfil encontrado",
                text: "Você ainda não cadastrou nenhum cavalo.",
                showConfirmButton: true
            });
        }
    }

    // Função para armazenar o cavalo selecionado e mostrar as informações de confirmação
    function selecionarPet(pet) {
        localStorage.setItem('idPet', pet.idpet);
        localStorage.setItem('nomePet', pet.nome);
        localStorage.setItem('raca', pet.raca);
        localStorage.setItem('dataNascPet', formatarData(pet.data_nasc));
        localStorage.setItem('idadePet', calcularIdade(pet.data_nasc));
        localStorage.setItem('generoPet', pet.genero);
        localStorage.setItem('pesoPet', pet.peso);
        localStorage.setItem('nivelAtvPet', pet.nivel_atv);
        localStorage.setItem('imgCavaloPet', pet.img_cavalo);

        Swal.fire({
            icon: "success",
            title: "Cavalo Selecionado!",
            text: `Cavalo ${pet.nome} foi selecionado com sucesso!`,
            showConfirmButton: true,
        }).then(() => {
            window.location.href = "/front/conteudoeducacional/index.html";
        });
    }

    await carregarPets();
});
