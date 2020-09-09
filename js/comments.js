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


