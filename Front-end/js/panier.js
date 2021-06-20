
const objOrder = JSON.parse(localStorage.getItem('panier'));
console.log(objOrder);

const container = document.getElementById("product");

if (objOrder == null) {
        const divNul = document.createElement("p");
        divNul.textContent = "Vôtre panier est vide";

        container.appendChild(divNul);
}


else {
const divImg = document.createElement("div");
    divImg.classList.add("img-product");
    const img = document.createElement("img");
    img.src = objOrder.img;
    img.classList.add("img")
    const divDescription = document.createElement("div");
    divDescription.classList.add("description-product");
    const h2 = document.createElement("h2");
    h2.textContent = objOrder.name;
    h2.classList.add("h2")
    const p = document.createElement("p");
    p.textContent = "prix : " + objOrder.price;
    p.classList.add("price")
    const quantity = document.createElement("p");
    quantity.textContent = "quantité : " + objOrder.quantity;   
    
    container.appendChild(divImg);
    divImg.appendChild(img);
    divImg.appendChild(h2);
    divImg.appendChild(p);
    divImg.appendChild(quantity);

}

document.getElementById("clear").addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
});




    