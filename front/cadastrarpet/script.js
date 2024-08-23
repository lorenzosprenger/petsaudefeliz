// Obtém o elemento HTML com o ID 'criar' e o armazena na variável 'butao'
const butao = document.getElementById('criar');

// Define uma função assíncrona que será executada quando o botão for clicado
butao.onclick = async function (e) {
    // Previne o comportamento padrão do botão, que seria submeter um formulário, se houver
    e.preventDefault();

    // Obtém o valor do campo de entrada com o ID 'nome'
    let nome = document.getElementById('nome').value;
    // Obtém o valor do campo de entrada com o ID 'raca'
    let raca = document.getElementById('raca').value;
    // Obtém o valor do campo de entrada com o ID 'data_nasc'
    let data_nasc = document.getElementById('data_nasc').value;
    // Obtém o valor do campo de entrada com o ID 'genero'
    let genero = document.getElementById('genero').value;
    // Obtém o valor do campo de entrada com o ID 'peso'
    let peso = document.getElementById('peso').value;
    // Obtém o valor do campo de entrada com o ID 'nivel_atv'
    let nivel_atv = document.getElementById('nivel_atv').value;
    // Obtém o valor armazenado no localStorage com a chave 'nomeUsuario'
    let nomeUsuario = localStorage.getItem('nomeUsuario');
    // Obtém o valor armazenado no localStorage com a chave 'idUsuario'
    let usuario_id = localStorage.getItem('idUsuario');
    
    // Armazena o nome do pet no localStorage com a chave 'nomePet'
    localStorage.setItem("nomePet", nome);

    // Verifica se algum dos campos obrigatórios está vazio
    if (!nome || !raca || !data_nasc || !genero || !peso || !nivel_atv) {
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

    // Cria um objeto 'data' contendo os dados do formulário e o ID do usuário
    let data = { nome, raca, data_nasc, genero, peso, nivel_atv, usuario_id };

    // Envia uma requisição POST para o servidor com os dados do pet
    const response = await fetch('http://localhost:3000/api/users/pet', {
        method: "POST", // Define o método HTTP como POST
        headers: { "Content-type": "application/json;charset=UTF-8" }, // Define o cabeçalho da requisição como JSON
        body: JSON.stringify(data) // Converte o objeto 'data' para JSON e o inclui no corpo da requisição
    });

    // Aguarda a resposta do servidor e a converte para JSON
    let content = await response.json();
    console.log(content); // Exibe a resposta no console para depuração

    // Verifica se o cadastro foi realizado com sucesso
    if (content.success) {
        // Armazena a raça do pet no localStorage com a chave 'raca'
        localStorage.setItem("raca", raca);
        // Exibe um alerta de sucesso usando a biblioteca Swal
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        // Redireciona o usuário para outra página após 1,5 segundos
        setTimeout(() => {
            window.location.href = "/front/conteudoeducacional/index.html";
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
    };
}
