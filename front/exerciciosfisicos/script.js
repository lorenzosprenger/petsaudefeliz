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



document.addEventListener('DOMContentLoaded', async () => {
    const idPet = localStorage.getItem('idUsuario');

    try {
        const response = await fetch(`http://localhost:3002/plano_pet/${idPet}`);
        const plan = await response.json();

        if (plan.error) {
            alert('Erro ao buscar o plano de exercícios físicos: ' + plan.error);
            return;
        }

        const tableBody = document.getElementById('exercise-plan-table-body');
        tableBody.innerHTML = ''; // Limpa o conteúdo existente

        plan.exercisePlan.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.Dia}</td>
                <td>${item.Atividades}</td>
                <td>${item.Horário}</td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error('Erro ao buscar o plano de exercícios físicos:', error);
        alert('Erro ao buscar o plano de exercícios físicos: ' + error.message);
    }
});

// Chama a função para buscar os dados do perfil e dos pets quando a página é carregada
window.onload = function() {
    carregarImagemPerfil();

};