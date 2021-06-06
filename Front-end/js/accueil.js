console.log("accueil");

const container = document.getElementById("listofproducts")

const getProductsFromApi = async () => {

    return await fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
	.catch((error) => new Error(error));
};

const displayProduct = async () => {
    const container = document.getElementById("listofproducts")
    const data = await getProductsFromApi();
    data.forEach(element => console.log(element));

}

displayProduct();


fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then(cameras => {
    //Affichage des produits
    cameras.forEach(camera => {

    const article = document.createElement("article");
    article.classList.add("card");
    const img = document.createElement("img");
    const p = document.createElement("p");
    p.textContent = camera.price / 100 + "€";
    const h2 = document.createElement("h2");
    h2.textContent = camera.name;
    img.src = camera.imageUrl;
    const a = document.createElement("a");
    a.href = `/Front-end/html/product.html?id=${camera._id}`;
    
    container.appendChild(article);
    article.appendChild(img);
    container.appendChild(a);
    a.appendChild(article);
    article.appendChild(p);
    article.appendChild(h2);
    

    })

});

 
