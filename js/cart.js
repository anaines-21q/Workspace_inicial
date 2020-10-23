let envioPercentage = 0.05;
var currentProductsArray = [];
let Cotizacion = 40;

var currency=[]
var precio=[]
var cantidad=[]

var subtotal = 0;
var valorenvio = 0;
var total = 0;



function showArticlesList(currentArticlesArray){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentArticlesArray.length; i++){
    let articulo = currentArticlesArray[i];
    {
    htmlContentToAppend += `
    <tr class="prod">
    <td class="col-3"><img class="img-thumbnail rounded float-left" style="max-width:30%" src="` + articulo.src + `" alt="`+ articulo.name+ `" ></td>
    <td class="col-4">`+ articulo.name +`</td>
    <td class="col-3">`+articulo.currency+``+" "+``+articulo.unitCost+`</td>
    <td class="col-3">
    <input type="number" class="input" placeholder="" required="" value="1" min="0"></td>
    <td class="col-3"><span class="subtotalitem">` + articulo.currency + " " + (articulo.unitCost * articulo.count) + `</span></td>
    <td class="col-3"><button type="button" class="btn btn-danger eliminar "  id= "eliminar`+ i +`">Eliminar articulo</button></td>
    </tr>
    `
    }
    
    document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;

    subtotales()

    function subtotales(){

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
    
    let prod = document.getElementsByClassName("prod");
    let subtotalitem = document.getElementsByClassName("subtotalitem");
    for (let i = 0; i < prod.length; i++) {
    prod[i].addEventListener("change", function () {
    cantidad[i] = document.getElementsByClassName("input")[i].value; //tomo el valor del input de cantidades
    subtotalitem[i].innerHTML = currency[i] + " " + (precio[i] * cantidad[i]); //modifico subtotal de cada producto
    
    subtotal = 0;
    for (h = 0; h < prod.length; h++) {
    if (currency[h] == "USD") { 
    subtotal += Math.round(precio[h] * cantidad[h] * Cotizacion);//paso a UYU nuevo subtotal
    } else {
    subtotal += Math.round(precio[h] * cantidad[h]);
    }
    }


    
    document.getElementById("prodxcant").innerHTML = "UYU " + subtotal; //subtotal final en html
    
    updateTotalCosts() //actualizo costos finales
    
    })
    
    let eliminar = document.getElementsByClassName("eliminar");

    eliminar[i].addEventListener("click", function(){//solo elimina auto y pino, en ese orden, sino elimina uno?
        let prod = document.getElementsByClassName("prod"); 
        prod[i].remove()
        delete articulo.articles[i]
       
        updateTotalCosts()
    
    });
    }
    }}
    
    function updateTotalCosts() {//actualizar costos finales
    
     valorenvio = Math.round(subtotal * envioPercentage);
    document.getElementById("porenvio").innerHTML = "UYU " + valorenvio;
    total = subtotal + valorenvio;
    document.getElementById("total").innerHTML = "UYU " + total;
    
    }
    

   
    

document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_BUY_URL_DES).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            articulo = resultObj.data;

    

            showArticlesList(articulo.articles);
                
                document.getElementById("premiumradio").addEventListener("change", function(){
                    envioPercentage = 0.15;
                    updateTotalCosts();
                });
                
                document.getElementById("expressradio").addEventListener("change", function(){
                    envioPercentage = 0.07;
                    updateTotalCosts();
                });
            
                document.getElementById("Estandarradio").addEventListener("change", function(){
                    envioPercentage = 0.05;
                    updateTotalCosts();
                });


                

                
        }
    });
});


  function formm(){
    var forma = document.getElementsByName("forma");
    let contentAppend = ''
    let form=''
    
    for(var i = 0; i < forma.length; i++) {
        if(forma[i].checked)
           selectedforma = forma[i].value;};//recorro radiobuttons para ver cual esta chequeado
           

           contentAppend += `
          
           <h6>Tu Seleccion:`+ selectedforma  +`</h6> 
   
      `
      document.getElementById("spanforma").innerHTML = contentAppend;

    if (selectedforma == "Tarjeta de Credito"){//formulario para tcred


   form+=`
          
   <hr class="mb-4">
    <h5 class="mb-3">Datos Tarjeta de Credito</h5>
    <div class="form-group">
      <label for="nrotarjeta">Numero de tarjeta</label>
      <input type="number" class="form-control" id="Nrotarjeta" placeholder="XXXXXXXXXXXXXXXX" required name="nrotarjeta">
    </div>
    <div class="form-group">
      <label for="vto">Vto.</label>
      <input class="form-control" id="vto" placeholder="XX/XXXX" name ="vencimiento" >
      <label for="cvv">CVV</label>
      <input type="number" class="form-control" id="cvv" placeholder="XXX" required name="cvv">
    </div>
    
`

document.getElementById("form").innerHTML = form;}

else if (selectedforma == "Transferencia Bancaria"){//formulario para transferencia

    form+=`
           
    <hr class="mb-4">
     <h5 class="mb-3">Datos cuenta Bancaria</h5>
     <div class="form-group">
       <label for="inputAddress">Numero de cuenta</label>
       <input type="number" class="form-control" id="Nrocuenta" placeholder="numero cuenta" name="nrocuenta"required>
     </div>
     
     
 `
 
 document.getElementById("form").innerHTML = form;}}
 
 


function pago(){

    var forma = document.getElementsByName("forma");
    
    for(var i = 0; i < forma.length; i++) {
        if(forma[i].checked)
           selectedforma = forma[i].value;}; //recorro para ver cual esta chequeado

if (selectedforma === "Tarjeta de Credito"){

 nrotarjeta= document.getElementById("Nrotarjeta").value
 vto = document.getElementById("vto").value 
 cvv = document.getElementById("cvv").value 
 
 if (nrotarjeta == null || nrotarjeta.length == 0 || nrotarjeta.length < 16 || nrotarjeta.length > 16)//tarjeta de credito solo 16 digitos, no puede estar vacio
 {alert ("el numero de tarjeta es incorrecto")}

 if(cvv == null ||cvv.length==0|| cvv.length < 3 || cvv.length > 3)//cvv solo 3 digitos, no puede estar vacio

 {alert ("Ingresa o verifica el numero de control de validacion correctamente")}


if (vto == null || vto.length == 0 ){//no puede estar vacio
    {alert ("ingresa vencimiento correctamente")}
}

    
}

if (selectedforma === "Transferencia Bancaria"){
    nroCuenta = document.getElementById("Nrocuenta").value
    if (nroCuenta == null || nroCuenta.length ==0)//no puede estar vacio
    {alert("ingresa numero de cuenta correctamente")} 
}
else if (selectedforma == null || selectedforma == 0 ){
    alert ("No has ingresado forma de pago")
    
}
}

function submit(){
    forma =document.getElementsByName("forma")
  if(forma.values!==null || forma.values.length!==0)
   { alert("aun tienes campos que completar!");return false}}
    
