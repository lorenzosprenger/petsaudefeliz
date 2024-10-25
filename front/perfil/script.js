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

// Função para enviar os dados editados do usuário para o backend
document.getElementById('edit-profile-form').addEventListener('submit', function(event) {
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
    fetch(`http://localhost:3000/api/user/${userId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (!response.ok) {
            // Log detalhado da resposta para debugar
            return response.json().then(errData => {
                console.error('Erro na resposta da API:', errData);
                throw new Error(`Erro na atualização do perfil: ${response.status}`);
            });
        }
        return response.json(); // Processa a resposta como JSON
    })
    .then(data => {
        console.log('Resposta da API (atualização):', data); // Loga a resposta da API
        if (data.success) {
            alert('Perfil atualizado com sucesso!');
        } else {
            alert('Erro ao atualizar perfil: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Erro ao atualizar perfil:', error);
        alert('Houve um erro ao atualizar o perfil.');
    });
});


let botao = document.getElementById('edit-button');

let img_perfil = null;
botao.onclick = async function(e){
    e.preventDefault()

    let input_file = document.getElementById('img_perfil').value;
    console.log(input_file);

    let formData = new FormData();

    if (img_perfil) {
      console.log("Arquivo de imagem selecionado:", img_perfil);
      formData.append("im", img_perfil);
    }

    console.log(formData);

    // PUT
    // const response = await fetch(
    //   `http://localhost:3000/api/users/${userId}/img/perfil`,
    //   {
    //     method: "PUT",
    //     body: formData, // Enviando todos os dados e a imagem juntos
    //   }
    // );

    // let content = await response.json();
    // console.log(content);

    // if(content.success) {
    //     alert("funfou!");
    // }
    // else {
    //     alert("deu merda!")
    // }
}


// Chama a função para buscar os dados do perfil e dos pets quando a página é carregada
window.onload = function() {
    fetchUserProfileAndPets(); // Função para buscar o perfil e os pets
};
