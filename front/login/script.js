// Seleciona o elemento <button> no documento HTML
let button = document.querySelector('button');

// Adiciona um evento de clique ao botão
button.onclick = async function (e) {
    // Cancela o comportamento padrão do evento, que seria enviar um formulário ou seguir um link
    e.preventDefault();

    // Obtém o valor do campo de entrada com o ID 'email'
    let email = document.getElementById('email').value;
    // Obtém o valor do campo de entrada com o ID 'senha'
    let senha = document.getElementById('senha').value;

    // Cria um objeto com os valores de email e senha
    let data = { email, senha }

    // Envia uma requisição GET para o servidor na rota '/api/users/listUsers'
    const response = await fetch('http://localhost:3000/api/users/listUsers', {
        method: "GET", // Define o método da requisição como GET
        headers: { "Content-type": "application/json;charset=UTF-8" } // Define o cabeçalho da requisição, especificando que o conteúdo é JSON
    });

    // Converte a resposta da requisição para JSON
    let content = await response.json();
    // Exibe o conteúdo da resposta no console
    console.log(content);

    // Itera sobre cada item na lista de usuários retornada
    for (let i = 0; i < content.data.length; i++) {
        // Verifica se o email e a senha inseridos correspondem ao usuário atual na iteração
        console.log(content.data[i].email === email && content.data[i].senha === senha);
        if (content.data[i].email === email && content.data[i].senha === senha) {
            // Se houver correspondência, salva o ID e o nome do usuário no localStorage
            localStorage.setItem("idUsuario", content.data[i].id);
            localStorage.setItem("nomeUsuario", content.data[i].name);
            
            // Exibe uma mensagem de sucesso usando SweetAlert2
            Swal.fire({
                icon: "success",
                title: "Login realizado com sucesso!",
                showConfirmButton: false,
                timer: 1500
            });

            // Redireciona o usuário para a página de 'saibamais' após 1,5 segundos
            setTimeout(() => {
                window.location.href = "../../front/saibamais/index.html"
            }, 1500);

            // Interrompe a iteração uma vez que o usuário foi encontrado e autenticado
            break;
        } else {
            // Se não houver correspondência, exibe uma mensagem de erro usando SweetAlert2
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Conta não encontrada!",
                showConfirmButton: false,
                timer: 1500
            });
        }
    }
}
