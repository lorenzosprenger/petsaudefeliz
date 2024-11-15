const userId = localStorage.getItem('idUsuario'); // Pegar o idUsuario do localStorage

document.getElementById('toggle-password').addEventListener('click', function () {
    const passwordInput = document.getElementById('password');
    const toggleButton = this;

    if (passwordInput.type === 'password') {
        passwordInput.type = 'text';
        toggleButton.textContent = 'Esconder';  // Altera o texto do botão
    } else {
        passwordInput.type = 'password';
        toggleButton.textContent = 'Mostrar';   // Volta o texto do botão para "Mostrar"
    }
});

// Função para buscar as informações do usuário e os pets do backend
function fetchUserProfileAndPets() {
    if (!userId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
    }

    // Primeira requisição: buscar os dados do perfil do usuário
    fetch('http://localhost:3000/api/users/listUsers')
        .then(response => response.json())
        .then(data => {
            console.log('Dados dos usuários recebidos:', data); // Verificar o retorno

            const usuario = data.data.find(user => user.id === parseInt(userId));

            if (usuario) {
                document.getElementById('name').value = usuario.name || '';
                document.getElementById('email').value = usuario.email || '';
            } else {
                console.error('Usuário não encontrado');
            }
        })
        .catch(error => console.error('Erro ao buscar perfil:', error));

    // Segunda requisição: buscar os pets do usuário
    fetch(`http://localhost:3000/api/users/${userId}/pets`)
        .then(response => response.json())
        .then(data => {
            console.log('Dados dos pets recebidos:', data);

            const petsList = document.getElementById('pets-list');
            petsList.innerHTML = ''; // Limpa a lista de pets anterior

            const petSelect = document.getElementById('pet-select');
            petSelect.innerHTML = '<option value="">Selecione um pet</option>';

            const pets = data.pets;

            if (pets.length === 0) {
                petsList.innerHTML = '<p>Nenhum pet cadastrado.</p>';
            } else {
                pets.forEach(pet => {
                    console.log('Dados completos do pet:', pet);

                    const petId = pet.idpet;
                    const petNome = pet.nome;

                    const petItem = document.createElement('div');
                    petItem.classList.add('pet-item');

                    const dataNascimento = new Date(pet.data_nasc).toLocaleDateString('pt-BR');

                    petItem.innerHTML = `
                        <strong>Nome:</strong> ${petNome} <br>
                        <strong>Raça:</strong> ${pet.raca} <br>
                        <strong>Data de Nascimento:</strong> ${dataNascimento} <br>
                        <strong>Gênero:</strong> ${pet.genero} <br>
                        <strong>Peso:</strong> ${pet.peso} kg <br>
                        <strong>Nível de Atividade:</strong> ${pet.nivel_atv}
                        <br><button class="delete-pet-button" data-pet-id="${petId}">Deletar</button>

                    `;

                    petsList.appendChild(petItem);

                    const option = document.createElement('option');
                    option.value = petId;
                    option.textContent = petNome;
                    petSelect.appendChild(option);
                });
            }

            // Evento de mudança para exibir detalhes do pet selecionado
            petSelect.addEventListener('change', function () {
                const selectedPetId = petSelect.value;
                console.log('ID do pet selecionado:', selectedPetId);

                if (selectedPetId && selectedPetId !== 'undefined') {
                    const selectedPet = pets.find(pet => pet.idpet == selectedPetId);

                    if (selectedPet) {
                        console.log('Pet selecionado:', selectedPet.nome);

                        // Chama a função para armazenar o pet selecionado
                        selecionarPet(selectedPet);

                        petsList.innerHTML = `
                            <div class="pet-item">
                                <strong>Nome:</strong> ${selectedPet.nome} <br>
                                <strong>Raça:</strong> ${selectedPet.raca} <br>
                                <strong>Data de Nascimento:</strong> ${new Date(selectedPet.data_nasc).toLocaleDateString('pt-BR')} <br>
                                <strong>Gênero:</strong> ${selectedPet.genero} <br>
                                <strong>Peso:</strong> ${selectedPet.peso} kg <br>
                                <strong>Nível de Atividade:</strong> ${selectedPet.nivel_atv}
                            </div>
                        `;
                    } else {
                        console.error('Pet não encontrado com o ID selecionado:', selectedPetId);
                    }
                } else {
                    petsList.innerHTML = '';
                    pets.forEach(pet => {
                        const petItem = document.createElement('div');
                        petItem.classList.add('pet-item');

                        const dataNascimento = new Date(pet.data_nasc).toLocaleDateString('pt-BR');

                        petItem.innerHTML = `
                            <strong>Nome:</strong> ${pet.nome} <br>
                            <strong>Raça:</strong> ${pet.raca} <br>
                            <strong>Data de Nascimento:</strong> ${dataNascimento} <br>
                            <strong>Gênero:</strong> ${pet.genero} <br>
                            <strong>Peso:</strong> ${pet.peso} kg <br>
                            <strong>Nível de Atividade:</strong> ${pet.nivel_atv}
                        `;

                        petsList.appendChild(petItem);
                    });
                }
            });
        })
        .catch(error => console.error('Erro ao buscar os pets:', error));
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
}

// Função para formatar a data de nascimento
function formatarData(data) {
    const date = new Date(data);
    return date.toLocaleDateString('pt-BR');
}

// Função para calcular a idade do pet
function calcularIdade(dataNascimento) {
    const nascimento = new Date(dataNascimento);
    const hoje = new Date();
    let idade = hoje.getFullYear() - nascimento.getFullYear();
    const mes = hoje.getMonth() - nascimento.getMonth();
    if (mes < 0 || (mes === 0 && hoje.getDate() < nascimento.getDate())) {
        idade--;
    }
    return idade;
}


// Função para enviar os dados editados do usuário e a imagem de perfil para o backend
document.getElementById('edit-profile-form').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o comportamento padrão de recarregar a página

    if (!userId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
    }

    const updatedData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
    };

    const senha = document.getElementById('password').value;
    if (senha) {
        updatedData.senha = senha;  // Enviar a senha somente se for alterada
    }

    // Log dos dados antes de enviar
    console.log('Dados enviados para atualização:', updatedData);

    // Chamada API para atualizar os dados do usuário
    try {
        const responseUserUpdate = await fetch(`http://localhost:3000/api/user/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!responseUserUpdate.ok) {
            const errData = await responseUserUpdate.json();
            console.error('Erro na resposta da API:', errData);
            throw new Error(`Erro na atualização do perfil: ${responseUserUpdate.status}`);
        }

        const resultUserUpdate = await responseUserUpdate.json();
        console.log('Resposta da API (atualização do usuário):', resultUserUpdate); // Loga a resposta da API
        if (resultUserUpdate.success) {
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar perfil: ' + resultUserUpdate.message);
        }
    } catch (error) {
        console.error('Erro ao atualizar perfil:', error);
        alert('Houve um erro ao atualizar o perfil.');
        return; // Interrompe a execução caso ocorra um erro
    }

    // Cria um FormData para enviar a imagem
    const img_perfil = document.getElementById('img_perfil').files[0];
    const formData = new FormData();
    
    if (img_perfil) {
        formData.append("img_perfil", img_perfil); // Adiciona o arquivo ao FormData
    } else {
        console.error("Nenhuma imagem selecionada"); // Mensagem de erro caso o arquivo não esteja presente
        return;
    }
    
    console.log("Conteúdo do FormData:", formData.get("img_perfil"));

    // Chamada API para enviar a imagem de perfil
    try {
        const responseImageUpdate = await fetch(`http://localhost:3000/api/users/${userId}/img/perfil`, {
            method: 'PUT',
            body: formData // FormData contém o arquivo de imagem
        });
    
        if (!responseImageUpdate.ok) {
            throw new Error('Erro ao enviar a imagem. Código: ' + responseImageUpdate.status);
        }
    
        const resultImageUpdate = await responseImageUpdate.json();
        console.log('Resposta da API (atualização da imagem):', resultImageUpdate);
        alert("Imagem enviada com sucesso!");

        
    } catch (error) {
        console.error("Erro ao fazer upload:", error);
        alert('Houve um erro ao enviar a imagem.');
    }    
});


// Função para carregar a imagem de perfil do usuário
async function carregarImagemPerfil() {
    const userId = localStorage.getItem("idUsuario");

    if (!userId) {
        console.error("ID do usuário não encontrado no localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/buscar/img/perfil`);
        if (!response.ok) {
            throw new Error("Erro ao buscar a imagem de perfil");
        }

        const data = await response.json();
        const imgPerfilNome = data.imgPerfil;
        let imgPerfilUrl;
        console.log(imgPerfilNome)
        // Verifica se a imagem é a padrão e define o caminho correspondente
        if (imgPerfilNome === "Imagem Perfil Usuário 2.png") {
            imgPerfilUrl = `/front/assets/${imgPerfilNome}`;
        } else {
            imgPerfilUrl = `/back/src/uploads/img_perfil/${imgPerfilNome}`;
        }
        console.log(imgPerfilUrl)

        document.getElementById("foto-perfil").src = imgPerfilUrl;
    } catch (error) {
        console.error("Erro ao carregar imagem de perfil:", error);
    }
}

// Event listener para o botão de deletar com SweetAlert2 para confirmação e exclusão de pet
document.addEventListener('click', async (event) => {
    if (event.target.classList.contains('delete-pet-button')) {
        const petId = event.target.getAttribute('data-pet-id');
        const petItem = event.target.closest('.pet-item');

        const confirmation = await Swal.fire({
            title: 'Tem certeza?',
            text: "Você realmente deseja deletar este pet?",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ff4040',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sim, deletar!',
            cancelButtonText: 'Cancelar'
        });
        console.log("ID do pet para exclusão:", petId);

        if (confirmation.isConfirmed) {
            try {
                const response = await fetch(`http://localhost:3000/api/pet/${12}/delete`, {
                    method: 'DELETE'
                });
                const result = await response.json();

                if (response.ok && result.success) {
                    console.log("Resposta da API (exclusão do pet):", result); // Adicione este log
                    Swal.fire('Deletado!', 'O pet foi removido.', 'success');
                    petItem.remove(); // Remove o pet da interface imediatamente
                } else {
                    console.log("Erro da API (exclusão do pet):", result); // Adicione este log
                    Swal.fire('Erro!', result.message || 'Erro ao deletar o pet.', 'error');
                }
                

                if (response.ok && result.success) {
                    Swal.fire('Deletado!', 'O pet foi removido.', 'success');
                    petItem.remove(); // Remove o pet da interface imediatamente
                } else {
                    Swal.fire('Erro!', result.message || 'Erro ao deletar o pet.', 'error');
                }
            } catch (error) {
                console.error('Erro ao deletar pet:', error);
                Swal.fire('Erro!', 'Não foi possível deletar o pet.', 'error');
                fetchUserProfileAndPets(); // Atualiza a lista de pets se houve erro
            }
        }
    }
});

document.getElementById('register-equine-button').addEventListener('click', function() {
    Swal.fire({
        title: 'Tem certeza?',
        text: "Você deseja criar um novo cadastro de equino?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, cadastrar!',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            window.location.href = '/front/cadastrarpet/index.html'; // Redireciona para a página de cadastro de pet
        }
    });
});

// Chama a função para buscar os dados do perfil e dos pets quando a página é carregada
window.onload = function() {
    carregarImagemPerfil();
    fetchUserProfileAndPets(); // Função para buscar o perfil e os pets

};