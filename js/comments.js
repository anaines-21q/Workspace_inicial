var Comments = {};

function showCommentsList(Array){
   let htmlContentToAppend = "";
   
    for(let i = 0; i < Array.length; i++){
        let comments = Array[i];
        let score="";

        for (let i = 0; i<comments.score ; i++){
            score+=`<span class="fa fa-star checked"</span>`
        }
        for (let h = comments.score; h<5 ; h++){
            score+=`<span class="fa fa-star black"</span>`
        }
       
       
        
        htmlContentToAppend += `
          <br/>
            <li class="media">
            <div class="media-body">
            <i class="fas fa-user-circle"></i>  <label class="mt-0">`+ comments.user + `
            <span class="mute">`+ comments.dateTime +`</span>
            <span >calificacion:` + score +`</span>
            </label>
            <br/>
            <label class="small">`+ comments.description +`</label>
            <hr/>
            </div>
            </li>

    `
    
       document.getElementById("com-list-container").innerHTML = htmlContentToAppend;
  
  
  }}
  
 

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {comments = resultObj.data;
                           
            showCommentsList(comments);
        }
    });
});



function newcomment(){
    let newcomment=''
    var comentario = document.getElementById("comentario").value;
    var email = localStorage.key(0);
    let htmlContentToAppend3 = "";
    let score3 = "";
    var scored = document.getElementsByName("scored");
    var selectedScore;


    let actual = new Date()
    let mes= actual.getMonth() + 1;
    let dia= actual.getDate();

    if (mes < 10) {
    mes = "0" + mes}
    if(dia < 10){
        dia = "0" + dia
    }

    let fecha = actual.getFullYear() + "-" + mes + "-" 
    + dia + " " + actual.getHours() + ":" + actual.getMinutes() + ":" +
    actual.getSeconds();    

    for(var i = 0; i < scored.length; i++) {
    if(scored[i].checked)
       selectedScore = scored[i].value;};

        for (let i = 0; i< selectedScore ; i++){
            score3+=`<span class="fa fa-star checked"</span>`
        }
        for (let h = selectedScore; h<5 ; h++){
            score3+=`<span class="fa fa-star black"</span>`
        }
 
   

        htmlContentToAppend3 += `
          
            <li class="media">
            <div class="media-body">
            <i class="fas fa-user-circle"></i>  <label class="mt-0">`+ email + `
            <span class="mute">`+ fecha  +`</span>
            <span >calificacion:` + score3 +`</span>
            </label>
            <br/>
            <label class="small">`+ comentario +`</label>
            <hr/>
            </div>
            </li>

    `
    
       document.getElementById("newcomment").innerHTML = htmlContentToAppend3;
       var selectedScore=0;

  
  
  };


  
