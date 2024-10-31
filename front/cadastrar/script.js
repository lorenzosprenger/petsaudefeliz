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
        const imgPerfilNome = data.imgPerfil;

        let imgPerfilUrl;
        if (imgPerfilNome === 'Imagem Perfil Usuário 2.png') {
            // Usa a imagem padrão do diretório 'front/assets'
            imgPerfilUrl = `/front/assets/${imgPerfilNome}`;
        } else {
            // Usa a imagem carregada pelo usuário do diretório 'uploads/img_perfil'
            imgPerfilUrl = `/back/src/uploads/img_perfil/${imgPerfilNome}`;
        }

        document.getElementById('foto-perfil').src = imgPerfilUrl;
    } catch (error) {
        console.error('Erro ao carregar imagem de perfil:', error);
    }
}

// Obtém o elemento HTML com o ID 'botao_cadastrar' e o armazena na variável 'button'
let button = document.getElementById('botao_cadastrar');

// Define uma função assíncrona que será executada quando o botão for clicado
button.onclick = async function (e) {
    e.preventDefault(); // Previne o comportamento padrão do botão

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;
    let img_perfil = document.getElementById('img_perfil').files[0];

    // Verifica se algum dos campos obrigatórios está vazio
    if (!name || !email || !senha) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos.",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    // Cria um objeto FormData para incluir dados do formulário e o arquivo de imagem
    let formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("senha", senha);

    // Adiciona a imagem de perfil se selecionada, ou indica que deve usar a imagem padrão
    if (img_perfil) {
        formData.append("img_perfil", img_perfil);
    } else {
        formData.append("img_perfil", "default"); // Envia "default" como valor para indicar imagem padrão
    }

    // Envia uma requisição POST para o servidor com os dados do usuário
    const response = await fetch('http://localhost:3000/api/users/usuario', {
        method: "POST",
        body: formData, // Envia o FormData contendo os dados
    });

    // Aguarda a resposta do servidor e a converte para JSON
    let content = await response.json();
    console.log(content); // Exibe a resposta no console para depuração

    // Verifica se o cadastro foi realizado com sucesso
    if (content.success) {
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            // Salva o ID do usuário no localStorage
            localStorage.setItem('idUsuario', content.data.insertId);
            // Redireciona o usuário para a página de login após o cadastro
            window.location.href = "/front/login/index.html";
        }, 1500);
    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Conta já registrada!",
            showConfirmButton: false,
            timer: 1500
        });
    }
};

// Carrega a imagem de perfil ao carregar a página
window.onload = function() {
    carregarImagemPerfil(); // Chama a função de carregamento da imagem de perfil
};
