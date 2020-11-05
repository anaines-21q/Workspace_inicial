var product = {};
var related = {};
var relProduct = [];

function showImagesGallery(array) {

  let htmlContentToAppend = "";



  htmlContentToAppend += `
        <div class="col-lg-8 col-md-4 col-">
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
    <div class="carousel-item active">
            <img src="` + product.images[0] + `" class="d-block w-100" alt="...">
          </div>
          3
          <div class="carousel-item">
            <img src="` + product.images[2] + `" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="` + product.images[3] + `" class="d-block w-100" alt="...">
          </div>
          <div class="carousel-item">
            <img src="` + product.images[4] + `" class="d-block w-100" alt="...">
          </div>
        </div>
    <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
</div>

        `


  document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
}


//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function (e) {
  getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      product = resultObj.data;

      let productNameHTML = document.getElementById("productName");
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
  getJSONData(PRODUCTS_URL).then(function (resultObj) {
    if (resultObj.status === "ok") {
      related = resultObj.data;


      showImagesRelated(related);
    }

  });
});

function showImagesRelated(array) {

  let htmlContentToAppend = "";

  for (let i = 1; i < array.length; i += 2) {
    let related = array[i];

    htmlContentToAppend += `
        <div class="col-lg-2 ">
        <a href="product-info.html" class="action">
        
            <div class="d-block mb-4 h-100">
            <h6 class="mb-1">`+ related.name + `</h6>
            
                <img class="img-fluid img-thumbnail" src="` + related.imgSrc + `" alt="">
            </div>
        </div>
        </a>
        `

    document.getElementById("productImagesrelated").innerHTML = htmlContentToAppend;
  }
}








