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

// Função para enviar a imagem do cavalo
async function uploadCavaloImage() {
    const idpet = localStorage.getItem("idPet");
    if (!idpet) {
        console.error("ID do pet não encontrado no localStorage");
        return;
    }

    const img_cavalo = document.getElementById("img_cavalo").files[0];
    if (!img_cavalo) {
        console.error("Nenhuma imagem do cavalo selecionada");
        return;
    }

    const formData = new FormData();
    formData.append("img_cavalo", img_cavalo);

    try {
        const response = await fetch(`http://localhost:3000/api/pets/${idpet}/img/cavalo`, {
            method: "PUT",
            body: formData,
        });

        if (!response.ok) {
            throw new Error("Erro ao enviar a imagem do cavalo");
        }

        const result = await response.json();
        console.log("Resposta da API (atualização da imagem do cavalo):", result);
        alert("Imagem do cavalo enviada com sucesso!");
        carregarImagemCavalo();
    } catch (error) {
        console.error("Erro ao enviar a imagem do cavalo:", error);
    }
}

// Função para carregar a imagem do cavalo
async function carregarImagemCavalo() {
    const idpet = localStorage.getItem("idPet");

    if (!idpet) {
        console.error("ID do pet não encontrado no localStorage");
        return;
    }

    try {
        const response = await fetch(`http://localhost:3000/api/pets/${idpet}/buscar/img/cavalo`);
        if (!response.ok) {
            throw new Error("Erro ao buscar a imagem do cavalo");
        }

        const data = await response.json();
        const imgCavaloUrl = data.imgCavalo;

        if (imgCavaloUrl) {
            const cavaloImg = document.getElementById("foto-cavalo");
            cavaloImg.src = imgCavaloUrl;
            cavaloImg.style.display = "block";
        } else {
            console.warn("Imagem do cavalo não encontrada");
        }
    } catch (error) {
        console.error("Erro ao carregar imagem do cavalo:", error);
    }
}

// Função para exibir os nomes do pet e do dono
const displayPetOwnerNames = () => {
    const petName = localStorage.getItem("nomePet") || "Nome do Pet não encontrado";
    const ownerName = localStorage.getItem("nomeUsuario") || "Nome do Dono não encontrado";
    document.getElementById("petInfo").innerText = `Nome do Pet: ${petName}\nNome do Dono: ${ownerName}`;
};

// Função para buscar informações da raça a partir de uma API
const fetchBreedInfo = async (raca) => {
    if (!raca) return;

    try {
        const url = `http://localhost:3001/educacional/${encodeURIComponent(raca)}`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Erro na resposta da API");
        }

        const breedInfo = await response.json();
        document.getElementById("informacao").innerText = `Origem: ${breedInfo.Origem}\nNome original: ${breedInfo.NomeOriginal}`;
        document.getElementById("texto").innerText = breedInfo.Texto;

        if (breedInfo.Imagem) {
            const imageUrl = `/front/assets/${breedInfo.Imagem}`;
            const imgElement = document.getElementById("imagem");
            imgElement.src = imageUrl;
            imgElement.style.display = "block";
        } else {
            document.getElementById("imagem").style.display = "none";
        }
    } catch (error) {
        console.error("Erro ao buscar informações da raça:", error);
        document.getElementById("informacao").innerText = "Erro ao buscar informações da raça";
        document.getElementById("texto").innerText = "";
    }
};

// Inicialização ao carregar a página
window.onload = function () {
    carregarImagemPerfil();
    carregarImagemCavalo();
    displayPetOwnerNames();

    const raca = localStorage.getItem("raca");
    fetchBreedInfo(raca);
};
