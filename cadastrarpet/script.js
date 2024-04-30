document.addEventListener("DOMContentLoaded", function() {
    const teste = document.getElementById("teste");
    const select = document.getElementById("nivelAtividade");

    teste.addEventListener("click", function() {
        const isVisible = select.style.display === "block";

        select.style.display = isVisible ? "none" : "block";
    });

    document.addEventListener("click", function(event) {
        if (event.target !== teste && event.target !== select) {
            select.style.display = "none";
        }
    });
});
