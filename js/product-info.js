var product = {};
var related = {};
var relProduct = [];

function showImagesGallery(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let images = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + images + `" alt="">
            </div>
        </div>
        `

        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            product = resultObj.data;

            let productNameHTML  = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productSoldCountHTML = document.getElementById("productSoldCount");
            let productCategoryHTML = document.getElementById("productCategory");
        
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productSoldCountHTML.innerHTML = product.soldCount;
            productCategoryHTML.innerHTML = product.category;
            

            //Muestro las imagenes en forma de galería
           showImagesGallery(product.images);
        }
    });
    getJSONData(PRODUCTS_URL).then(function(resultObj){
        if (resultObj.status === "ok")
        {
            related = resultObj.data;
            
            
            showImagesRelated(related);
        }

});
});

function showImagesRelated(array){

    let htmlContentToAppend = "";
    
    for(let i = 0; i < array.length; i++){
        let related= array[i];
        
        htmlContentToAppend += `
        <div class="col-lg-2 col-md-3 col-">
        <a href="product-info.html" class="action">
        
            <div class="d-block mb-4 h-100">
            <h6 class="mb-1">`+ related.name +`</h6>
            
                <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
            </div>
        </div>
        </a>
        `

        document.getElementById("productImagesrelated").innerHTML = htmlContentToAppend;
    }
}


























