// Obtém o elemento HTML com o ID 'botao_cadastrar' e o armazena na variável 'button'
let button = document.getElementById('botao_cadastrar');

// Define uma função assíncrona que será executada quando o botão for clicado
button.onclick = async function (e) {
    // Previne o comportamento padrão do botão, que seria submeter um formulário, se houver
    e.preventDefault();

    // Obtém o valor do campo de entrada com o ID 'name'
    let name = document.getElementById('name').value;
    // Obtém o valor do campo de entrada com o ID 'email'
    let email = document.getElementById('email').value;
    // Obtém o valor do campo de entrada com o ID 'senha'
    let senha = document.getElementById('senha').value;

    // Verifica se algum dos campos obrigatórios está vazio
    if (!name || !email || !senha) {
        // Exibe um alerta de erro usando a biblioteca Swal (SweetAlert2) se algum campo estiver vazio
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos.",
            showConfirmButton: false,
            timer: 1500
        });
        return; // Interrompe a execução da função se houver campos vazios
    }

    // Cria um objeto 'data' contendo os dados do formulário
    let data = { name, email, senha };

    // Envia uma requisição POST para o servidor com os dados do usuário
    const response = await fetch('http://localhost:3000/api/users/usuario', {
        method: "POST", // Define o método HTTP como POST
        headers: { "Content-type": "application/json;charset=UTF-8" }, // Define o cabeçalho da requisição como JSON
        body: JSON.stringify(data) // Converte o objeto 'data' para JSON e o inclui no corpo da requisição
    });

    // Aguarda a resposta do servidor e a converte para JSON
    let content = await response.json();
    console.log(content); // Exibe a resposta no console para depuração

    // Verifica se o cadastro foi realizado com sucesso
    if (content.success) {
        // Exibe um alerta de sucesso usando a biblioteca Swal
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        // Redireciona o usuário para a página de login após 1,5 segundos
        setTimeout(() => {
            window.location.href = "/front/login/index.html";
        }, 1500);
    } else {
        // Se o cadastro falhar (por exemplo, se a conta já estiver registrada), exibe um alerta de erro
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Conta já registrada!",
            showConfirmButton: false,
            timer: 1500
        });
    }
};
