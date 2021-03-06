let envioPercentage = 0.05;
var currentProductsArray = [];
let Cotizacion = 40;

var currency = []
var precio = []
var cantidad = []

var subtotal = 0;
var valorenvio = 0;
var total = 0;



function showArticlesList(currentArticlesArray) {
    let htmlContentToAppend = "";
    for (let i = 0; i < currentArticlesArray.length; i++) {
        let articulo = currentArticlesArray[i];

        htmlContentToAppend += `
        <div class="container-fluid">
    <div class="prod" id="prod`+ i + `">
    <div class="row">
    <div class="col md-3"><img class="img-thumbnail rounded float-left" style="max-width:30%" src="` + articulo.src + `" alt="` + articulo.name + `" >
    </div>
    <div class="col md-3"><p>`+ articulo.name + `</p></div>
    <div class="col md-2"><p>`+ articulo.currency + `` + " " + `` + articulo.unitCost + `</p></div>
    <div class="col md-2">
    <input type="number" class="input btn-block" id= "quantity` + i + ` placeholder="" required="" value="1" min="0"></div>
    <div class="col md-1"><span class="subtotalitem"><p>` + articulo.currency + " " + (articulo.unitCost * articulo.count) + `</span></p></div>
    <div class="col md-1"><button type="button" class="btn btn-danger eliminar btn-block " onclick="eliminar(`+ i + `)"  id= "eliminar` + i + `">Eliminar articulo</button></div>
    </div>
    </div>

    </div>
    <hr class=my-3>
    `


        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;

        subtotales(articulo, i)

    }
    dinamic();
}//}


function subtotales(articulo, i) {

    cantidad[i] = articulo.count; //cantidad articulos JSON
    currency[i] = articulo.currency; // moneda JSON
    if (currency[i] == "USD") { //si esta en dolares
        precio[i] = articulo.unitCost;
        subtotal += precio[i] * cantidad[i] * Cotizacion; //paso subtotal: precio por cantidad a pesos uruguayos
    } else {
        precio[i] = articulo.unitCost;
        subtotal += precio[i] * cantidad[i];//paso subtotal final: precio por cantidad en moneda UYU 
    }

    document.getElementById("prodxcant").innerHTML = "UYU " + subtotal; //paso a mi HTML el subtotal

    updateTotalCosts(); // actualizo costos totales

}










function updateTotalCosts() {//actualizar costos finales

    valorenvio = Math.round(subtotal * envioPercentage);
    document.getElementById("porenvio").innerHTML = "UYU " + valorenvio;
    total = subtotal + valorenvio;
    document.getElementById("total").innerHTML = "UYU " + total;

}

function dinamic() {

    let prod = document.getElementsByClassName("prod");
    let subtotalitem = document.getElementsByClassName("subtotalitem");

    for (let j = 0; j < prod.length; j++) {

        prod[j].addEventListener("change", function () {
            console.log(j);
            console.log(this.id)
            cantidad[j] = document.getElementsByClassName("input")[j].value; //tomo el valor del input de cantidades
            subtotalitem[j].innerHTML = currency[j] + " " + (precio[j] * cantidad[j]); //modifico subtotal de cada uno

            subtotal = 0;
            for (h = 0; h < prod.length; h++) {
                if (currency[h] == "USD") {
                    subtotal += Math.round(precio[h] * cantidad[h] * Cotizacion);//paso a UYU nuevo subtotal
                } else {
                    subtotal += Math.round(precio[h] * cantidad[h]);
                }
            }

            document.getElementById("prodxcant").innerHTML = "UYU " + subtotal; //subtotal final en html

            updateTotalCosts(); //actualizo costos finales

        })
    }
}


function eliminar(i) {
    let prod = document.getElementById("prod" + i);
    prod.remove();
    delete articulo.articles[i];

    for (h = 0; h < prod.length; h++) {
        if (currency[h] == "USD") {
            subtotal += Math.round(precio[h] * cantidad[h] * Cotizacion);//paso a UYU nuevo subtotal
        } else {
            subtotal += Math.round(precio[h] * cantidad[h]);
        }

    }

    document.getElementById("prodxcant").innerHTML = "UYU " + subtotal; //subtotal final en html

    updateTotalCosts(); //actualizo costos finales




}







document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_BUY_URL_DES).then(function (resultObj) {
        if (resultObj.status === "ok") {
            articulo = resultObj.data;



            showArticlesList(articulo.articles);

            document.getElementById("premiumradio").addEventListener("change", function () {
                envioPercentage = 0.15;
                updateTotalCosts();
            });

            document.getElementById("expressradio").addEventListener("change", function () {
                envioPercentage = 0.07;
                updateTotalCosts();
            });

            document.getElementById("Estandarradio").addEventListener("change", function () {
                envioPercentage = 0.05;
                updateTotalCosts();
            });





        }
    });
    getJSONData(CART_BUY_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            msg = resultObj.data




        }
    });
});


function formm() {
    var forma = document.getElementsByName("forma");
    let contentAppend = ''
    let form = ''

    for (var i = 0; i < forma.length; i++) {
        if (forma[i].checked)
            selectedforma = forma[i].value;
    };//recorro radiobuttons para ver cual esta chequeado


    contentAppend += `
          
           <h6>Tu Seleccion:`+ selectedforma + `</h6> 
   
      `
    document.getElementById("spanforma").innerHTML = contentAppend;

    if (selectedforma == "Tarjeta de Credito") {//formulario para tcred


        form += `
          
   <hr class="mb-4">
    <h5 class="mb-3">Datos Tarjeta de Credito</h5>
    <div class="form-group">
      <label for="nrotarjeta">Numero de tarjeta</label>
      <input id="Nrotarjeta" name="nrotarjeta" required class="form-control" type="tel" inputmode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" placeholder="xxxx xxxx xxxx xxxx">
    </div>
    <div class="form-group">
      <label for="vto">Vto.</label>
      <input class="form-control" id="vto" placeholder="YYYY/MM" name ="vencimiento" type="month">
      <label for="cvv">CVV</label>
      <input type="number" class="form-control" id="cvv" placeholder="XXX" required name="cvv">
    </div>
    
`

        document.getElementById("form").innerHTML = form;
    }

    else if (selectedforma == "Transferencia Bancaria") {//formulario para transferencia

        form += `
           
    <hr class="mb-4">
     <h5 class="mb-3">Datos cuenta Bancaria</h5>
     <div class="form-group">
       <label for="inputAddress">Numero de cuenta</label>
       <input  type="tel" inputmode="numeric" class="form-control" id="Nrocuenta" placeholder="numero cuenta" name="nrocuenta"required>
     </div>
     
     
 `

        document.getElementById("form").innerHTML = form;
    }
}




function pago() {

    var forma = document.getElementsByName("forma");

    for (var i = 0; i < forma.length; i++) {
        if (forma[i].checked)
            selectedforma = forma[i].value;
    }; //recorro para ver cual esta chequeado

    if (selectedforma === "Tarjeta de Credito") {

        nrotarjeta = document.getElementById("Nrotarjeta").value
        vto = document.getElementById("vto").value
        cvv = document.getElementById("cvv").value

        if (nrotarjeta == null || nrotarjeta.length == 0)//tarjeta de credito solo 16 digitos, no puede estar vacio
        { alert("Debe ingresar numero de tarjeta") }

        if (cvv == null || cvv.length == 0 || cvv.length < 3 || cvv.length > 3)//cvv solo 3 digitos, no puede estar vacio

        { alert("Ingresa o verifica el numero de control de validacion correctamente") }


        if (vto == null || vto.length == 0) {//no puede estar vacio
            { alert("Debe ingresar fecha de vencimiento") }
        }


    }

    if (selectedforma === "Transferencia Bancaria") {
        nroCuenta = document.getElementById("Nrocuenta").value
        if (nroCuenta == null || nroCuenta.length == 0)//no puede estar vacio
        { alert("ingresa numero de cuenta correctamente") }
    }
    if (selectedforma == null || selectedforma == 0) {
        alert("No has ingresado forma de pago")

    }

    if ((selectedforma === "Tarjeta de Credito") && (nrotarjeta != null || nrotarjeta.length != 0)
        && (nrotarjeta.length <= 19 && nrotarjeta.length >= 16) &&
        (cvv != null || cvv.length != 0 && (vto != null || vto.length != 0))) { alert("sus datos han sido ingresados correctamente") };

    if ((selectedforma === "Transferencia Bancaria") && (nroCuenta != null && nroCuenta.length != 0 && nroCuenta != "")) { alert("sus datos han sido ingresados correctamente") };


}

document.getElementById("comprar").addEventListener("submit", myFunction);

function myFunction() {
    let alertHTML = "";


    alertHTML += `
          
    <div class="alert alert-success" role="alert">
    <h4 class="alert-heading">`+ msg.msg + `</h4>
    <p>Felicitaciones, has completado tu compra, puedes volver a la lista y realizar todas las compras que quieras</p>
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
    <span aria-hidden="true">&times;</span>
  </div>
     
 `
    document.getElementById("alert").innerHTML = alertHTML;






}