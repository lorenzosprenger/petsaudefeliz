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

            // Encontrar o usuário específico com base no ID salvo no localStorage
            const usuario = data.data.find(user => user.id === parseInt(userId));

            if (usuario) {
                // Preencher os campos com os dados do usuário
                document.getElementById('name').value = usuario.name || '';
                document.getElementById('email').value = usuario.email || '';
                // O campo de senha não é preenchido por segurança
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

            // Exibir a lista de pets
            const petsList = document.getElementById('pets-list');
            petsList.innerHTML = ''; // Limpa a lista de pets anterior

            if (data.pets.length === 0) {
                petsList.innerHTML = '<p>Nenhum pet cadastrado.</p>';
            } else {
                data.pets.forEach(pet => {
                    const petItem = document.createElement('div');
                    petItem.classList.add('pet-item');

                    // Formatar a data de nascimento
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
        })
        .catch(error => console.error('Erro ao buscar os pets:', error));
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
    const userId = localStorage.getItem('idUsuario'); // Obtém o ID do usuário

    if (!userId) {
        console.error('ID do usuário não encontrado no localStorage');
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/users/${userId}/buscar/img/perfil`);
        if (!response.ok) {
            throw new Error('Erro ao buscar a imagem de perfil');
        }

        const data = await response.json();
        const imgPerfilUrl = data.imgPerfil;

        if (imgPerfilUrl) {
            // Define a URL completa da imagem de perfil no elemento HTML
            document.getElementById('foto-perfil').src = imgPerfilUrl;
        } else {
            console.warn('Imagem de perfil não encontrada');
        }
    } catch (error) {
        console.error('Erro ao carregar imagem de perfil:', error);
    }
}





// Chama a função para buscar os dados do perfil e dos pets quando a página é carregada
window.onload = function() {
    carregarImagemPerfil();
    fetchUserProfileAndPets(); // Função para buscar o perfil e os pets

};