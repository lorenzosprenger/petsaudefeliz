const butao = document.getElementById('criar');
const possuiContaBtn = document.getElementById('possuiconta'); // Corrigido o nome da variável

// Função para verificar se o usuário tem algum cavalo cadastrado
async function verificarCadastroPet() {
    const userId = localStorage.getItem('idUsuario');
    const response = await fetch(`http://localhost:3000/api/users/${userId}/pets`);
    const result = await response.json();

    if (!result.success || result.pets.length === 0) {
        Swal.fire({
            icon: "warning",
            title: "Atenção",
            text: "Você precisa cadastrar um perfil para o cavalo antes de acessar esta opção.",
            showConfirmButton: true
        });
        return false;
    }
    return true;
}

// Evento de clique no botão "Já tenho perfil do pet"
possuiContaBtn.onclick = async function (e) {
    e.preventDefault();
    const possuiPet = await verificarCadastroPet();
    if (possuiPet) {
        window.location.href = "/front/selecionarPet/index.html";
    }
};

butao.onclick = async function (e) {
    e.preventDefault();

    let nome = document.getElementById('nome').value;
    let raca = document.getElementById('raca').value;
    let data_nasc = document.getElementById('data_nasc').value;
    let genero = document.getElementById('genero').value;
    let peso = document.getElementById('peso').value;
    let nivel_atv = document.getElementById('nivel_atv').value;
    let usuario_id = localStorage.getItem('idUsuario');
    let img_cavalo = document.getElementById('img_cavalo').files[0];

    if (!nome || !raca || !data_nasc || !genero || !peso || !nivel_atv) {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Por favor, preencha todos os campos.",
            showConfirmButton: false,
            timer: 1500
        });
        return;
    }

    // Define imagem padrão com base na raça, caso o usuário não selecione uma imagem
    const imgPadrao = {
        "Crioulo": "Crioulo.png",
        "Quarter Horse": "QuarterHorse.png",
        "Mangalarga": "Mangalarga.png"
    };

    let formData = new FormData();
    formData.append("nome", nome);
    formData.append("raca", raca);
    formData.append("data_nasc", data_nasc);
    formData.append("genero", genero);
    formData.append("peso", peso);
    formData.append("nivel_atv", nivel_atv);
    formData.append("usuario_id", usuario_id);
    
    // Adiciona a imagem selecionada ou a imagem padrão baseada na raça
    formData.append("img_cavalo", img_cavalo || imgPadrao[raca]);

    const response = await fetch('http://localhost:3000/api/users/pet', {
        method: "POST",
        body: formData
    });

    const content = await response.json();
    console.log(content);

    if (content.success) {
        localStorage.setItem("idPet", content.data.insertId);
        localStorage.setItem("raca", raca);
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });
        setTimeout(() => {
            window.location.href = "/front/conteudoeducacional/index.html";
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
