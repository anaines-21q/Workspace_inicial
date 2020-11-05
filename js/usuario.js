document.addEventListener("DOMContentLoaded", function (e) {

    miusuario = document.getElementById("miusuario");

    var usuario = localStorage.getItem("miusuario");

    usuario = JSON.parse(usuario);


    if (usuario.email != null) {

        miusuario.innerHTML = usuario.email;


    }
})


function closesession() {
    location.href= "register.html"

}
