
const objOrder = JSON.parse(localStorage.getItem('panier'));

const container = document.getElementById("cart");

if (objOrder == null) {
        const divNul = document.createElement("p");
        divNul.textContent = "Vôtre panier est vide";

        container.appendChild(divNul);
}else {

    const divImg = document.createElement("div");
    const img = document.createElement("img");
    img.src = objOrder.img;
    img.classList.add("img-cart")
    const divDescription = document.createElement("div");
    divDescription.classList.add("description-product");
    const h2 = document.createElement("h2");
    h2.textContent = objOrder.name;
    h2.classList.add("h2")
    const quantity = document.createElement("p");
    quantity.textContent = "quantité : " + objOrder.quantity;
    const divPrice = document.createElement("div");
    divPrice.classList.add("div-price");
    const pPrice = document.createElement("p");
    pPrice.classList.add("price-cart");
    pPrice.textContent = "prix : " + objOrder.price;
    const pTotal = document.createElement("p");
    totalPrice = (parseFloat(objOrder.price) * objOrder.quantity);
    pTotal.textContent = "total : " + totalPrice + "€";
    pTotal.classList.add("total-price");
    const supr = document.getElementById("clear");


    
    
    container.appendChild(divImg);
    divImg.appendChild(img);
    container.appendChild(divDescription);
    divDescription.appendChild(h2);
    divDescription.appendChild(quantity);
    container.appendChild(divPrice);
    divPrice.appendChild(pPrice);
    divPrice.appendChild(pTotal);
    container.appendChild(supr);


    document.getElementById("clear").addEventListener('click', () => {
        localStorage.clear();
        document.location.reload();
    });

}

document.getElementById("clear").addEventListener('click', () => {
    localStorage.clear();
    document.location.reload();
});




    