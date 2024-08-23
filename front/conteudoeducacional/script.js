// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', async () => {
    // Função para buscar informações da raça a partir de uma API
    const fetchBreedInfo = async (raca) => {
        if (!raca) return; // Retorna se a raça não for fornecida

        try {
            // Constrói a URL da API usando a raça e codifica corretamente o parâmetro
            const url = `http://localhost:3001/educacional/${encodeURIComponent(raca)}`;
            console.log('URL da API:', url);

            // Faz uma requisição para buscar informações da raça na API
            const response = await fetch(url);
            console.log('Resposta da API:', response);

            // Verifica se a resposta não foi bem-sucedida
            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }

            // Converte a resposta da API para JSON
            const breedInfo = await response.json();
            console.log('Informações da raça recebidas:', breedInfo);

            // Exibe as informações da raça na página
            document.getElementById('informacao').innerText = `Origem: ${breedInfo.Origem}\nNome original: ${breedInfo.NomeOriginal}`;
            document.getElementById('texto').innerText = breedInfo.Texto;

            // Exibe a imagem da raça, se disponível
            if (breedInfo.Imagem) {
                const imageUrl = `/front/assets/${breedInfo.Imagem}`;
                const imgElement = document.getElementById('imagem');
                console.log(imageUrl);
                imgElement.src = imageUrl; // Define a URL da imagem
                imgElement.style.display = 'block'; // Exibe a imagem
            } else {
                document.getElementById('imagem').style.display = 'none'; // Esconde a imagem se não disponível
            }
        } catch (error) {
            // Trata erros durante a busca das informações da raça
            console.error('Erro ao buscar informações da raça:', error);
            document.getElementById('informacao').innerText = 'Erro ao buscar informações da raça';
            document.getElementById('texto').innerText = '';
        }
    };

    // Função para exibir os nomes do pet e do dono
    const displayPetOwnerNames = () => {
        // Obtém o nome do pet e do dono do localStorage
        const petName = localStorage.getItem('nomePet') || 'Nome do Pet não encontrado';
        const ownerName = localStorage.getItem('nomeUsuario') || 'Nome do Dono não encontrado';
        // Exibe os nomes na página
        document.getElementById('petInfo').innerText = `Nome do Pet: ${petName}\nNome do Dono: ${ownerName}`;
    };

    // Obtém a raça do localStorage
    let raca = localStorage.getItem('raca');
    console.log('Raça obtida do localStorage:', raca);

    // Busca as informações da raça e exibe os nomes do pet e do dono
    await fetchBreedInfo(raca);
    displayPetOwnerNames();

    // Monitora mudanças no localStorage para atualizar a página em tempo real
    window.addEventListener('storage', async (event) => {
        if (event.key === 'raca') {
            raca = event.newValue; // Atualiza a raça quando o localStorage mudar
            console.log('Raça atualizada no localStorage:', raca);
            await fetchBreedInfo(raca); // Busca e exibe as novas informações da raça
        }
        if (event.key === 'nomePet' || event.key === 'nomeDono') {
            displayPetOwnerNames(); // Atualiza os nomes do pet e do dono quando o localStorage mudar
        }
    });
});
