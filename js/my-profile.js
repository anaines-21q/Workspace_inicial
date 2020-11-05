//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {

    var usuario = localStorage.getItem("miusuario");

    usuario = JSON.parse(usuario);
    if (usuario.email != null) {
        document.getElementById("email").value = usuario.email;
        document.getElementById("miusuario2").value = usuario.email;
    }
    if (usuario.nombre1 != null) {
        document.getElementById("PrimerNombre").value = usuario.nombre1;
    }
    if (usuario.nombre2 != null) {
        document.getElementById("SegundoNombre").value = usuario.nombre2;
    }
    if (usuario.apellido1 != null) {
        document.getElementById("PrimerApellido").value = usuario.apellido1;
    }
    if (usuario.apellido2 != null) {
        document.getElementById("SegundoApellido").value = usuario.apellido2;
    }
    if (usuario.telefono != null) {
        document.getElementById("telefono").value = usuario.tel;
    }

});


function infousuario() {
    var usuario = localStorage.getItem("miusuario");

    info = JSON.parse(usuario);

    var email = document.getElementById("email").value;
    var PrimerNombre = document.getElementById("PrimerNombre").value;
    var SegundoNombre = document.getElementById("SegundoNombre").value;
    var PrimerApellido = document.getElementById("PrimerApellido").value;
    var SegundoApellido = document.getElementById("SegundoApellido").value;
    var telefono = document.getElementById("telefono").value;


    let registro =
    {
        email: email,
        nombre1: PrimerNombre,
        nombre2: SegundoNombre,
        apellido1: PrimerApellido,
        apellido2: SegundoApellido,
        tel: telefono
    }

    info.push(registro);
    localStorage.setItem("miusuario", JSON.stringify(info))
}
