let button = document.querySelector('button');

button.onclick = async function (e) {
    e.preventDefault();
    //cancela o comportamento padrão de um formulario, tem que colocar o "e" no parametro

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let senha = document.getElementById('senha').value;


    let data = { name, email, senha }

    // POST
    const response = await fetch('http://localhost:3000/api/users', {
        method: "POST",
        headers: { "Content-type": "application/json;charset=UTF-8" },
        body: JSON.stringify(data)
    });

    let content = await response.json();
    console.log(content);

    if (content.success) {
        Swal.fire({
            icon: "success",
            title: "Cadastro realizado com sucesso!",
            showConfirmButton: false,
            timer: 1500
        });

    } else {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Conta já registrada!",
            showConfirmButton: false,
            timer: 1500
        });
    };
};