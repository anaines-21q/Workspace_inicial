// Name and Password from the register-form


// storing input from register-form

function store() {
     var newemail = document.getElementById('newemail').value;
     var newpassword = document.getElementById('newpassword').value;
     if (newemail == 0 || (newpassword == 0)) {
          alert("Falta Email o Contraseña");
     }
     else if (pswrepeat.value !== newpassword) {
          alert("Ingrese nuevamente su contraseña");
     }
     else {


          localStorage.setItem("miusuario", JSON.stringify(
               
               {
                    email: newemail,
                    pwd: newpassword,
               }

          ));

          alert("Quedaste registrado!");
          location.href = "index.html";
     }

}

// check if stored data from register-form is equal to entered data in the login-form
function usuario() {

     // entered data from the login-form
     var email = document.getElementById("emaillogin").value;

     var password = document.getElementById('password').value;

     // stored data from the register-form

     var usuario = localStorage.getItem("miusuario");
     usuario = JSON.parse(usuario);


     // check if stored data from register-form is equal to data from login form
     if ((usuario.email != null) && (usuario.email == email) && (pwd = password)) {
          window.location.href = "homepage.html";
     } else {
          alert('nooooo tenes usuario!');
     }
}











