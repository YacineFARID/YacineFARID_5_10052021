// déclaration de variables

let indexHtml = '';

/* Promise pour récupérer un array de 5 objets
utilisation de fetch pour appeler l'api*/
const getProductsFromApi = function()  {
    return fetch(getUrl())
        .then(function (response) { 
            return response.json()
        })
};
getProductsFromApi();
//console.log(getProductsFromApi()); //-----------Plan de test------------

// Affichage de la liste des caméras sur nôtre page index
const displayProduct = async () => {
    // on créé un variable data correspondant au résultat de nôtre function getProductsFromApi() de nôtre fichier fonction.js
    const data = await getProductsFromApi();
    //console.log(data); //--------------Plan de test-----------

    for(let i = 0; i < data.length; i++) {
    // création de la structure Html de nos produits 
    indexHtml += `<a href="/Front-end/html/product.html?id=${data[i]._id}">
        <article>
        <img src="${data[i].imageUrl}" alt="photos d'appareils photos">
        <h2>${data[i].name}</h2>
        <p>${data[i].price/100}</p>     
        </article>
        </a>`
    }
//on cible la balise section ayant l'id "listofcameras" dans nôtre page index.html
   document.getElementById("listofcameras").innerHTML = indexHtml;
};
displayProduct();