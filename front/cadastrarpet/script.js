
const butao = document.getElementById('criar');

butao.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro
    let idPet = Number(localStorage.getItem('idUsuario'));
    let nome = document.getElementById('nome').value;
    let raca = document.getElementById('raca').value;
    let data_nasc = document.getElementById('data_nasc').value;
    let genero = document.getElementById('genero').value;
    let peso = document.getElementById('peso').value;
    let nivel_atv = document.getElementById('nivel_atv').value;
    let nomeUsuario = localStorage.getItem('nomeUsuario');
    console.log(nomeUsuario);
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

    let data = { idPet, nome, raca, data_nasc, genero, peso, nivel_atv, nomeUsuario}

    // POST
    const response = await fetch('http://localhost:3000/api/users/pet', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)

    });

    

    let content = await response.json();
    console.log(content);

    if (content.success) {
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
    };
}