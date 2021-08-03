/* Promise pour récupérer un array de 5 objets
utilisation de fetch pour appeler l'api*/
const getProductsFromApi = async () => {

    return await fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
	.catch((error) => new Error(error));
};
//console.log(getProductsFromApi());

// Affichage de la liste des caméras
const displayProduct = async () => {
    //on cible la balise section ayant l'id "listofproducts"
    const container = document.getElementById("listofcameras");
    const data = await getProductsFromApi();

    //Création de la structure html pour chaque caméras
    data.forEach(camera => {
        const article = document.createElement('article');
        const img = document.createElement('img');
        const p = document.createElement('p');
        p.textContent = camera.price / 100 + '€';
        const h2 = document.createElement('h2');
        h2.textContent = camera.name;
        img.src = camera.imageUrl;
        const a = document.createElement('a');
        a.href = `/Front-end/html/product.html?id=${camera._id}`;
        
        container.appendChild(article);
        article.appendChild(img);
        container.appendChild(a);
        a.appendChild(article);
        article.appendChild(h2);
        article.appendChild(p);
    })
};

displayProduct();

 
