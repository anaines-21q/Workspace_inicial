let input0= 0
let input1= 0
let envioPercentage = 0.05;
var currentProductsArray = [];
let Cotizacion = 40; 

function showArticlesList(currentArticlesArray){
    let htmlContentToAppend = "";
   
    for(let i = 0; i < currentArticlesArray.length; i++){
    let articulo = currentArticlesArray[i];
   
 
    {
        htmlContentToAppend += `
        <tr>
        <td class="col-3"><img src="` + articulo.src + `" alt="`+ articulo.name+ `" class="img-thumbnail"> </td>
        <td class="col-3">`+ articulo.name +`</td>
        <td class="col-3">`+articulo.currency+``+" "+``+articulo.unitCost+`</td>
        <td class="col-3">
        <input type="number" class="form-control" id="input`+i+`" placeholder="" required="" value="1" min="0"></td>
        <td class="col-3"><span id="subtotal`+i+`"></span></td>
        </tr>
        
        `
    
        }

        
        document.getElementById("cart-list-container").innerHTML = htmlContentToAppend;
    }
}



document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(CART_BUY_URL_DES).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            articulo = resultObj.data;

    

            showArticlesList(articulo.articles);
            document.getElementById("input0").addEventListener("change", function(){
                q1 = this.value;
                updateTotalCosts();
            });
            
                document.getElementById("input1").addEventListener("change", function(){
                    q2 = this.value;
                    updateTotalCosts();
                });

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

/**
 * Convertir valor en dolares a pesos
 * @param {*} cost 
 */
function convertToPesos(cost){
    return cost * VALOR_CONVERSION;
}

function updateTotalCosts(){
 

 let subtotalArticulo1HTML = document.getElementById("subtotal0");
 let subtotalArticulo2HTML = document.getElementById("subtotal1");
 let SubtotalArticulosHTML= document.getElementById("prodxcant");
 let valorEnvioHTML = document.getElementById("porenvio")
 let totalCostHTML = document.getElementById("total");
 


let subtotalArticulo1Show = articulo.articles[0].unitCost * document.getElementById("input0").value;
let subtotalArticulo2Show = articulo.articles[1].unitCost * document.getElementById("input1").value;
let subtotalArticulosShow = subtotalArticulo1Show + (subtotalArticulo2Show * Cotizacion)
let valorEnvioShow = Math.round(subtotalArticulosShow * envioPercentage)
let totalCostShow = Math.round(subtotalArticulosShow * envioPercentage)*100


    subtotalArticulo1HTML.innerHTML = "UYU" + " " + subtotalArticulo1Show
    subtotalArticulo2HTML.innerHTML = "USD" + " " + subtotalArticulo2Show
    SubtotalArticulosHTML.innerHTML = "UYU" + subtotalArticulosShow
    valorEnvioHTML.innerHTML = "UYU" + valorEnvioShow
    totalCostHTML.innerHTML = "UYU" + totalCostShow 
}