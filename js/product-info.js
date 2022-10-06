let info_product_ID = localStorage.getItem("prodID")
let info_relproduct_ID = localStorage.getItem("relprodID")
const URL_PRODUCT_INFO = "https://japceibal.github.io/emercado-api/products/"+info_product_ID+".json";
const URL_PRODUCT_INFO_COMMENTS = "https://japceibal.github.io/emercado-api/products_comments/"+info_product_ID+".json";
const URL_PRODUCT_INFO_REL = "https://japceibal.github.io/emercado-api/products/"+info_relproduct_ID+".json";
let infoproduct = []; 
let infocomments = [];

let p = document.getElementById('user');
p.innerHTML = localStorage.getItem('dato');

document.addEventListener('DOMContentLoaded', function(e){ //  evento que una vez cargado el documento muestra el porducto y fetch con la URL con los datos de ese producto.
    getJSONData (URL_PRODUCT_INFO).then(function(resultObj){
        if (resultObj.status === 'ok')
        {
            infoproduct = resultObj.data;    
            showProduct(infoproduct);
            showRelatedProducts(infoproduct);
             console.log(infoproduct.relatedProducts)
        };
    });
   
});
 
function showRelatedProducts() {
    let htmlRelProducts = '';
    for(let i = 0; i < infoproduct.relatedProducts.length; i++){
        let relprods = infoproduct.relatedProducts[i];
        htmlRelProducts +=
        `<div onclick="setRelProdID(${relprods.id})" class="list-group-item list-group-item-action cursor-active">
        <img class="img-fluid img-thumbnail" src="`+relprods.image+`" alt="">
        <h4>`+relprods.name+`</h4>
        </div>
       `
    }

  document.getElementById('related-products').innerHTML = htmlRelProducts
};


function showProduct(infoproduct){ // funcion para mostrar los porductos
    let htmlContentToAppend = "";

        for(let i = 0; i < infoproduct.images.length; i++){
            let imageS = infoproduct.images[i];
            console.log(imageS)

                htmlContentToAppend += 
                    `<div class="col-3">
                        <div class="d-block mb-4 h-100">
                            <img class="img-thumbnail" src="` + imageS + `" alt="">
                        </div>
                    </div>

                `
        }

    document.getElementById("imagenes-info").innerHTML = htmlContentToAppend;
    
     document.getElementById("container-info").innerHTML = `
        <div class="container">
            <br> <h1>${infoproduct.name}<h1><br>
            <hr>
            <h4><b> Precio </b><h3> <p>${infoproduct.currency}${infoproduct.cost}</p>
            <h4><b> Descripción</b><h3> <p> ${infoproduct.description}</p>
            <h4><b> Categoría</b><h3> <p> ${infoproduct.category}</p>
            <h4><b> Cantidad de vendidos </b><h3> <p> ${infoproduct.soldCount}</p>
            <h4><b>Imágenes ilustrativas</p>
        </div>
        
    ` 

};
    
document.addEventListener('DOMContentLoaded', function(e){ // fetch con la URL de comentarios y evento que muestra los comentarios luego de que carga el documento
   getJSONData(URL_PRODUCT_INFO_COMMENTS).then (function(resultObj){
        if (resultObj.status === "ok") 
        {
            infocomments = resultObj.data;
            console.log(infocomments)
            comentarios(infocomments);
        };
    });
});


function comentarios(infocomments){ //función que muestra los datos de comentarios
    let htmlContentToAppend = "";
    for(let comentario of infocomments){
        htmlContentToAppend += 
        `<div class="container">
            <div class="list-group-item">
                <div>
                    <p> <strong> ` + comentario.user + ` </strong> ` + comentario.dateTime + ` - Puntuacion: ` + comentario.score + `
                        <div id="estrellas">
                        `+ estrellas(comentario.score) + `
                        </div>
                    </p>
                    <p>` + comentario.description + `<p>
                </div>
            </div>
        </div>
        `
    document.getElementById("comentarios-info").innerHTML = htmlContentToAppend;
}
}

function setRelProdID(id) {
    
    localStorage.setItem("prodID", id);
    window.location = "product-info.html"

}


function estrellas(score){ //función que cuenta las estrellas
    var estrellas = '';
    for (i = 1 ; i<6 ; i++){
        if (i<=score){estrellas+=`<span class= "fa fa-star checked"></span>`}
        else {estrellas += `<span class= "fa fa-star"></span>`}
    };
    
    return estrellas;
}
