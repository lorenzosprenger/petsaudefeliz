document.addEventListener('DOMContentLoaded', async () => {
    // Função para buscar informações da raça
    const fetchBreedInfo = async (raca) => {
        if (!raca) return;

        try {
            // Construir a URL corretamente
            const url = `http://localhost:3001/educacional/${encodeURIComponent(raca)}`;
            console.log('URL da API:', url);

            // Buscar informações da raça da API
            const response = await fetch(url);
            console.log('Resposta da API:', response);

            if (!response.ok) {
                throw new Error('Erro na resposta da API');
            }

            const breedInfo = await response.json();
            console.log('Informações da raça recebidas:', breedInfo);

            // Exibir as informações da raça na página
            document.getElementById('informacao').innerText = `Origem: ${breedInfo.Origem}\nNome original: ${breedInfo.NomeOriginal}`;
            document.getElementById('texto').innerText = breedInfo.Texto;

            // Exibir a imagem da raça, se disponível
            if (breedInfo.Imagem) {
                const imageUrl = `${breedInfo.Imagem}`;
                const imgElement = document.getElementById('imagem');
                console.log(imageUrl);
                imgElement.src = imageUrl;
                imgElement.style.display = 'block';
            } else {
                document.getElementById('imagem').style.display = 'none';
            }
        } catch (error) {
            console.error('Erro ao buscar informações da raça:', error);
            document.getElementById('informacao').innerText = 'Erro ao buscar informações da raça';
            document.getElementById('texto').innerText = '';
        }
    };

    // Obter a raça do localStorage
    let raca = localStorage.getItem('raca');
    console.log('Raça obtida do localStorage:', raca);
    await fetchBreedInfo(raca);

    // Monitorar mudanças no localStorage
    window.addEventListener('storage', async (event) => {
        if (event.key === 'raca') {
            raca = event.newValue;
            console.log('Raça atualizada no localStorage:', raca);
            await fetchBreedInfo(raca);
        }
    });
});