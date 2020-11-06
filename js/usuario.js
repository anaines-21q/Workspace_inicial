document.addEventListener("DOMContentLoaded", function (e) {

    

    var usuario = localStorage.getItem("miusuario");

    usuario = JSON.parse(usuario);


    if (usuario.email && document.getElementById("miusuario") ) {
        miusuario = document.getElementById("miusuario");
        miusuario.innerHTML = usuario.email;


    }
})


function closesession() {
    window.location.href = "index.html";
}
