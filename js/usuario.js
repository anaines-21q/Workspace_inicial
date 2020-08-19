document.addEventListener("DOMContentLoaded", function (e) {
    miusuario = document.getElementById("miusuario");
    var email = localStorage.key(0);
    if (email !=0){

   miusuario.innerHTML = email;
    
    }   
    else {
        location.href = "index.html"}
})
})

