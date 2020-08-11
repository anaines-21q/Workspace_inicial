// Name and Password from the register-form
var newemail = document.getElementById('newemail');
var newpassword = document.getElementById('newpassword');

// storing input from register-form (key , value)
function store() {
    localStorage.setItem(newemail.value, newpassword.value);
 alert("Quedaste registrado!");}

// check if stored data from register-form is equal to entered data in the login-form
function usuario() {

 // entered data from the login-form
 var email = document.getElementById("emaillogin").value;
 
 var password = document.getElementById('password').value;

// stored data from the register-form
var pwd = localStorage.getItem(email);

// check if stored data from register-form is equal to data from login form
if (pwd != null && (pwd == password))
 {
    window.location.href="homepage.html";
    }else {
        alert('nooooo tenes usuario!');
    }
}
