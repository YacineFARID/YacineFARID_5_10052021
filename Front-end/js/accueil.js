console.log("accueil");

const container = document.getElementById("camera")

const getProductsFromApi = async () => {

    return await fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
	.catch((error) => new Error(error));
};

const displayProduct = async () => {
    const container = document.getElementById("camera")
    const data = await getProductsFromApi();
    data.forEach(element => console.log(element));

}

displayProduct();


fetch("http://localhost:3000/api/cameras/")
    .then((response) => response.json())
    .then(cameras => {
    //Affichage des produits
    cameras.forEach(camera => {
        
    const h2 = document.createElement("h2");
    h2.textContent = camera.name;
    const p = document.createElement("p");
    p.textContent = camera.price / 100 + "€";
    const img = document.createElement("img");
    img.src = camera.imageUrl;
    const h3 = document.createElement("h3");
    h3.textContent = camera.description;
    const a = document.createElement("a");
    a.href = `/Front-end/html/product.html?id=${camera._id}`;

    container.appendChild(h2);
    container.appendChild(img);
    container.appendChild(a);
    a.appendChild(img);
    container.appendChild(h3);
    container.appendChild(p);

    })

});

 
