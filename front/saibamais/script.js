// Seleciona o elemento <button> ou outro elemento com o ID 'perfil' no documento HTML
const botao = document.getElementById('perfil');

// Adiciona um evento de clique ao botão
botao.onclick = function() {
    // Redireciona o usuário para a página 'cadastrarpet'
    window.location.href = "/front/cadastrarpet/index.html";
};
